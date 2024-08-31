import React from "react";

const AddonCard = ({ product, quantity, onQuantityChange }) => (
  <div className="bg-white p-4 rounded-lg shadow mb-4">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-32 object-cover rounded mb-2"
    />
    <h3 className="font-semibold">{product.name}</h3>
    <p className="text-lg font-bold">₹ {product.price}</p>
    <div className="flex items-center justify-between mt-2">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-orange-500"
      />
      <div className="flex items-center space-x-2">
        <button
          onClick={() =>
            onQuantityChange(product.id, Math.max(0, quantity - 1))
          }
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => onQuantityChange(product.id, quantity + 1)}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

export default AddonCard;
