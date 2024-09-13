import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false); // For controlling dropdown open/close state
  const [selectedOption, setSelectedOption] = useState(""); // To store the selected option
  const dropdownRef = useRef(null); 
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-[100%]" ref={dropdownRef}>
      <div
        className="border border-gray-300 px-2 rounded-lg cursor-pointer flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">
            {selectedOption || "Select an option"}
          </p>
        </div>
      
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`transition-transform duration-200 size-5 ${
            isOpen ? "rotate-180" : ""
          }`}>
  <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>

      </div>

      {isOpen && (
        <ul className="absolute top-0 left-0 right-0 transform -translate-y-full bg-white border border-gray-300 mb-2 rounded-lg shadow-lg z-50">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
