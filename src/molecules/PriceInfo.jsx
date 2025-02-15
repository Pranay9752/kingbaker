import { Tooltip } from "antd";
import BasicButton from "../atom/button/BasicButton";
import scrollToDiv from "../atom/utils/scrollToDiv";

const PriceInfo = ({ price, taxInfo }) => (
  <>
    <span className="md:hidden">
      <p className="text-2xl font-bold text-left ">₹ {price}</p>
      <p className="text-sm text-gray-400 mb-2 flex items-center">
        {taxInfo}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </p>
    </span>
    <div className=" hidden md:flex">
      <span className="text-xl font-bold text-left ">₹</span>
      <span className="text-5xl ">{price}</span>
      <div className="flex flex-col ml-2">
        <p className="text-sm text-gray-400 flex items-center">
          {taxInfo}
          <Tooltip
            color="white"
            overlayInnerStyle={{
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              minWidth: "320px", // Added fixed minimum width
            }}
            title={
              <div className="text-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <h3 className="text-sm font-medium">Price Details</h3>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start space-x-4">
                    <div className="flex flex-col min-w-0">
                      {" "}
                      {/* Added min-w-0 to allow text truncation */}
                      <span className="font-medium text-sm truncate">
                        Maximum Retail Price
                      </span>
                      <span className="text-gray-500 text-xs mt-1 truncate">
                        ({taxInfo})
                      </span>
                    </div>
                    <span className="font-semibold text-lg whitespace-nowrap">
                      ₹{price}
                    </span>
                  </div>
                </div>
              </div>
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </Tooltip>
        </p>
        <div
          onClick={() => scrollToDiv("offersAvailable")}
          className={
            "text-white  bg-gray-500 rounded-lg py-1 text-xs px-2 flex gap-1 w-fit"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M4.5 2A2.5 2.5 0 0 0 2 4.5v2.879a2.5 2.5 0 0 0 .732 1.767l4.5 4.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-4.5-4.5A2.5 2.5 0 0 0 7.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Offers Available</span>
        </div>
      </div>
    </div>
    <div
      onClick={() => scrollToDiv("productMeta")}
      className="text-blue-500 hover:underline text-left cursor-pointer hidden md:flex justify-start items-start gap-2 text-sm"
    >
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
      <span>View More Details</span>
    </div>
  </>
);

export default PriceInfo;
