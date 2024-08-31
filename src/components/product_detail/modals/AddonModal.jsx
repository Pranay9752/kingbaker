import React, { useState, useMemo } from "react";
import AddonCard from "../../../molecules/cards/AddonCard";
import CategoryFilter from "../../../molecules/CategoryFilter";

// Sample product data
const products = [
  {
    id: 1,
    name: "Greeting Card As Per Occasion",
    price: 99,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Greeting",
  },
  {
    id: 2,
    name: "Magic Relighting Candle",
    price: 49,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Cake Accessories",
  },
  {
    id: 3,
    name: "5 Pc Dairy Milk Chocolates 12g",
    price: 149,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Gourmet",
  },
  {
    id: 4,
    name: "Candle 1",
    price: 49,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Cake Accessories",
  },
];

const ProductAddOns = ({ closeModal }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [quantities, setQuantities] = useState({});

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    []
  );

  const filteredProducts = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const totalAmount = useMemo(
    () =>
      Object.entries(quantities).reduce((sum, [productId, quantity]) => {
        const product = products.find((p) => p.id === parseInt(productId));
        return sum + (product ? product.price * quantity : 0);
      }, 0),
    [quantities]
  );

  return (
    <section className=" h-[100vh]">
      <div className="container mx-auto ">
        <div className="flex items-center mb-4">
          <svg
            onClick={closeModal}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>

          <h1 className="text-2xl font-bold text-center ml-2">
            Make it extra special
          </h1>
        </div>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="mt-4 grid grid-cols-2  h-full  overflow-y-auto">
          {filteredProducts.map((product) => (
            <AddonCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 0}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <div className="mt-4 bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span>Shipping</span>
            <span>₹ 49</span>
          </div>
          <div className="flex justify-between items-center font-bold">
            <span>TOTAL</span>
            <span>₹ {totalAmount + 49}</span>
          </div>
        </div>

        <button className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4 font-bold">
          CONTINUE WITHOUT ADD ONS
        </button>
      </div>
    </section>
  );
};

export default ProductAddOns;
