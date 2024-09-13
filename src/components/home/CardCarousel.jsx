/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardThree from "./CardThree";
import { getCard } from ".";
const CardCarousel = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentIndex < cards.items.length - 5) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="relative w-full overflow-hidden p-4">
      <h2 className="text-2xl text-start font-bold mb-4">{cards.title}</h2>
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / 5)}%)`,
          width: `${cards.items.length * (100 / 5)}%`,
        }}
      >
        {cards.items.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className="w-1/8 flex-shrink-0 px-2"
          >
            {/* <CardThree
              image={card.image}
              key={index}
              title={card.text}
              price={card.price}
            /> */}
            {getCard({ data: card })}
          </div>
        ))}
      </div>

      {/* Conditionally render the previous button */}
      {currentIndex > 0 && (
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          onClick={prevSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* Conditionally render the next button */}
      {currentIndex < cards.items.length - 5 && (
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          onClick={nextSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CardCarousel;
