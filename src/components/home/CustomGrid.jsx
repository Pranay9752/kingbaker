/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardThree from "./CardThree";
import { getCard } from ".";
const CustomGrid = ({ cards, isMobileView= false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div style={cards?.boxStyle} className=" w-full overflow-hidden p-4">
      <h2 className="text-2xl text-start font-bold mb-4 w-full">
        {cards.title}
      </h2>
      <div
        className="flex transition-transform duration-300 ease-in-out w-full"
        style={cards.innerContainerStyle}
      >
        {cards.items.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(`/search/${card.route}`)}
            className="w-1/8 flex-shrink-0 "
          >
            {getCard({ data: card, isMobileView })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomGrid;
