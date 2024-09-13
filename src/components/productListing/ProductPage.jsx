import React, { useRef, useEffect } from "react";
import FlowerBouquetCard from "./ProductCard";

const ProductListing = ({ title, rating, reviewCount, totalItems, sortOptions, promoCard, categories, products, onScrollEnd }) => {
  const listingRef = useRef(null);

  // Scroll event handler
  const handleScroll = () => {
    if (listingRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listingRef.current;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      // Trigger the callback when 70% of the scroll is reached
      if (scrollPercentage >= 0.7) {
        onScrollEnd(); // Call the load more function passed as a prop
      }
    }
  };

  useEffect(() => {
    const currentRef = listingRef.current;

    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [products]); // Run this effect when products change

  const hasProducts = Array.isArray(products) && products?.length > 0;

  return (
    <div ref={listingRef} className="max-w-7xl mx-auto px-4 py-8 h-full overflow-y-scroll">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center">
          <span className            ="text-gray-600 mr-2">{totalItems} items</span>
          {/* Sort Options */}
          <select className="border border-gray-300 rounded-md p-2">
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hasProducts ? (
          products.map((product, index) => (
            <FlowerBouquetCard
              key={product.id}
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListing;

