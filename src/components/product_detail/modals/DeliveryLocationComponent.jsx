import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import LocationAutocomplete from "../../../molecules/location/LocationAutocomplete";
import setCookie from "../../../atom/utils/setCookies";

const DeliveryLocationComponent = ({ closeModal }) => {
  const { register } = useFormContext();
  const [locationData, setLocationData] = useState(null);
  const [location, setLocation] = useState("");

  return (
    <section className="h-[90vh] md:h-fit flex flex-col justify-start item-center w-full pt-2 md:pt-0 relative text-left">
      <button
        onClick={closeModal}
        className="text-gray-500 absolute right-2 top-2 md:-top-2 md:-right-2"
      >
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
      <h1 className="text-2xl font-bold mb-2 md:mb-0 mt-5">
        Choose Your Delivery Location
      </h1>
      <p className="text-gray-600 mb-6">Enter area or locality.</p>

      <div className="relative mb-6">
        <LocationAutocomplete onLocationSelect={setLocationData} regionRestriction={"IN"} />
      </div>

      <button
        onClick={() => {
          if (!locationData) return;
          setCookie("pincode", locationData.pincode);
          setCookie("city", locationData.city);
          setCookie("region", locationData.state);
          setCookie("lat", 19.4166761);
          setCookie("lng", 72.79837049999999);
          // setCookie("lat", locationData.lat);
          // setCookie("lng", locationData.lng);
          closeModal();
          window.location.reload();
        }}
        className="bg-orange-300 text-white py-3 rounded-lg font-semibold"
      >
        Update Location
      </button>
    </section>
  );
};

export default DeliveryLocationComponent;
