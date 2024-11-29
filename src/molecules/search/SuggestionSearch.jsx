import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSuggestionProductMutation } from "../../redux/apiSlices/ecom/productsApiSlice";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

// function SuggestionSearch() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [suggestionProduct] = useSuggestionProductMutation();
//   const navigate = useNavigate();

//   const fetchSuggestions = useCallback(
//     debounce(async (term) => {
//       if (term.length < 2) {
//         setSuggestions([]);
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const result = await suggestionProduct({ query: term }).unwrap();
//         console.log('result: ', result);
//         setSuggestions(result?.suggestions ?? []);
//       } catch (error) {
//         console.error("Failed to fetch suggestions:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 300),
//     []
//   );

//   useEffect(() => {
//     fetchSuggestions(searchTerm);
//   }, [searchTerm, fetchSuggestions]);

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       navigate(`/search/${searchTerm}`);
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSearchTerm(suggestion);
//     navigate(`/search/${suggestion}`);
//     setSearchTerm('')
//   };

//   return (
//     <div className="relative w-full text-gray-800">
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         placeholder="Search flowers, cakes, gifts, etc."
//         className="w-full p-2 pl-10 rounded text-gray-800"
//       />

//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         className="size-5 absolute left-3 top-2.5 text-gray-500"
//       >
//         <path
//           fillRule="evenodd"
//           d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
//           clipRule="evenodd"
//         />
//       </svg>

//       {isLoading && (
//         <div className="absolute right-3 top-2.5">
//           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
//         </div>
//       )}

//       {suggestions.length > 0 && (
//         <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
//               onClick={() => handleSuggestionClick(suggestion)}
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// function SuggestionSearch() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [suggestionProduct] = useSuggestionProductMutation();
//   const inputRef = useRef(null); // Ref for the input element
//   const navigate = useNavigate();

//   const placeholderWords = [
//     "Search flowers",
//     "Find cakes",
//     "Explore gifts",
//     "Search products",
//   ];

//   const fetchSuggestions = useCallback(
//     debounce(async (term) => {
//       if (term.length < 2) {
//         setSuggestions([]);
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const result = await suggestionProduct({ query: term }).unwrap();
//         setSuggestions(result?.suggestions ?? []);
//       } catch (error) {
//         console.error("Failed to fetch suggestions:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 300),
//     []
//   );

//   useEffect(() => {
//     fetchSuggestions(searchTerm);
//   }, [searchTerm, fetchSuggestions]);

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       navigate(`/search/${searchTerm}`);
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSearchTerm(suggestion);
//     navigate(`/search/${suggestion}`);
//     setSearchTerm("");
//   };

//   // Typing Placeholder Logic
//   useEffect(() => {
//     let index = 0;
//     let isDeleting = false;
//     let currentWordIndex = 0;

//     const type = () => {
//       const currentWord = placeholderWords[currentWordIndex];
//       const inputElem = inputRef.current;

//       if (!inputElem) return;

//       if (isDeleting) {
//         inputElem.placeholder = currentWord.substring(0, index);
//         index -= 1;

//         if (index < 0) {
//           isDeleting = false;
//           currentWordIndex = (currentWordIndex + 1) % placeholderWords.length;
//           setTimeout(type, 500); // Pause before starting a new word
//           return;
//         }
//       } else {
//         inputElem.placeholder = currentWord.substring(0, index);
//         index += 1;

//         if (index > currentWord.length) {
//           isDeleting = true;
//           setTimeout(type, 1500); // Pause before deleting
//           return;
//         }
//       }
//       setTimeout(type, isDeleting ? 50 : 100); // Adjust typing speed
//     };

//     type();
//   }, [placeholderWords]);

//   return (
//     <div className="relative w-full text-gray-800">
//       <input
//         ref={inputRef} // Attach the ref to the input
//         type="text"
//         value={searchTerm}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         className="w-full p-2 pl-10 rounded text-gray-800"
//       />

//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         className="size-5 absolute left-3 top-2.5 text-gray-500"
//       >
//         <path
//           fillRule="evenodd"
//           d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
//           clipRule="evenodd"
//         />
//       </svg>

//       {isLoading && (
//         <div className="absolute right-3 top-2.5">
//           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
//         </div>
//       )}

//       {suggestions.length > 0 && (
//         <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
//           {suggestions.map((suggestion, index) => (
//             <li
//               key={index}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
//               onClick={() => handleSuggestionClick(suggestion)}
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

const SuggestionSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionProduct] = useSuggestionProductMutation();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Typing Placeholder Logic Enhanced
  const placeholderWords = [
    "Search flowers",
    "Find cakes",
    "Explore gifts",
    "Search products",
  ];

  // Improved Suggestion Fetching with Error Handling
  const fetchSuggestions = useCallback(
    debounce(async (term) => {
      if (term.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const result = await suggestionProduct({ query: term }).unwrap();
        setSuggestions(result?.suggestions ?? []);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [suggestionProduct]
  );

  // Typing Effect with Smooth Animations
  useEffect(() => {
    const inputElem = inputRef.current;
    if (!inputElem) return;

    let index = 0;
    let isDeleting = false;
    let currentWordIndex = 0;
    let typingSpeed = 100;
    let pauseDuration = 1500;

    const type = () => {
      const currentWord = placeholderWords[currentWordIndex];

      if (isDeleting) {
        // Smooth deletion with accelerating speed
        typingSpeed = Math.max(30, typingSpeed - 10);
        inputElem.placeholder = currentWord.substring(0, index);
        index -= 1;

        if (index < 0) {
          isDeleting = false;
          currentWordIndex = (currentWordIndex + 1) % placeholderWords.length;
          typingSpeed = 100;

          // Slight randomness to make it feel more natural
          setTimeout(type, pauseDuration + Math.random() * 200);
          return;
        }
      } else {
        // Smooth typing
        typingSpeed = Math.min(100, typingSpeed + 10);
        inputElem.placeholder = currentWord.substring(0, index);
        index += 1;

        if (index > currentWord.length) {
          isDeleting = true;
          typingSpeed = 100;

          // Slight randomness to make it feel more natural
          setTimeout(type, pauseDuration + Math.random() * 200);
          return;
        }
      }

      setTimeout(type, typingSpeed);
    };

    type();

    // Cleanup function
    return () => {
      inputElem.placeholder = "";
    };
  }, []);

  // Event Handlers with Improved User Experience
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search/${searchTerm.trim()}`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    navigate(`/search/${suggestion}`);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2 pl-10 rounded text-gray-800"
        placeholder="Search"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-5 absolute left-3 top-2.5 text-gray-500"
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
          clipRule="evenodd"
        />
      </svg>

      {isLoading && (
        <div className="absolute top-full mt-1 w-full">
          <div className="bg-gray-100 p-2 text-center text-gray-500 animate-pulse">
            Loading suggestions...
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionSearch;
