import React from "react";

const AddonCard = ({ product, quantity, onQuantityChange, darkMode = false }) => {
  const handleChange = (e) => {
    onQuantityChange(product.addOn_id, e.target.checked ? 1 : 0);
  };

  return (
    // <div
    //   className={`flex flex-col justify-between  p-1.5 rounded-xl border ${
    //     quantity > 0 ? "border-orange-600 bg-orange-500/20 " : "bg-slate-50 "
    //   }`}
    // >
    //   <img
    //     src={product.images[0]}
    //     alt={product.description}
    //     className="w-full aspect-square object-cover rounded-lg mb-2"
    //   />
    //   <div className="text-left flex-1 flex flex-col justify-between">
    //     <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
    //     <p className="text-lg font-bold">₹ {product.price}</p>
    //   </div>
    //   <div className="flex items-center justify-between w-full">
    //     <input
    //       checked={quantity > 0 ? true : false}
    //       onChange={handleChange}
    //       type="checkbox"
    //       className="form-checkbox h-5 w-5 text-orange-500"
    //     />
    //     <div className="flex items-center space-x-2">
    //       <button
    //         type="button"
    //         onClick={() =>
    //           onQuantityChange(product.addOn_id, Math.max(0, quantity - 1))
    //         }
    //         className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 20 20"
    //           fill="currentColor"
    //           className="size-5"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //       </button>
    //       <span>{quantity}</span>
    //       <button
    //         type="button"
    //         onClick={() => onQuantityChange(product.addOn_id, quantity + 1)}
    //         className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 20 20"
    //           fill="currentColor"
    //           className="size-5"
    //         >
    //           <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
    //         </svg>
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div
    className={`flex flex-col justify-between p-1.5 rounded-xl border ${
      quantity > 0
        ? darkMode
          ? "border-orange-500 bg-orange-700/30"
          : "border-orange-600 bg-orange-500/20"
        : darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-slate-50"
    }`}
  >
    <img
      src={product.images[0]}
      alt={product.description}
      className="w-full aspect-square object-cover rounded-lg mb-2"
    />
    <div className={`text-left flex-1 flex flex-col justify-between ${darkMode ? "text-white" : "text-black"}`}>
      <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
      <p className="text-lg font-bold">₹ {product.price}</p>
    </div>
    <div className="flex items-center justify-between w-full">
      <input
        checked={quantity > 0 ? true : false}
        onChange={handleChange}
        type="checkbox"
        className={`form-checkbox h-5 w-5 ${darkMode ? "text-orange-400" : "text-orange-500"}`}
      />
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() =>
            onQuantityChange(product.addOn_id, Math.max(0, quantity - 1))
          }
          className={`p-1 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
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
          type="button"
          onClick={() => onQuantityChange(product.addOn_id, quantity + 1)}
          className={`p-1 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
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
};

export default AddonCard;
