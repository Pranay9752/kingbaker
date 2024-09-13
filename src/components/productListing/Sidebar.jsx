/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";


const MenuItem = ({ item, level = 0, isFilterMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const toggleOpen = () => {
    if (!isOpen) {
      setIsRotating(true);
      setTimeout(() => {
        setIsRotating(false);
        setIsOpen(true);
      }, 300);
    } else {
      setIsOpen(false);
    }
  };

  if (isFilterMode && item.type === "checkbox") {
    return (
      <div className="py-2 px-4 pl-8 text-gray-700">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-700">{item.title}</span>
          {item.count && (
            <span className="ml-1 text-gray-500">({item.count})</span>
          )}
        </label>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`flex justify-between items-center py-2 px-4 text-gray-700 text-sm font-semibold border-b ${level > 0 ? "pl-8" : ""
          } cursor-pointer `}
        onClick={item.children ? toggleOpen : undefined}
      >
        <span>{item.title}</span>
        {item.children && (
          <div
            className={`transform transition-transform duration-300 ${isRotating ? "rotate-360" : ""
              }`}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        )}
      </div>
      {isOpen && item.children && (
        <div className="ml-4">
          {item.children.map((child, index) => (
            <MenuItem
              key={index}
              item={child}
              level={level + 1}
              isFilterMode={isFilterMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, onClose, filterItems, mode, textTop, isNew }) => {
  const menuItems = [
    {
      title: "Shop By Occasions",
      children: [
        { title: "Birthday" },
        { title: "Anniversary" },
        { title: "Upcoming Occasions" },
        { title: "Special Occasions" },
        { title: "Emotions N Sentiments" },
      ],
    },
    { title: "Shop By Category", children: [] },
    { title: "Send Gifts Abroad", children: [] },
    { title: "My Account" },
    { title: "Contact Us" },
  ];

  const items = mode === "menu" ? menuItems : filterItems;

  return (
    <div
      className={`
        ${mode === "menu" ? "fixed top-0 left-0 h-full w-72" : "w-[100%]"
        }  bg-white shadow-lg 
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {mode === "menu" && (
        <>
          <div className="flex justify-between items-center font-semibold text-sm p-4 bg-[#7d8035] text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <img
                  src="https://your-image-url-here.com/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span>Hi Guest</span>
            </div>
            <div className="flex items-center">
              <button className="px-4 py-1 bg-white text-red-500 rounded mr-2">
                LOGIN
              </button>
            </div>
          </div>
          <div className="p-2 bg-white text-white flex items-center border-b">
            {textTop && (
              <span className="mr-1 text-gray-700 text-sm ml-2 font-semibold">
                {textTop}
              </span>
            )}
            {isNew && (
              <span className="text-xs bg-red-500 px-1 rounded">New</span>
            )}
          </div>
        </>
      )}

      {mode === "filter" && (
        <div className="flex justify-between items-center p-4 bg-white border-b">
          <h2 className="font-bold">Filters</h2>
        </div>
      )}

      <div className="overflow-y-auto h-[calc(100%-112px)]">
        <div className="h-fit overflow- y-scroll scrollbar-thin">
          {items.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              isFilterMode={mode === "filter"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
