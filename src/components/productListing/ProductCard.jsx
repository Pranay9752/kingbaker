/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FlowerBouquetCard = ({
  productId,
  images,
  title,
  price,
  rating,
  reviews,
  deliveryInfo,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isHovering && images?.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images?.length);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovering, images?.length]);

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setCurrentImageIndex(0);
      }}
      onClick={() => navigate(`/product/${productId}`)}
    >
      <div className="relative h-64 overflow-hidden">
        {images?.length > 0 &&
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
      </div>
      <div className="px-6 py-4 transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-left text-md mb-2">{title}</h2>
        <div className="flex items-center justify-between">
          <p className="text-gray-700 font-bold text-base mb-2">{price}</p>
          <div className="flex items-center mb-2 text-sm bg-green-600 p-1 rounded-xl px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className=" text-yellow-400 size-3 fill-current"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="ml-2 text-white">{rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <p className="text-gray-600">{deliveryInfo}</p>
          <span className="ml-2 text-gray-500">{reviews} Reviews</span>
        </div>
      </div>
    </div>
  );
};

export default FlowerBouquetCard;
