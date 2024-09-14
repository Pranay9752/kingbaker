/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
const CategoriesCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4" style={data.containerStyle} >
      {data.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(`search/${slide.route}`)}
          className="flex flex-col items-center p-2 transition-shadow duration-300"
        >
          <div className="overflow-hidden mb-2">
            <img
              src={item.image}
              alt={item.text}
              className="w-full h-full object-cover rounded-3xl hover:scale-105"
            />
          </div>
          <h3 className="text-sm font-semibold text-center text-gray-800 mb-1">
            {item.text}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default CategoriesCard;
