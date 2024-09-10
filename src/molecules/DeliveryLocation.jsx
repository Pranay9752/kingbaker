import React, { useMemo, useState } from "react";
import BottomSheet from "../atom/popovers/BottomSheet";
import CountryModal from "../components/product_detail/modals/CountryModal";
import Cookies from "js-cookie";
import PincodeModal from "../components/product_detail/modals/PincodeModal";
import DeliveryLocationComponent from "../components/product_detail/modals/DeliveryLocationComponent";
import getCookie from "../atom/utils/getCookies";

const DeliveryLocation = ({ country, pincode, location }) => {
  const [countryModal, setCountryModal] = useState(false);
  const [pincodeModal, setPincodeModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);

  const handleToggleCountryModal = (e, value = null) => {
    setCountryModal((prev) => (value ? value : !prev));
  };

  const handleTogglePincodeModal = (e, value = null) => {
    setPincodeModal((prev) => (value ? value : !prev));
  };
  const handleToggleLocationModal = (e, value = null) => {
    setLocationModal((prev) => (value ? value : !prev));
  };

  const handleSwitchToLocation = (e) => {
    handleTogglePincodeModal(e, false);
    handleToggleLocationModal(e, true);
  };

  const selectedCountry = JSON.parse(Cookies.get("country"));

  return (
    <>
      <div className="flex items-center justify-between bg-white border-2 border-gray-400 rounded w-full">
        {/* Left section */}
        <div
          onClick={handleToggleCountryModal}
          className="flex items-center border py-2 px-3 md:py-0 bg-slate-100 select-none"
        >
          <img
            src={selectedCountry?.flag ?? ""}
            alt={selectedCountry?.flag ?? ""}
            className="mr-2 w-10 h-10"
          />
          <span className="text-lg font-semibold text-gray-600 tracking-tighter">
            {selectedCountry?.code ?? ""}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 text-gray-600 transition-all ease-in-out ${
              countryModal && " rotate-180"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 text-xl truncate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="truncate">
            {pincode}, {location}
          </span>
          <svg
            onClick={handleTogglePincodeModal}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
          </svg>
        </div>
      </div>
      <button
        onClick={handleToggleLocationModal}
        className="text-blue-600 text-sm mt-2 text-left md:hidden"
      >
        Don't Know Pincode?
      </button>
      <BottomSheet
        isOpen={countryModal}
        onClose={(e) => handleToggleCountryModal(e, false)}
      >
        <CountryModal closeModal={(e) => handleToggleCountryModal(e, false)} />
      </BottomSheet>
      <BottomSheet
        isOpen={pincodeModal}
        onClose={(e) => handleTogglePincodeModal(e, false)}
      >
        <PincodeModal
          closeModal={(e) => handleTogglePincodeModal(e, false)}
          handleSwitchToLocation={handleSwitchToLocation}
        />
      </BottomSheet>
      <BottomSheet
        isOpen={locationModal}
        onClose={(e) => handleToggleLocationModal(e, false)}
      >
        <DeliveryLocationComponent
          closeModal={(e) => handleToggleLocationModal(e, false)}
        />
      </BottomSheet>
    </>
  );
};

export default DeliveryLocation;
