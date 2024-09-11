import React from 'react';

const ProductCard = ({
  imageUrl,
  title,
  price,
  deliveryInfo,
  rating,
  reviews,
  className = '',
}) => {
  return (
    <div className={`flex-none w-40 bg-white px-2 py-2 border rounded-xl hover:bg-slate-50 cursor-pointer  active:scale-95 ease-in-out text-left ${className}`}>
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-lg mb-2" />
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-sm font-bold text-gray-900">{price}</p>
      <p className="text-xs text-gray-600">{deliveryInfo}</p>
      <div className="flex items-center mt-1">
        <span className="text-sm font-medium text-green-600 bg-green-100 px-1 rounded">{rating}★</span>
        <span className="text-xs text-gray-500 ml-1">{reviews} Reviews</span>
      </div>
    </div>
  );
};

export default ProductCard;
