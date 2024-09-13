import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const DeliveryLocationComponent = ({ closeModal }) => {
  const { register } = useFormContext();

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
      <p className="text-gray-600 mb-6">
        Enter area or locality to get the Pincode.
      </p>

      <div className="relative mb-6">
        <div className="absolute inset-0 animate-glow rounded-lg"></div>
        <div className="relative bg-white border border-orange-300 rounded-lg overflow-hidden">
          <div className="flex items-center p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 text-gray-400 mr-2"
            >
              <path
                fillRule="evenodd"
                d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="* Enter Area or Locality"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              {...register("address")}
              className="w-full outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      <button
        onClick={closeModal}
        className="bg-orange-300 text-white py-3 rounded-lg font-semibold"
      >
        CONTINUE
      </button>
    </section>
  );
};

export default DeliveryLocationComponent;
