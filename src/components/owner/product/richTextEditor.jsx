import React, { useRef, useState, useCallback, useMemo } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Strikethrough,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import parse from 'html-react-parser';

const RichTextEditor = ({
  methods,
  fieldPath,
  placeholder = "Type here...",
  maxLength = 5000,
}) => {
  const editorRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [editorContent, setEditorContent] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Improved text formatting with more robust command execution
  const formatText = useCallback((command, value = null) => {
    try {
      // Enable CSS styling for more consistent formatting
      document.execCommand("styleWithCSS", false, true);

      // Special handling for lists to ensure proper rendering
      if (command === "insertUnorderedList") {
        document.execCommand("insertUnorderedList", false, null);
        // Wrap lists in a proper <ul> tag if not already done
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const listItems = range.commonAncestorContainer.querySelectorAll("li");

        if (
          listItems.length > 0 &&
          !range.commonAncestorContainer.closest("ul")
        ) {
          const ul = document.createElement("ul");
          range.commonAncestorContainer.parentNode.insertBefore(
            ul,
            range.commonAncestorContainer
          );
          listItems.forEach((li) => ul.appendChild(li));
        }
      } else if (command === "insertOrderedList") {
        document.execCommand("insertOrderedList", false, null);
        // Wrap lists in a proper <ol> tag if not already done
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const listItems = range.commonAncestorContainer.querySelectorAll("li");

        if (
          listItems.length > 0 &&
          !range.commonAncestorContainer.closest("ol")
        ) {
          const ol = document.createElement("ol");
          range.commonAncestorContainer.parentNode.insertBefore(
            ol,
            range.commonAncestorContainer
          );
          listItems.forEach((li) => ol.appendChild(li));
        }
      } else {
        // Execute other formatting commands normally
        document.execCommand(command, false, value);
      }

      editorRef.current.focus();
    } catch (error) {
      console.error("Formatting error:", error);
    }
  }, []);

  // Handle input changes with improved validation and tracking
  const handleInput = useCallback(() => {
    const editorElement = editorRef.current;
    if (!editorElement) return;

    // Remove placeholder if content is added
    if (editorElement.firstChild?.textContent === placeholder) {
      editorElement.innerHTML = "";
    }

    // Get current content and update form value
    const content = editorElement.innerHTML;
    const textContent = editorElement.textContent || "";

    // Update character count and truncate if exceeding max length
    if (textContent.length > maxLength) {
      editorElement.innerHTML = textContent.slice(0, maxLength);
    }

    setCharacterCount(textContent.length);
    setEditorContent(content);
    methods.setValue(fieldPath, content);
  }, [methods, fieldPath, placeholder, maxLength]);

  // Toolbar button configuration
  const toolbarButtons = useMemo(
    () => [
      {
        icon: <Bold size={16} />,
        command: "bold",
        title: "Bold",
      },
      {
        icon: <Italic size={16} />,
        command: "italic",
        title: "Italic",
      },
      {
        icon: <Underline size={16} />,
        command: "underline",
        title: "Underline",
      },
      {
        icon: <Strikethrough size={16} />,
        command: "strikeThrough",
        title: "Strikethrough",
      },
      {
        icon: <ListOrdered size={16} />,
        command: "insertOrderedList",
        title: "Ordered List",
      },
      {
        icon: <List size={16} />,
        command: "insertUnorderedList",
        title: "Unordered List",
      },
      {
        icon: <Quote size={16} />,
        command: "formatBlock",
        value: "blockquote",
        title: "Quote",
      },
      {
        icon: <Code size={16} />,
        command: "code",
        title: "Code",
      },
      {
        icon: <AlignLeft size={16} />,
        command: "justifyLeft",
        title: "Align Left",
      },
      {
        icon: <AlignCenter size={16} />,
        command: "justifyCenter",
        title: "Align Center",
      },
      {
        icon: <AlignRight size={16} />,
        command: "justifyRight",
        title: "Align Right",
      },
    ],
    []
  );

  // Handle paste event to prevent formatting issues
  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  // Toggle preview section
  const togglePreview = useCallback(() => {
    setIsPreviewOpen(!isPreviewOpen);
  }, [isPreviewOpen]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <style>
        {`
          .editor ol {
            list-style-type: disc; /* Use bullets for ordered lists */
            padding-left: 1.5rem;
          }
          .editor ul {
            list-style-type: decimal; /* Use numbers for unordered lists */
            padding-left: 1.5rem;
          }
        `}
      </style>
      {/* Enhanced Toolbar */}
      <div className="flex items-center flex-wrap gap-2 p-2 border border-gray-700 rounded-t-md bg-gray-800 shadow-sm">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={() => formatText(button.command, button.value)}
            title={button.title}
            className="p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none transition-colors"
          >
            {button.icon}
          </button>
        ))}

        {/* Preview Toggle Button */}
        <button
          type="button"
          onClick={togglePreview}
          title="Toggle Preview"
          className="p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none transition-colors ml-auto"
        >
          {isPreviewOpen ? <ChevronUp size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* ContentEditable Editor */}
      <div
        ref={editorRef}
        onInput={handleInput}
        onPaste={handlePaste}
        contentEditable
        suppressContentEditableWarning={true}
        className="editor min-h-[200px] w-full px-3 py-2 rounded-b-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-[#161b22] border-gray-800 text-gray-300"
        role="textbox"
        aria-multiline="true"
      >
        <p className="text-gray-500">{placeholder}</p>
      </div>

      {/* Character Count */}
      <div className="text-sm text-gray-400 mt-1 flex justify-between">
        <span>
          {characterCount} / {maxLength} characters
        </span>
      </div>

      {/* Collapsible Preview Section */}
      {isPreviewOpen && (
        <div className="mt-4 p-4 border border-gray-700 rounded-md bg-[#0d1117]">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Preview</h3>
          <div
            className="prose editor prose-invert max-w-none"
            // dangerouslySetInnerHTML={{ __html: editorContent }}
          >
            {parse(editorContent || '<p>No content to preview</p>')}
        </div>
          {/* <div
            className="prose editor prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: editorContent }}
          /> */}
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
