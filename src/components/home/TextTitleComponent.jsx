import React from "react";

const TextTitleComponent = ({ title, description }) => {
  return (
    <header className="bg-white py-4 m-4 w-full rounded-2xl">
      <div className="container  flex items-center justify-center ">
        <div className="flex items-center flex-col justify-center">
          <h1 className="text-2xl font-light text-brown-500">{title}</h1>
          <p className="text-gray-500 text-xs font-semibold">{description}</p>
        </div>
      </div>
    </header>
  );
};

export default TextTitleComponent;
