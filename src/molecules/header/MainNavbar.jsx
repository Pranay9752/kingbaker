/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import EventBar from "./EventBar";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../assets/logoking.png'
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

  const location = useLocation();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchTerm}`);
    }
  };
  console.log("location: ", location);
  const toggleCurrency = () => {
    const currentIndex = currencies.indexOf(currency);
    const nextIndex = (currentIndex + 1) % currencies.length;
    setCurrency(currencies[nextIndex]);
  };

  const showNavbar = useMemo(() => {
    const regex = /(checkout|login)/;
    return !regex.test(location?.pathname ?? "");
  }, []);

  return showNavbar ? (
    <>
      <nav className="bg-[#7d8035] text-white ">
        <div className="bg-[#707428] w-full h-6 flex items-center text-xs font-semibold justify-end gap-2">
          {/* <div className="relative ">
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="flex items-center space-x-1"
            >
              <span>Currency</span>
              <span>{currency.code}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
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
          </div> */}

          {/* {franchiseEnquiriesText && <button>{franchiseEnquiriesText}</button>}
          {corporateGiftsText && <button>{corporateGiftsText}</button>} */}

          {moreOptions.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center space-x-1"
              >
                <span>More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
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
        <div className="container mx-auto flex items-center justify-between p-4  ">
          <div className="flex items-center space-x-4 ml-4">
            {logo && (
              <img
                src={"https://i.ibb.co/LdtMrSfq/jojo-cart-logo-02.png"}
                alt={`${title} Logo`}
                className="h-10"
              />
            )}
            {/* <h1 className="text-2xl font-bold">{title}</h1> */}
            <div className="flex gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={searchPlaceholder}
                  className="w-full p-2 pl-10 rounded text-gray-800"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 absolute left-3 top-2.5 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <button className="flex items-center space-x-1 bg-white text-gray-700 text-xs font-semibold rounded p-2 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>{deliveryLocationText}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
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
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </button>

            <button className="flex flex-col text-xs font-semibold items-center space-x-1 pr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>

              <p>{userGreeting}</p>
            </button>
          </div>
        </div>
      </nav>
      <EventBar />
    </>
  ) : (
    <></>
  );
};

export default TopNavbar;
