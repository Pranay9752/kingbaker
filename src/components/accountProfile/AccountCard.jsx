/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-64 m-2 cursor-pointer">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-md font-bold mb-1">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
};

const CardRow = ({ cards }) => {
  return (
    <div className="container mx-auto p-4 bg-[#f2f2f2] h-[100vh]">
      <h2 className="text-lg text-center font-bold">MY ACCOUNT</h2>
      <div className="flex flex-wrap gap-0 justify-center mx-auto w-3/4 items-center mt-4">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};
export default CardRow;
