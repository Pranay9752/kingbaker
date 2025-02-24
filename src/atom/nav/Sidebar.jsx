import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const NavSidebar = ({ id, menuItems, isOpen = false }) => {
  return (
    <aside
      id="logo-sidebar"
      className={twMerge("fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  bg-white border-r border-gray-200 sm:translate-x-0", !isOpen && "-translate-x-full")}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className={twMerge(
                  "flex items-center p-2 w-full text-gray-900 rounded-lg hover:bg-gray-100  group ",
                  `${
                    id === item?.id &&
                    "bg-gray-600 text-white font-semibold hover:bg-gray-600"
                  }`
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={twMerge(
                    "size-5 text-gray-500  group-hover:text-gray-900 transition-all duration-150 ease-in-out group-hover:translate-x-2",
                    `${
                      id === item?.id &&
                      " text-white size-6 group-hover:text-white"
                    }`
                  )}
                >
                  {item.iconPath}
                </svg>
                <span className="ms-3 group-hover:translate-x-2">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default NavSidebar;
