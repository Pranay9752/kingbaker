import React, { useState, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import Cookies from "js-cookie";

const countries = [
  { code: "IN", name: "INDIA", flag: "https://flagsapi.com/IN/shiny/64.png" },
  { code: "US", name: "USA", flag: "https://flagsapi.com/US/shiny/64.png" },
  { code: "GB", name: "UK", flag: "https://flagsapi.com/GB/flat/64.png" },
  {
    code: "AU",
    name: "Australia",
    flag: "https://flagsapi.com/AU/flat/64.png",
  },
  { code: "CA", name: "Canada", flag: "https://flagsapi.com/CA/shiny/64.png" },
  // Add more countries as needed
];

const CountryModal = ({ closeModal }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCountry = useCallback((country) => {
    setSelectedCountry(country);
  }, []);

  const onCountrySubmit = () => {
    Cookies.set("country", JSON.stringify(selectedCountry));
    closeModal()
  };

  const Row = useCallback(
    ({ index, style }) => {
      const country = filteredCountries[index];
      const isSelected =
        selectedCountry && selectedCountry.code === country.code;
      return (
        <div
          style={style}
          className={`flex items-center p-4 cursor-pointer `}
          onClick={() => handleSelectCountry(country)}
        >
          <div className=" mr-3 rounded-full h-10 w-10 overflow-hidden">
            <img
              className="object-fill aspect-square scale-150"
              src={country.flag}
            />
          </div>

          <span className="flex-grow">{country.name}</span>
          {isSelected && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      );
    },
    [filteredCountries, selectedCountry, handleSelectCountry]
  );

  return (
    <section className="h-[90vh] flex flex-col justify-start item-center w-full  ">
      <div className="pb-3 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">All Countries</h2>
        <button onClick={closeModal} className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 relative">
        <input
          type="text"
          placeholder="Search Country"
          className="w-full p-2 pl-10 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 absolute left-7 top-7 text-gray-400"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {selectedCountry && (
        <div className="flex items-center p-4 border-b-2 border-gray-300">
          <div className=" mr-3 rounded-full h-10 w-10 overflow-hidden">
            <img
              className="object-fill aspect-square scale-150"
              src={selectedCountry.flag}
            />
          </div>{" "}
          <span className="flex-grow">{selectedCountry.name}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 text-green-500"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <List
        height={400}
        itemCount={filteredCountries.length}
        itemSize={60}
        width="100%"
      >
        {Row}
      </List>

      <div className="mt-auto p-4">
        <button
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold"
          onClick={onCountrySubmit}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </section>
  );
};

export default CountryModal;
