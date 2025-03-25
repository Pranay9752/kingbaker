/* eslint-disable react/prop-types */
import React from "react";
import BasicButton from "../../atom/button/BasicButton";
import { twMerge } from "tailwind-merge";
import { cn } from "../../atom/utils/cn";

const SizedCard = ({ data, isMobileView = false }) => {
  console.log(data?.cardStyle)
  return (
    <div
      className="relative bg-white w-full h-full rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      <div style={data?.imageStyle} className="w-full h-full" >
        <img
          src={data.image}
          alt={data.text}
          className="w-full h-full object-fill transition-transform duration-300 ease-in-out hover:scale-105 "
          onError={(e) => {
            e.target.src =
              "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";
          }}
        />
      </div>
      <div
      style={data?.textStyle}
        className={cn(` ${data.price == null ? "text-center" : "text-left"}`)}
      >
        <h3 className="text-xs md:text-sm font-semibold text-gray-700 mb-2 line-clamp-2">
          {data.text}
        </h3>
        {data?.price && (
          <p className="text-gray-600 font-bold"> `₹${data?.price}` </p>
        )}
        {data?.button && (
          <BasicButton style={data?.button?.style}>
            {data.button?.name ?? ""}
          </BasicButton>
        )}
      </div>
    </div>
  );
};

export default SizedCard;
