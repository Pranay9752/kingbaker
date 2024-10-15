/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilter } from "../../redux/slices/ecom/selectedFilters";

const MobileFilterSort = ({ handleSortChange, tag, filters }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Price");

  const [sortOption, setSortOption] = useState({ label: "New", value: "new" });
  const selectedFilter = useSelector((state) => state.selectedFilter);
  const dispatch = useDispatch();
  const handleFilterChange = (category, value) => {
    console.log("category, value: ", category, value);
  };

  const handleApplyFilters = () => {
    setShowFilter(false);
    console.log("Applied filters:", filters);
  };

  const isValueInFilter = ({ type, value }) => {
    // Check if the type exists in the state and if the value is present
    if (selectedFilter[type] && Array.isArray(selectedFilter[type])) {
      return selectedFilter[type].includes(value);
    }

    // Return false if the type doesn't exist or if the value is not found
    return false;
  };

  const handleSort = (option) => {
    setSortOption(option);
    setShowSort(false);
    handleSortChange(option);
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
          Sort by{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 ml-1"
          >
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showFilter && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="bg-[#7d8035] text-white p-4 flex items-center">
            <button onClick={() => setShowFilter(false)} className="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h2 className="text-lg text-start font-semibold flex-grow">
              Filters
            </h2>
          </div>
          <div className="flex-grow flex">
            <div className="w-1/3 bg-gray-100 overflow-y-auto text-start capitalize">
              {Object.keys(filters).map((category) => (
                <div
                  key={category}
                  className={`p-4 cursor-pointer ${
                    activeFilter === category
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
              {Array.isArray(filters[activeFilter]) &&
                filters[activeFilter]?.map((option, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center justify-between mb-2"
                  >
                    <input
                      type="checkbox"
                      id={`${activeFilter}-${index}`}
                      checked={isValueInFilter({
                        type: activeFilter,
                        value: option,
                      })}
                      className="h-5 w-5"
                      onChange={(e) => {
                        dispatch(
                          setSelectedFilter({
                            type: activeFilter,
                            value: option,
                          })
                        );
                      }}
                    />
                    <label
                      htmlFor={`${activeFilter}-${index}`}
                      className="flex-grow capitalize"
                    >
                      {option}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          {/* <button
            onClick={handleApplyFilters}
            className="bg-orange-500 text-white py-4 text-center w-full"
          >
            SHOW RESULTS
          </button> */}
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
                { label: "New", value: "new" },
                { label: "Price: Low to High", value: "low-to-high" },
                { label: "Price: High to Low", value: "high-to-low" },
              ].map((option, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="radio"
                    id={`sort-${index}`}
                    name="sort"
                    checked={sortOption?.value === option?.value}
                    onChange={() => handleSort(option)}
                    className="mr-3 h-5 w-5 text-orange-500"
                  />
                  <label htmlFor={`sort-${index}`} className="text-lg">
                    {option?.label ?? ""}
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
