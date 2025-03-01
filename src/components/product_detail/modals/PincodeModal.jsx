import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import setCookie from "../../../atom/utils/setCookies";
import LocationAutocomplete from "../../../molecules/location/LocationAutocomplete";

const PincodeModal = ({ closeModal, handleSwitchToLocation }) => {
  const [locationData, setLocationData] = useState(null);

  return (
    <section className="h-[90vh] md:h-fit [30vh] flex flex-col justify-start item-center w-full md:w-[20vw]  ">
      <div className="pb-3 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Deliver To</h2>{" "}
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

      <LocationAutocomplete onLocationSelect={setLocationData}  regionRestriction={"IN"} />

      {/* <button
        onClick={handleSwitchToLocation}
        className="text-blue-600 text-sm mt-2 text-left"
      >
        Don't Know Pincode?
      </button> */}
      <button
        onClick={() => {
          if (!locationData) return;
          setCookie("pincode", locationData.pincode);
          setCookie("city", locationData.city);
          setCookie("region", locationData.state);
          setCookie("lat", locationData.lat);
          setCookie("lng", locationData.lng);
          closeModal();
          window.location.reload();
        }}
        className="bg-orange-400 px-4 py-3 rounded-md text-white font-medium mt-5"
      >
        Update Location
      </button>
    </section>
  );
};

export default PincodeModal;
