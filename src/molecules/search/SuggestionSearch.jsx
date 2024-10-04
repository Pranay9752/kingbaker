import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSuggestionProductMutation } from "../../redux/apiSlices/ecom/productsApiSlice";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

function SuggestionSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionProduct] = useSuggestionProductMutation();
  const navigate = useNavigate();

  const fetchSuggestions = useCallback(
    debounce(async (term) => {
      if (term.length < 2) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        const result = await suggestionProduct({ query: term }).unwrap();
        console.log('result: ', result);
        setSuggestions(result?.suggestions ?? []);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(searchTerm);
  }, [searchTerm, fetchSuggestions]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchTerm}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    navigate(`/search/${suggestion}`);
    setSearchTerm('')
  };

  return (
    <div className="relative w-full text-gray-800">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search flowers, cakes, gifts, etc."
        className="w-full p-2 pl-10 rounded text-gray-800"
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
        <div className="absolute right-3 top-2.5">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SuggestionSearch;
