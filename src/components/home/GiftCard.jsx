/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
const GiftCard = ({
  image,
  title,
  className = "",
  containerStyle = {},
  imageContainerStyle = {},
  imageStyle = {},
  titleStyle = {},
  roundedCard = false,
  hoverEffect = true,
  showBorder = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center ${roundedCard ? "p-6" : "p-3"} ${
        showBorder ? "border border-gray-200" : ""
      } ${className}`}
      style={{
        backgroundColor: "#fff",
        borderRadius: roundedCard ? "50%" : "8px",
        ...containerStyle,
      }}
    >
      <div
        className={`overflow-hidden ${roundedCard ? "bg-gray-100" : ""} `}
        style={{
          borderRadius: roundedCard ? "50%" : "0",
          ...imageContainerStyle,
        }}
      >
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover ${hoverEffect ? "transition-transform duration-300 hover:scale-105" : ""}`}
          style={imageStyle}
        />
      </div>
      {title && (
        <h3
          className={`text-sm font-semibold text-center text-gray-800 ${
            roundedCard ? "mt-3" : "mt-4"
          }`}
          style={titleStyle}
        >
          {title}
        </h3>
      )}
    </div>
  );
};

export default GiftCard;
