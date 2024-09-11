/* eslint-disable react/prop-types */
import React from "react";
import BasicButton from "../../atom/button/BasicButton";

const CardThree = ({ data }) => {
  console.log("data: ", data);
  return (
    <div className=" bg-white rounded-lg shadow-md overflow-hidden transition-all p-2 duration-300 hover:shadow-lg">
      <div className="h-64 overflow-hidden">
        <img
          src={data.image}
          alt={data.text}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
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
