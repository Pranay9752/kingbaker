import React, { useRef, useEffect } from "react";
import FlowerBouquetCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import SEO from "../../atom/seo/SEO";

const ProductListing = ({
  title,
  rating,
  reviewCount,
  totalItems,
  sortOptions,
  promoCard,
  categories,
  products,
  onScrollEnd,
  sortClick,
  sortKeys,
}) => {
  const listingRef = useRef(null);
  const navigate = useNavigate();
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
    <div className="max-w-7xl mx-auto md:p-4 md:pl-0 ">
       <SEO title={title} />
      <div className="p-3 mx-4 md:mx-0 pb-0 rounded-lg bg-white">
        <div className="md:flex hidden items-center mb-4 gap-2">
          <h1 className="text-2xl font-semibold capitalize">{title}</h1>|
          <span className="flex items-center gap-4 text-gray-600 text-md font-md  capitalize">
            {products.length ?? 0} of {hasProducts ? products.length : 0}{" "}
            {title}
          </span>
        </div>

        <div className="md:flex hidden space-x-4 mb-4">
          <p className="font-semibold items-center justify-center text-gray-500">
            Sort By:
          </p>
          {sortOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => sortClick(option)}
              className={`px-3 py-1 font-semibold text-sm ${
                option?.value === sortKeys?.value
                  ? " text-[#e87325] border-b-2 border-[#e87325]"
                  : " text-gray-500"
              }`}
            >
              {option?.label}
            </button>
          ))}
        </div>
      </div>

      {/* {promoCard && (
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-4 md:p-6 text-white mb-4 md:mb-6 flex  md:flex-row justify-between items-center w-full max-w-full mx-auto">
          <div className="w-full md:w-1/2">
            <h2 className="text-sm md:text-2xl font-bold mb-2">
              {promoCard.title}
            </h2>
            <p className="text-xs md:text-lg">{promoCard.subtitle}</p>
          </div>
          <div className="text-right md:mt-0 w-full md:w-1/2">
            <p className="text-sm md:text-xl font-bold mb-1">Use Code:</p>
            <p className="text-md md:text-3xl font-bold">{promoCard.code}</p>
          </div>
        </div>
      )} */}

      <div className="grid grid-cols-3 sm:grid-cols-3 md:flex gap-4 mb-6 mx-4 md:mx-0">
        {categories.map((category, index) => (
          <button
            type="button"
            onClick={() => navigate("/search/" + category)}
            key={index}
            className="w-auto sm:w-auto px-4 py-2 bg-white border text-sm border-gray-300 rounded-lg"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 md:hidden items-center mb-4">
        <h1 className="text-2xl font-semibold  capitalize">{title}</h1>
        <div className="flex items-center gap-4">
          <span className="bg-[#008539] text-white px-2 py-0 rounded-md flex items-center ml-2 text-sm">
            {rating}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 ml-1"
            >
              <path
                fillRule="evenodd"
                d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="text-blue-600 mr-2">{reviewCount} Reviews</span>
        </div>
      </div>

      {hasProducts ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 md:gap-6 gap-0 divide-y divide-x md:divide-x-0 md:divide-y-0 divide-gray-400">
          {products.map((product, index) => {
            console.log("product: ", product.weight?.[0]?.price, product || 0);

            return (
              <FlowerBouquetCard
                key={product.productId}
                productId={product.productId}
                images={product.imageLink || ["/api/placeholder/400/320"]}
                title={product.title || "Untitled Product"}
                price={product.weight?.[0]?.price || "Price not available"}
                rating={product.rating || rating}
                reviews={product?.reviews?.length || reviewCount}
                deliveryInfo={
                  product.deliveryInfo || "Earliest Delivery: Today"
                }
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 text-xl">
            No products available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
