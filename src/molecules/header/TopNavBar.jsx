/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import EventBar from "./EventBar";

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

const TopNavbar = ({
  logo,
  title,
  searchPlaceholder = "Search...",
  deliveryLocationText = "Select Delivery Location",
  franchiseEnquiriesText,
  corporateGiftsText,
  moreOptions = [],
  userGreeting = "Hi Guest",
}) => {
  const [currency, setCurrency] = useState(currencies[0]);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const toggleCurrency = () => {
    const currentIndex = currencies.indexOf(currency);
    const nextIndex = (currentIndex + 1) % currencies.length;
    setCurrency(currencies[nextIndex]);
  };

  return (
    <>
      <nav className="bg-[#7d8035] text-white">
        <div className="bg-[#707428] w-full h-6 flex items-center text-xs font-semibold justify-end gap-2">
          <div className="relative">
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="flex items-center space-x-1"
            >
              <span>Currency</span>
              <span>{currency.code}</span>
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
            {isCurrencyOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10 max-h-60 overflow-y-auto">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr);
                      setIsCurrencyOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {curr.code} - {curr.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {franchiseEnquiriesText && <button>{franchiseEnquiriesText}</button>}
          {corporateGiftsText && <button>{corporateGiftsText}</button>}

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
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-4 ml-4">
            {logo && (
              <img
                src={"https://cdn-icons-png.flaticon.com/128/3656/3656962.png"}
                alt={`${title} Logo`}
                className="h-10"
              />
            )}
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="w-full p-2 pl-10 rounded text-gray-800"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5 absolute left-3 top-2.5 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
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

          <div className="flex items-center space-x-4">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-6"
              >
                <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3a65.25 65.25 0 0 1 13.36 1.412.75.75 0 0 1 .58.875 48.645 48.645 0 0 1-1.618 6.2.75.75 0 0 1-.712.513H6a2.503 2.503 0 0 0-2.292 1.5H17.25a.75.75 0 0 1 0 1.5H2.76a.75.75 0 0 1-.748-.807 4.002 4.002 0 0 1 2.716-3.486L3.626 2.716a.25.25 0 0 0-.248-.216H1.75A.75.75 0 0 1 1 1.75ZM6 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
            </button>

            <button className="flex flex-col text-xs font-semibold items-center space-x-1 pr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </svg>

              <p>{userGreeting}</p>
            </button>
          </div>
        </div>
      </nav>
      <EventBar />
    </>
  );
};

export default TopNavbar;
