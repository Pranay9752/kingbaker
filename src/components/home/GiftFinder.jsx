import React, { useState, useEffect } from "react";
import CustomDropdown from "./CustomDropDown";

// Simulated API calls
const fetchOccasions = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(["Birthday", "Anniversary", "Wedding", "Graduation"]),
      500
    )
  );

const fetchGiftTypes = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(["Flowers", "Cakes", "Plants", "Gift Baskets"]),
      500
    )
  );

const SearchInput = ({ placeholder, onChange }) => {
  return (
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="w-full py-3 pl-8 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive-500 focus:border-olive-500"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4 text-gray-400"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

const Button = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-olive-500 focus:ring-offset-2 ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-[#7d8035] text-white hover:bg-[#7d995e]"
      }`}
    >
      {text}
    </button>
  );
};

const GiftFinder = () => {
  const [pincode, setPincode] = useState("");
  const [occasion, setOccasion] = useState("");
  const [giftType, setGiftType] = useState("");
  const [occasions, setOccasions] = useState([]);
  const [giftTypes, setGiftTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [occasionsData, giftTypesData] = await Promise.all([
          fetchOccasions(),
          fetchGiftTypes(),
        ]);
        setOccasions(occasionsData);
        setGiftTypes(giftTypesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = () => {
    console.log("Searching for gifts:", { pincode, occasion, giftType });
    // Here you would typically make an API call with these parameters
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md ">
      <div className=" flex items-center justify-center">
        <div className="font-bold text-gray-700 text-center">GIFT FINDER</div>
      </div>
      <div className="flex-1">
        <SearchInput
          placeholder="Enter Pincode"
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <CustomDropdown
          title="Occasion"
          placeholder="Birthday, Anniversary etc."
          options={occasions}
          onChange={setOccasion}
        />
      </div>
      <div className="flex-1">
        <CustomDropdown
          title="Gift Type"
          placeholder="Flowers, Cakes, Plants, etc."
          options={giftTypes}
          onChange={setGiftType}
        />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Button
          text={isLoading ? "Loading..." : "FIND GIFTS"}
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default GiftFinder;
