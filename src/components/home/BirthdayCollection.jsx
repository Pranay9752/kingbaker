/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const BirthdayCollection = ({ data }) => {
  const { title, button, containerStyle, items } = data;

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button
          style={button.style}
          className="px-4 py-2 rounded-md hover:bg-green-600 hover:text-white"
        >
          {button.name}
        </button>
      </div>
      <div className="grid" style={containerStyle}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`bg-white shadow-md rounded-md ${
              item.type === "card2"
                ? "col-span-5 row-span-4"
                : "col-span-2 row-span-3"
            }`}
            style={item.cardStyle}
          >
            {/* <img
              src={item.image}
              alt={`Item ${index}`}
              className="w-full h-40 object-cover rounded-t-md"
            />
            {item.type === "card3" && (
              <div className="p-4">
                <p className="text-gray-600">{item.text}</p>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayCollection;
