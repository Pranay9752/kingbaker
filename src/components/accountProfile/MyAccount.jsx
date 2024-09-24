/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import getCookie from "../../atom/utils/getCookies";
import { useNavigate } from "react-router-dom";
import deleteAllCookies from "../../atom/utils/deleteAllCookies";
const Card = ({ Icon, title, description, onClick }) => (
  <div
    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-64 m-2 cursor-pointer h-32 flex flex-col justify-center"
    onClick={onClick}
  >
    <div className="flex flex-col gap-2 items-center justify-center mb-2">
      {Icon}
      <h3 className="text-lg font-bold ml-2">{title}</h3>
    </div>
    <p className="text-xs text-gray-600 truncate">{description}</p>
  </div>
);

const SecondComponent = ({ selectedPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const accountOptions = [
    {
      Icon: (
        <svg
          className={`size-5 mr-3 text-gray-500`}
          viewBox="0 0 17 17"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M8.517-0.035l-8.517 3.221v10.693l8.5 3.188 8.5-3.188v-10.692l-8.483-3.222zM15.084 3.528l-2.586 0.97-6.557-2.489 2.575-0.974 6.568 2.493zM8.5 5.997l-6.581-2.468 2.609-0.986 6.551 2.487-2.579 0.967zM1 4.253l7 2.625v8.932l-7-2.625v-8.932zM9 15.81v-8.932l7-2.625v8.932l-7 2.625z"></path>
          </g>
        </svg>
      ),
      title: "My Orders",
      page: "orders",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path d="M10.75 10.818v2.614A3.13 3.13 0 0 0 11.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 0 0-1.138-.432ZM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 0 0-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152Z" />
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-6a.75.75 0 0 1 .75.75v.316a3.78 3.78 0 0 1 1.653.713c.426.33.744.74.925 1.2a.75.75 0 0 1-1.395.55 1.35 1.35 0 0 0-.447-.563 2.187 2.187 0 0 0-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 1 1-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 1 1 1.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 0 1-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 0 1 1.653-.713V4.75A.75.75 0 0 1 10 4Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "fnpCash",
      page: "fnpCash",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
        </svg>
      ),
      title: "My Profile",
      page: "profile",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "My Reminders",
      page: "reminders",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Saved Addresses",
      page: "addresses",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M8 7a5 5 0 1 1 3.61 4.804l-1.903 1.903A1 1 0 0 1 9 14H8v1a1 1 0 0 1-1 1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 .293-.707L8.196 8.39A5.002 5.002 0 0 1 8 7Zm5-3a.75.75 0 0 0 0 1.5A1.5 1.5 0 0 1 14.5 7 .75.75 0 0 0 16 7a3 3 0 0 0-3-3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Change Password",
      page: "password",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Logout",
      page: "logout",
      onClick: () => {
        deleteAllCookies();
        navigate("/");
      },
    },
  ];
  const handleOptionClick = (option) => {
    if (option.onClick) {
      option.onClick();
    }
    setCurrentPage(option.page);
  };

  const renderContent = () => {
    switch (selectedPage) {
      case "fnpCash":
        return <div>fnpCash data</div>;
      case "profile":
        return <div>Profile data</div>;
      case "orders":
        return <div>Orders data</div>;
      default:
        return <div className="p-6">Content for {selectedPage}</div>;
    }
  };

  return (
    <div className="flex bg-gray-100 p-4">
      <div className="w-64 bg-white shadow-md rounded-xl overflow-hidden h-[80vh] md:block hidden">
        <div className="bg-[#3d3d3d] text-white p-4 flex gap-2 items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              className="object-cover"
              src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            />
          </div>
          <h2 className="text-sm font-semibold">
            Hi, {getCookie("user") == "" ? "Guest" : getCookie("user")}
          </h2>
        </div>
        <nav className="overflow-scroll hide-scrollbar">
          {accountOptions.map((option) => (
            <div
              key={option.title}
              className={`flex items-center justify-between py-4 px-4 cursor-pointer ${
                selectedPage === option.page ? "bg-gray-200" : ""
              }`}
              onClick={() => handleOptionClick(option)}
              role="button"
              tabIndex={0} // Allow keyboard navigation
              // onKeyPress={(e) => e.key === "Enter" && handleOptionClick(option)}
            >
              <div className="flex items-center">
                {option.Icon}
                <h3 className="text-sm font-semibold">{option.title}</h3>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-[18px] text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-grow md:p-6 bg-white md:ml-4 rounded-xl min-h-fit h-[80vh] overflow-y-scroll scrollbar-thin">
        <div className="mb-4 flex items-center">
          <button onClick={() => setCurrentPage("main")} className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <h1 className="text-lg font-bold">
            {selectedPage === "main"
              ? "My Account"
              : accountOptions.find((o) => o.page === selectedPage)?.title}
          </h1>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

const MyAccount = () => {
  const [currentPage, setCurrentPage] = useState("main");
  const navigate = useNavigate();
  const handleOptionClick = (option) => {
    if (option.onClick) {
      option.onClick();
    }
    setCurrentPage(option.page);
  };

  const accountOptions = [
    {
      Icon: (
        <svg
          className={`size-5 mr-3 text-gray-500`}
          viewBox="0 0 17 17"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M8.517-0.035l-8.517 3.221v10.693l8.5 3.188 8.5-3.188v-10.692l-8.483-3.222zM15.084 3.528l-2.586 0.97-6.557-2.489 2.575-0.974 6.568 2.493zM8.5 5.997l-6.581-2.468 2.609-0.986 6.551 2.487-2.579 0.967zM1 4.253l7 2.625v8.932l-7-2.625v-8.932zM9 15.81v-8.932l7-2.625v8.932l-7 2.625z"
              fill="#000000"
            ></path>
          </g>
        </svg>
      ),
      title: "My Orders",
      description: "View Order Status, Track Order & Download Invoice",
      page: "orders",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path d="M10.75 10.818v2.614A3.13 3.13 0 0 0 11.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 0 0-1.138-.432ZM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 0 0-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152Z" />
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-6a.75.75 0 0 1 .75.75v.316a3.78 3.78 0 0 1 1.653.713c.426.33.744.74.925 1.2a.75.75 0 0 1-1.395.55 1.35 1.35 0 0 0-.447-.563 2.187 2.187 0 0 0-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 1 1-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 1 1 1.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 0 1-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 0 1 1.653-.713V4.75A.75.75 0 0 1 10 4Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "fnpCash",
      description: "Quick Checkout, Easy Refund",
      page: "fnpCash",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
        </svg>
      ),
      title: "My Profile",
      description: "View and edit your profile",
      page: "profile",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "My Reminders",
      description: "Manage your reminders & add a new reminder",
      page: "reminders",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Saved Addresses",
      description: "Save address for a hassle-free checkout",
      page: "addresses",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M8 7a5 5 0 1 1 3.61 4.804l-1.903 1.903A1 1 0 0 1 9 14H8v1a1 1 0 0 1-1 1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 .293-.707L8.196 8.39A5.002 5.002 0 0 1 8 7Zm5-3a.75.75 0 0 0 0 1.5A1.5 1.5 0 0 1 14.5 7 .75.75 0 0 0 16 7a3 3 0 0 0-3-3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Change Password",
      description: "Stay logged in for faster checkout",
      page: "password",
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 mr-3 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Logout",
      description: "",
      page: "logout",
      onClick: () => {
        deleteAllCookies();
        navigate("/");
      },
    },
  ];

  if (currentPage !== "main") {
    return (
      <SecondComponent
        selectedPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    );
  }

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden bg-white min-h-screen">
        <div className="flex flex-col gap-4 bg-[#f2f2f2]">
          <div className="flex items-center justify-between p-4 bg-white">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold mr-3 capitalize">
                {getCookie("user") == "" ? "G" : getCookie("user")[0]}
              </div>
              <h2 className="font-semibold">
                {getCookie("user") == "" ? "Guest" : getCookie("user")}
              </h2>
            </div>
            <div className="flex items-center">
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-[18px]"
                >
                  <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-4 bg-white">
            {accountOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => setCurrentPage(option.page)}
                className="flex items-center justify-between py-3 border-b border-gray-200"
              >
                <div className="flex items-center">
                  {option.Icon}
                  <div>
                    <h3 className="text-sm font-semibold text-start">
                      {option.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-[18px] text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 flex justify-around py-2">
          <button className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 mx-auto mb-1 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="text-xs">Home</span>
          </button>
          <button className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 mx-auto mb-1 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <span className="text-xs">Same Day</span>
          </button>
          <button className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 mx-auto mb-1 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>

            <span className="text-xs">Chat with us</span>
          </button>
          <button className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 mx-auto mb-1 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M14 6a2.5 2.5 0 0 0-4-3 2.5 2.5 0 0 0-4 3H3.25C2.56 6 2 6.56 2 7.25v.5C2 8.44 2.56 9 3.25 9h6V6h1.5v3h6C17.44 9 18 8.44 18 7.75v-.5C18 6.56 17.44 6 16.75 6H14Zm-1-1.5a1 1 0 0 1-1 1h-1v-1a1 1 0 1 1 2 0Zm-6 0a1 1 0 0 0 1 1h1v-1a1 1 0 0 0-2 0Z"
                clipRule="evenodd"
              />
              <path d="M9.25 10.5H3v4.75A2.75 2.75 0 0 0 5.75 18h3.5v-7.5ZM10.75 18v-7.5H17v4.75A2.75 2.75 0 0 1 14.25 18h-3.5Z" />
            </svg>

            <span className="text-xs">Offers</span>
          </button>
          <button className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 mx-auto mb-1 text-gray-500"
            >
              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
            </svg>

            <span className="text-xs">Account</span>
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block container mx-auto p-4 bg-[#f2f2f2] min-h-screen">
        <h2 className="text-lg text-center font-bold mb-4">MY ACCOUNT</h2>
        <div className="flex flex-wrap gap-0 justify-center mx-auto w-3/4 items-center mt-4">
          {accountOptions.map((option, index) => (
            <Card
              key={index}
              Icon={option.Icon}
              title={option.title}
              description={option.description}
              onClick={() => handleOptionClick(option)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAccount;
