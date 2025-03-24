/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardThree from "./CardThree";
import { getCard } from ".";
import { cn } from "../../atom/utils/cn";
const CustomSizedGrid = ({ cards, isMobileView = false }) => {
  const navigate = useNavigate();

  return (
    <div style={cards?.boxStyle} className="h-full w-full  overflow-hidden ">
      <h2 className={cn("text-lg md:text-2xl text-center md:text-start font-bold mb-2 md:mb-4 w-full ", isMobileView ? "text-center" : "text-start")}>
        {cards.title}
      </h2>
      <div
        className="flex transition-transform duration-300 ease-in-out w-full h-[9 0%]"
        style={cards.innerContainerStyle}
      >
        {cards.items.map((card, index) => (
          <div
            style={card?.cardStyle}
            key={index}
            onClick={() => navigate(`/search/${card.route}`)}
            className="flex-shrink-0 w-full h-full overflow-hidden"
          >
            {getCard({ data: card, isMobileView })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSizedGrid;
