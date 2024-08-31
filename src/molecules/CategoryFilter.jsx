import React from "react";

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="flex space-x-2 overflow-x-auto pb-2">
    {categories.map((category) => (
      <button
        key={category}
        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
          activeCategory === category
            ? "bg-orange-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => onCategoryChange(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
