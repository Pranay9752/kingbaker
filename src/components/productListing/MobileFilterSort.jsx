/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const MobileFilterSort = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Price");
  const [filters, setFilters] = useState({
    Price: [],
    "Gift Type": [],
    "Get Same Day": false,
    "Personalise It": false,
  });
  const [sortOption, setSortOption] = useState("Recommended");

  const filterOptions = {
    Price: [
      { label: "₹0 to ₹499", count: 609 },
      { label: "₹500 to ₹999", count: 1353 },
      { label: "₹1000 to ₹1499", count: 1000 },
      { label: "₹1500 to ₹1999", count: 622 },
      { label: "₹2000 to ₹2499", count: 340 },
      { label: "₹2500 to ₹2999", count: 244 },
      { label: "₹3000 AND ABOVE", count: 361 },
    ],
    "Gift Type": [], // Add gift type options here
    "Get Same Day": [{ label: "Get Same Day", count: null }],
    "Personalise It": [{ label: "Personalise It", count: null }],
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      if (category === "Price" || category === "Gift Type") {
        return {
          ...prev,
          [category]: prev[category].includes(value)
            ? prev[category].filter((item) => item !== value)
            : [...prev[category], value],
        };
      } else {
        return { ...prev, [category]: !prev[category] };
      }
    });
  };

  const handleApplyFilters = () => {
    setShowFilter(false);
    console.log("Applied filters:", filters);
  };

  const handleSort = (option) => {
    setSortOption(option);
    setShowSort(false);
    console.log("Sorting by:", option);
  };

  const clearAllFilters = () => {
    setFilters({
      Price: [],
      "Gift Type": [],
      "Get Same Day": false,
      "Personalise It": false,
    });
  };

  return (
    <div className="md:hidden">
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex">
        <button
          onClick={() => setShowFilter(true)}
          className="flex-1 py-3 text-center border-r border-gray-200"
        >
          Filter
        </button>
        <button
          onClick={() => setShowSort(true)}
          className="flex-1 py-3 text-center flex items-center justify-center"
        >
          Sort by <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-1">
            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
          </svg>

        </button>
      </div>

      {showFilter && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="bg-[#7d8035] text-white p-4 flex items-center">
            <button onClick={() => setShowFilter(false)} className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
              </svg>

            </button>
            <h2 className="text-lg text-start font-semibold flex-grow">
              Filters
            </h2>
            <button onClick={clearAllFilters} className="text-sm">
              Clear All
            </button>
          </div>
          <div className="flex-grow flex">
            <div className="w-1/3 bg-gray-100 overflow-y-auto text-start">
              {Object.keys(filterOptions).map((category) => (
                <div
                  key={category}
                  className={`p-4 cursor-pointer ${activeFilter === category
                      ? "bg-white border-b-4  border-[#7d8035]"
                      : ""
                    }`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </div>
              ))}
            </div>
            <div className="w-2/3 overflow-y-auto p-4 flex flex-col gap-4 text-start">
              {filterOptions[activeFilter].map((option, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center justify-between mb-2"
                >
                  <input
                    type="checkbox"
                    id={`${activeFilter}-${index}`}
                    checked={filters[activeFilter].includes(option.label)}
                    onChange={() =>
                      handleFilterChange(activeFilter, option.label)
                    }
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor={`${activeFilter}-${index}`}
                    className="flex-grow"
                  >
                    {option.label}{" "}
                    {option.count !== null && (
                      <span className="text-gray-500">({option.count})</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleApplyFilters}
            className="bg-orange-500 text-white py-4 text-center w-full"
          >
            SHOW 4538 RESULTS
          </button>
        </div>
      )}

      {showSort && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSort(false)}
          ></div>

          {/* Sort Menu */}
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 border-t border-gray-200 rounded-t-xl">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Sort by</h2>
                <button
                  onClick={() => setShowSort(false)}
                  className="text-gray-500"
                >
                  ✕
                </button>
              </div>
              {[
                "Recommended",
                "New",
                "Price: Low to High",
                "Price: High to Low",
              ].map((option, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="radio"
                    id={`sort-${index}`}
                    name="sort"
                    checked={sortOption === option}
                    onChange={() => handleSort(option)}
                    className="mr-3 h-5 w-5 text-orange-500"
                  />
                  <label htmlFor={`sort-${index}`} className="text-lg">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileFilterSort;
