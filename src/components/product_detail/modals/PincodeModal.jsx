import React, { useState } from "react";

const PincodeModal = ({ closeModal, handleSwitchToLocation }) => {
  const [pincode, setPincode] = useState("");

  return (
    <section className="h-[90vh] flex flex-col justify-start item-center w-full pt-2 ">
      <div className="p-4 border-b flex justify-between items-center">
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
      <div className="relative">
        <div className="absolute inset-0 animate-glow rounded-lg"></div>
        <div className="relative bg-white border border-orange-300 rounded-lg overflow-hidden">
          <div className="flex items-center p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 text-orange-500 mr-2"
            >
              <path
                fillRule="evenodd"
                d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>
      </div>
      <button onClick={handleSwitchToLocation} className="text-blue-600 text-sm mt-2 text-left">
        Don't Know Pincode?
      </button>
    </section>
  );
};

export default PincodeModal;
