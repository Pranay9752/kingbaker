import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const CustomizeButton = ({className}) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [saving, setSaving] = useState(false);

  const { setValue, getValues } = useFormContext();
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSaving(true);
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setValue('imageOnCake', "https://cdn.prod.website-files.com/651597b59e9a14dec4ef2c52/651edee21dd245d64780d6c7_ai-image-header.webp")
      setImageUploaded(true);
      setSaving(false);
    }
  };

  return (
    <div className={twMerge("w-full mx-auto  ", className)}>
      <label
        className={`
          relative flex items-center justify-between
          w-full px-4 py-3 rounded-md cursor-pointer
          transition-all duration-200
          ${
            imageUploaded
              ? "bg-white border border-gray-200"
              : "bg-white border border-orange-200 shadow-sm shadow-orange-100"
          }
        `}
      >
        <div className="flex items-center gap-2 w-full">
          {imageUploaded ? (
            <>
              <span className="text-gray-700">Customize Product</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-green-600 ml-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="text-green-600 text-sm">Saved</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-600"
              >
                <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>

              <span className="text-gray-700">
                {saving ? "Saving..." : "Upload Personalized Image - 100 KB - 10 MB. Only JPG, JPEG, PNG."}
              </span>
            </>
          )}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            fillRule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>

        <input
          type="file"
          accept="image/*"
          id="imageOnCake"
          name="imageOnCake"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </label>
    </div>
  );
};

export default CustomizeButton;
