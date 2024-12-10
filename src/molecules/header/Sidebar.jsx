/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../../atom/utils/getCookies";
import { twMerge } from "tailwind-merge";

const MenuItem = ({
  onClick = () => {},
  item,
  level = 0,
  isFilterMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const navigate = useNavigate();
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

  if (typeof item == "string") {
    return (
      <div className="py-2 px-4 pl-8 text-gray-700 ">
        <label
          className="flex items-center"
          onClick={() => onClick(`/search/${item}`)}
        >
          {/* <input type="checkbox" className="mr-2" /> */}
          <span
            className={twMerge(
              "text-gray-700  text-sm",
              level === 0 && "font-bold"
            )}
          >
            {item}
          </span>
          {/* {item.count && (
            <span className="ml-1 text-gray-500">({ item})</span>
          )} */}
        </label>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`flex justify-between items-center py-3 px-4 text-gray-700 text-sm font-semibold borde r-b ${
          level > 0 ? "pl-8" : ""
        } cursor-pointer `}
        onClick={() => {
          (item?.content || item?.items) && toggleOpen();
          item.onClick && navigate(item.onClick);
        }}
      >
        <span>{item.title ?? item?.category}</span>
        {(item?.content || item?.items) && (
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
                className="size-5"
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
                className="size-5"
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
      {isOpen && (item?.content || item?.items) && (
        <div className="ml-4">
          {(item?.content || item?.items).map((child, index) => (
            <MenuItem
              key={index}
              item={child}
              level={level + 1}
              isFilterMode={isFilterMode}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const navItems = [
  {
    title: "Shop By Occasions",
    content: [
      {
        category: "Birthday",
        items: [
          "Flowers",
          "Fowers N Cakes",
          "Cakes",
          "Flowers N Chocolate",
          "Plants",
          "Combos",
          "Gift Hamper",
          "Personalized Gifts",
          "Chocolates",
        ],
      },
      {
        category: "Anniversary",
        items: [
          "Gifts",
          "Best Sellers",
          "New Arrival",
          "Premium",
          "Unique",
          "Luxe Anniversary",
        ],
      },
      {
        category: "Wedding",
        items: [
          "Flowers",
          "Jewellery",
          "Fowers N Cakes",
          "Cakes",
          "Flowers N Chocolate",
          "Plants",
          "Combos",
          "Gift Hamper",
          "Personalized Gifts",
          "Chocolates",
          "Premium",
        ],
      },
      {
        category: "Festive Joy",
        items: [
          "Xmas-joy",
          "Xmas Tree",
          "Cakes",
          "Flowers N Chocolate",
          "Plants",
          "Combos",
          "Gift Hamper",
          "Personalized Gifts",
        ],
      },
      {
        category: "Other Events",
        items: ["Get Well soom flowers", "Plants"],
      },
    ],
  },
  {
    title: "Shop By Category",
    content: [
      {
        category: "Cakes",
        items: [
          "All Cakes",
          "Birthday Cakes",
          "Anniversary Cakes",
          "Congratulations",
          "25th Anniversary",
          "Wedding Cakes",
          "1st Anniversary",
          "Short Cakes",
        ],
      },
      {
        category: "Flowers",
        items: [
          "Mixed Flowers",
          "Carnations",
          "Exotic Flowers",
          "Roses",
          "Orchids",
          "Lilies",
        ],
      },
      {
        category: "Personalised",
        items: [
          "Mugs",
          "Cushion",
          "Bottles",
          "Accessories",
          "Lamps",
          "Frames",
          "Keychains",
          "clocks",
          "Plates",
        ],
      },
      {
        category: "Plants",
        items: ["Indoor Plants", "Desktop Plants", "hanging Plants"],
      },
      {
        category: "Chocolates",
        items: [
          "All Chocolates",
          "Best Seller",
          "New Arrival",
          "Gourment Chocolates",
          "Premium Chocolates",
        ],
      },
      {
        category: "Combos N Hampers",
        items: [
          "Feature Combos",
          "Cake Combos",
          "Flower Combos",
          "Birthday Combos",
          "Wedding Combos",
        ],
      },
    ],
  },
  {
    title: "Send Gifts Abroad",
    content: [
      {
        category: "USA",
        items: [
          "Christmas Gits USA",
          "Flowers USA",
          "Gifts USA",
          "Cakes USA",
          "Chocolates USA",
          "Sweets USA",
          "Roses USA",
          "Gift Baskets USA",
        ],
      },
      {
        category: "Canada",
        items: [
          "Christmas Gits USA",
          "Flowers USA",
          "Gifts USA",
          "Cakes USA",
          "Chocolates USA",
          "Sweets USA",
          "Roses USA",
          "Gift Baskets USA",
        ],
      },
      {
        category: "Australia",
        items: [
          "Christmas Gits USA",
          "Flowers USA",
          "Gifts USA",
          "Cakes USA",
          "Chocolates USA",
          "Sweets USA",
          "Roses USA",
          "Gift Baskets USA",
        ],
      },
      {
        category: "UK",
        items: [
          "Christmas Gits USA",
          "Flowers USA",
          "Gifts USA",
          "Cakes USA",
          "Chocolates USA",
          "Sweets USA",
          "Roses USA",
          "Gift Baskets USA",
        ],
      },
      {
        category: "UAE",
        items: [
          "Christmas Gits USA",
          "Flowers USA",
          "Gifts USA",
          "Cakes USA",
          "Chocolates USA",
          "Sweets USA",
          "Roses USA",
          "Gift Baskets USA",
        ],
      },
      {
        category: "Singapore",
        items: [
          "Christmas Gits USA",
          "Flowers USA",
          "Gifts USA",
          "Cakes USA",
          "Chocolates USA",
          "Sweets USA",
          "Roses USA",
          "Gift Baskets USA",
        ],
      },
    ],
  },
];

const Sidebar = ({ isOpen, onClose, filterItems, mode, textTop, isNew }) => {
  const navigate = useNavigate();

  const navToUrl = (url) => {
    navigate(url);
  };
  const items = mode === "menu" ? navItems : filterItems;

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
      {mode === "menu" && (
        <>
          <div className="flex justify-between items-center font-semibold text-sm p-4 bg-[#7d8035] text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex justify-center items-center bg-[#4b4c20]">
                <span className="text-xl font-bold text-white ">
                  {getCookie("user") == "" ? "U" : getCookie("user")[0]}
                </span>
              </div>
              <span>
                Hi {getCookie("user") == "" ? "Guest" : getCookie("user")}
              </span>
            </div>
            <div className="flex items-center">
              {getCookie("user") == "" && (
                <button
                  onClick={() => navToUrl("/account/login")}
                  className="px-4 py-1 bg-white text-red-500 rounded mr-2"
                >
                  LOGIN
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {mode === "filter" && (
        <div className="flex justify-between items-center p-4 bg-white border-b">
          <h2 className="font-bold">Filters</h2>
        </div>
      )}

      <div className="overflow-y-auto mt-2 h-[calc(100%-112px)]">
        <div className="overflow-y-auto scrollbar-thin">
          {items.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              isFilterMode={mode === "filter"}
              onClick={navToUrl}
            />
          ))}
        </div>
        <div className="px-4  border-y flex flex-col space-y-4 py-4">
          <div
            onClick={() => navigate("/account/details")}
            className="text-gray-800 text-sm font-semibold"
          >
            My Account
          </div>
          <div
            onClick={() => navigate("/contact-us")}
            className="text-gray-800 text-sm font-semibold"
          >
            Contact Us
          </div>
        </div>
        <div className="px-4  border-y flex flex-col space-y-4 py-4">
          <div className="text-gray-500 text-sm font-semibold">Enquires</div>
          <div
            onClick={() => navigate("/search/corporate")}
            className="text-gray-800 pl-2 text-sm font-semibold"
          >
            Corporate Gift
          </div>
          <div
            onClick={() => navigate("/search/wedding")}
            className="text-gray-800 pl-2 text-sm font-semibold"
          >
            Wedding
          </div>
          <div
            onClick={() => navigate("/become-a-partner")}
            className="text-gray-800 pl-2 text-sm font-semibold"
          >
            Become A Partner
          </div>
        </div>
      </div>
      <div className="fixed bottom-1 h-32 w-72 bg-white">
        <img
          src="https://i.ibb.co/LPFC6F8/logoking.png"
          alt="logo Logo"
          className="object-cover h-32"
          // class="h-8"
        ></img>
      </div>
    </div>
  );
};

export default Sidebar;
