import React from "react";
import ProductCard from "../cards/ProductCard";

const ProductCarousel = ({
  title,
  products,
  className = "",
  cardClassName = "",
}) => {
  return (
    <div className={`w-full  ${className}`}>
      <h2 className="text-lg font-semibold my-3 text-gray-700 whitespace-nowrap truncate ">
        {title}
      </h2>
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
            deliveryInfo={product.deliveryInfo}
            rating={product.rating}
            reviews={product.reviews}
            className={cardClassName}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
