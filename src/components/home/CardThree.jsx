/* eslint-disable react/prop-types */
import React from "react";
import BasicButton from "../../atom/button/BasicButton";
import { twMerge } from "tailwind-merge";

const CardThree = ({ data, isMobileView = false }) => {
  return (
    <div
      style={data?.cardStyle}
      className=" bg-white rounded-lg shadow-md overflow-hidden transition-all p-2 duration-300 hover:shadow-lg"
    >
      <div style={data?.imageStyle} className={twMerge(" overflow-hidden", isMobileView ? "h-52 md:h-52" : 'h-52 md:h-64')}>
        <img
          src={data.image}
          alt={data.text}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";
          }}
        />
      </div>
      <div
        className={`p-2 ${data.price == null ? "text-center" : "text-left"}`}
      >
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
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

export default CardThree;
