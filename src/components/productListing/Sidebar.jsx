import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slices/ecom/filter";
import { setSelectedFilter } from "../../redux/slices/ecom/selectedFilters";

const MenuItem = ({
  item,
  level = 0,
  isFilterMode = false,
  handleLimit,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const selectedFilter = useSelector((state) => state.selectedFilter);

  const dispatch = useDispatch();
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

  const isValueInFilter = ({ type, value }) => {
    // Check if the type exists in the state and if the value is present
    if (selectedFilter[type] && Array.isArray(selectedFilter[type])) {
      return selectedFilter[type].includes(value);
    }

    // Return false if the type doesn't exist or if the value is not found
    return false;
  };

  if (typeof item == "string") {
    return (
      <div
        onClick={(e) => {
          // alert("")
          // handleLimit?.(e, item?.uprlmt, item?.lwrlmt)
        }}
        className="py-2 px-4  text-gray-700 capitalize"
      >
        <label  className="flex items-center">
          <input
            onChange={(e) => {
              dispatch(setSelectedFilter({ type: title, value: item }));
            }}
            checked={isValueInFilter({ type: title, value: item })}
            type="checkbox"
            className="mr-2"
          />
          <span className="text-gray-700">{item}</span>
        </label>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`flex justify-between items-center py-2 px-4 text-gray-700 text-sm font-semibold border-b capitalize ${
          level > 0 ? "pl-1" : ""
        } cursor-pointer `}
        onClick={item ? toggleOpen : undefined}
      >
        <span>{title}</span>
        {item && (
          <div
            className={`transform transition-transform duration-300 ${
              isRotating ? "rotate-360" : ""
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
      {isOpen && item && (
        <div className="ml-4">
          {item?.map((child, index) => (
            <MenuItem
              key={index}
              item={child}
              level={level + 1}
              isFilterMode={isFilterMode}
              title={title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({
  isOpen,
  onClose,
  filterItems,
  mode,
  textTop,
  isNew,
  handleLimit = () => {},
}) => {
  return (
    <div
      className={`
        ${
          mode === "menu" ? "fixed top-0 left-0 h-full w-72" : "w-[100%]"
        }  bg-white shadow-lg 
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <h2 className="font-bold">Filters</h2>
      </div>

      <div className="overflow-y-auto h-[calc(100%-112px)]">
        <div className="h-fit overflow- y-scroll scrollbar-thin">
          {Object.keys(filterItems).map((item, index) => (
            <MenuItem
              handleLimit={handleLimit}
              key={index}
              item={filterItems[item]}
              title={item}
              isFilterMode={mode === "filter"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
