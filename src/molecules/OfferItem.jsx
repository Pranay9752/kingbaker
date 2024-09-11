import { useState } from "react";
import BottomSheet from "../atom/popovers/BottomSheet";
import ModalWrapper from "./wrappers/ModalWrapper";

const TERMS = [
  "The cake stand, cutlery accessories used in the image are only for representation purposes. They are not delivered with the cake.",
  "The cake stand, cutlery accessories used in the image are only for representation purposes. They are not delivered with the cake.",
  "The cake stand, cutlery accessories used in the image are only for representation purposes. They are not delivered with the cake.",
  "The cake stand, cutlery accessories used in the image are only for representation purposes. They are not delivered with the cake.",
  "The cake stand, cutlery accessories used in the image are only for representation purposes. They are not delivered with the cake.",
  "The cake stand, cutlery accessories used in the image are only for representation purposes. They are not delivered with the cake.",
  "The cake stand, cutlery accessories used in the image are only for representation purposes. They are not delivered with the cake.",
];

const OfferItem = ({ logo, description, code, terms }) => {
  const [isTerms, setIsTerms] = useState(false);

  return (
    <>
      <div className="grid grid-cols-[25%,65%,10%] px-5 py-4 md:py-3 border text-left place-items-center gap-2">
        <img
          src={logo}
          alt="Offer logo"
          className="w-20 mr-2 place-content-start"
        />
        <div className="w-full">
          <p className="text-sm">{description}</p>
          {code && <p className="text-xs font-semibold">Code: {code}</p>}
        </div>
        {terms && (
          <span
            onClick={() => setIsTerms(true)}
            className="text-xs text-blue-500 "
          >
            *T&C
          </span>
        )}
      </div>
      {/* <BottomSheet
        maxHeight={"40vh"}
        className={""}
        isOpen={isTerms}
        onClose={(e) => setIsTerms(false)}
      >
        <section className=" h-[40vh] overflow-hidden ">
          <div className="pb-3 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Terms and Condition</h2>
            <button
              onClick={(e) => setIsTerms(false)}
              className="text-gray-500"
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
          </div>
          <div className="overflow-y-auto h-[30vh]">
            <ul className="list-disc list-inside text-gray-600 flex flex-col gap-2 m-3 mt-2">
              {TERMS?.map((item, i) => (
                <li key={i}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </BottomSheet> */}
      <ModalWrapper
        maxHeight={"40vh"}
        className={""}
        isOpen={isTerms}
        onClose={(e) => setIsTerms(false)}
      >
        <section className=" h-[40vh] md:h-fit md:w-[30vw] overflow-hidden ">
          <div className="pb-3 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Terms and Condition</h2>
            <button
              onClick={(e) => setIsTerms(false)}
              className="text-gray-500"
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
          </div>
          <div className="overflow-y-auto h-[30vh]">
            <ul className="list-disc list-inside text-gray-600 flex flex-col gap-2 m-3 md:m-0 mt-2">
              {TERMS?.map((item, i) => (
                <li key={i}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ModalWrapper>
    </>
  );
};

export default OfferItem;
