/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import EventBar from "./EventBar";
import AddToCartModal from "../../components/addtocart";
import { twMerge } from "tailwind-merge";
import Modal from "../../atom/popovers/Modal";
import Sidebar from "./Sidebar";
import getCookie from "../../atom/utils/getCookies";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logoking.png";
import deleteAllCookies from "../../atom/utils/deleteAllCookies";
import SuggestionSearch from "../search/SuggestionSearch";
import ModalWrapper from "../wrappers/ModalWrapper";
import { useSelector } from "react-redux";
const currencies = [
  { code: "USD", name: "United States Dollar" },
  { code: "THB", name: "Thailand Baht" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "QAR", name: "Qatar Riyal" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "INR", name: "Indian Rupee" },
  { code: "GBP", name: "British Pound" },
  { code: "EUR", name: "Euro" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "AED", name: "United Arab Emirates Dirham" },
];

const menuItems = [
  { label: "My Account", href: "/account/details/profile" },
  { label: "My Orders", href: "/account/details/orders" },
  { label: "Contact Us", href: "#" },
];

const TopNavbar = ({
  logo,
  title,
  searchPlaceholder = "Search...",
  deliveryLocationText = "Select Delivery Location",
  franchiseEnquiriesText,
  corporateGiftsText,
  moreOptions = [],
  userGreeting = "Hi Guest",
  className,
}) => {
  const [currency, setCurrency] = useState(currencies[0]);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [location, setLocation] = useState("within");
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const sidebarRef = useRef();
  const cartData = useSelector((state) => state.order);

  // Function to close the sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <>
      <nav className={twMerge("bg-[#7d8035] text-white ", className)}>
        <div className="hidden md:flex bg-[#707428] w-full h-6  items-center text-xs font-semibold justify-end gap-2">

          {moreOptions.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center space-x-1"
              >
                <span>More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isMoreOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {moreOptions.map((option, index) => (
                    <a
                      key={index}
                      href={option.link}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      {option.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="container mx-auto hidden  md:flex items-center justify-between p-4">
          <div className="flex items-center space-x-4 ml-4">
            {logo && (
              <img
              onClick={()  => navigate("/")}
                src={"https://i.ibb.co/LPFC6F8/logoking.png"}
                alt={`${title} Logo`}
                className="h-10"
              />
            )}
            {/* <h1 className="text-2xl font-bold">{title}</h1> */}
            <div className="flex gap-4">
              <SuggestionSearch />
              <button className="flex items-center space-x-1 bg-white text-gray-700 text-xs font-semibold rounded p-2 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>{deliveryLocationText}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            style={{ zIndex: 9999 }}
            className="flex items-center space-x-4 "
          >
            <div className="group relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-6"
              >
                <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
              <div
                style={{ zIndex: 9999 }}
                className="group-hover:block hidden"
              >
                <div
                  style={{ zIndex: 9999 }}
                  className="absolute bg-white rounded-lg shadow-lg w-96 p-2  md:p-4 -translate-x-[calc(100%-50px)] md:first-letter:-translate-x-[calc(100%-30px)]"
                >
                  <AddToCartModal />
                </div>
              </div>
              {Array.isArray(cartData) && cartData?.length > 0 && (
                <span
                  className={`absolute bg-red-400 text-xs font-bold rounded-full px-1 -top-2 -right-1`}
                >
                  {cartData.length}
                </span>
              )}
            </div>

            <div
              // onClick={() => navigate("/account/details")}
              className="flex flex-col text-xs font-semibold items-center space-x-1 pr-4 group relative cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </svg>

              <p>Hi {getCookie("user") == "" ? "Guest" : getCookie("user")}</p>

              <div className="z-10 absolute right-0 top-8 hidden group-hover:block font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                <div
                  className={`py-1 ${
                    getCookie("isAuth") !== "true" ? "" : "hidden"
                  }`}
                >
                  <Link
                    to="/account/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  >
                    Login / Register
                  </Link>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 "
                  aria-labelledby="dropdownLargeButton"
                >
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="block px-4 py-2 hover:bg-gray-100 "
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div
                  className={`py-1 ${
                    getCookie("isAuth") !== "true" ? "hidden" : ""
                  }`}
                >
                  <div
                    onClick={() => {
                      deleteAllCookies();
                      navigate("/");
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  >
                    Sign out
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden  p-4 flex flex-col w-full gap-2">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center justify-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src={"https://i.ibb.co/LPFC6F8/logoking.png"}
                  alt={`${title} Logo`}
                  className="h-8"
                />
                {/* <h1 className="text-xl font-bold">{title}</h1> */}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="group relative">
                <svg
                  onClick={() => setIsOpen(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                </svg>
                {Array.isArray(cartData) && cartData?.length > 0 && (
                  <span
                    className={`absolute bg-red-400 text-xs font-bold rounded-full px-1 -top-2 -right-1`}
                  >
                    {cartData.length}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => navigate("/account/details")}
                className="text-white"
              >
                <span className="text-2xl">⋮</span>
              </button>
            </div>
          </div>
          {showSearch && <SuggestionSearch />}
        </div>

        {/* Mobile menu (hidden by default) */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>

            <div
              ref={sidebarRef}
              className="md:hidden bg-[#7d8035] p-4 fixed inset-y-0 left-0 z-20"
            >
              <Sidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                mode="menu"
                isNew={true}
                textTop={"FnpCash"}
              />
            </div>
          </>
        )}
      </nav>
      <ModalWrapper isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddToCartModal onClose={() => setIsOpen(false)} />
      </ModalWrapper>
      {/* <EventBar /> */}
    </>
  );
};

export default TopNavbar;
