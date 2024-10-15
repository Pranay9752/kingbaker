import React, { useState, useMemo } from "react";
import AddonCard from "../../../molecules/cards/AddonCard";
import CategoryFilter from "../../../molecules/CategoryFilter";
import { useNavigate, useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import getCookie from "../../../atom/utils/getCookies";
import { useCreateOrderMutation } from "../../../redux/apiSlices/ecom/checkoutApiSlice";
import { toast } from "sonner";

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
  {
    id: 11,
    name: "Greeting Card As Per Occasion",
    price: 99,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Greeting",
  },
  {
    id: 21,
    name: "Magic Relighting Candle",
    price: 49,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Cake Accessories",
  },
  {
    id: 31,
    name: "5 Pc Dairy Milk Chocolates 12g",
    price: 149,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Gourmet",
  },
  {
    id: 41,
    name: "Candle 1",
    price: 49,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Cake Accessories",
  },
  {
    id: 13,
    name: "Greeting Card As Per Occasion",
    price: 99,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Greeting",
  },
  {
    id: 23,
    name: "Magic Relighting Candle",
    price: 49,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Cake Accessories",
  },
  {
    id: 33,
    name: "5 Pc Dairy Milk Chocolates 12g",
    price: 149,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Gourmet",
  },
  {
    id: 43,
    name: "Candle 1",
    price: 49,
    image: "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
    category: "Cake Accessories",
  },
];

const ProductAddOns = ({
  closeModal,
  addons,
  productId: selectedProductId,
}) => {
  console.log("productId: ", selectedProductId);

  const [activeCategory, setActiveCategory] = useState("All");
  const [quantities, setQuantities] = useState({});
  const { getValues } = useFormContext();
  const navigate = useNavigate();

  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
  const categories = useMemo(
    () => ["All", ...new Set(addons.map((p) => p.category))],
    [addons]
  );

  const filteredProducts = useMemo(
    () =>
      activeCategory === "All"
        ? addons
        : addons.filter((p) => p.category === activeCategory),
    [activeCategory, addons]
  );

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const total = useMemo(
    () =>
      Object.entries(quantities).reduce(
        (curr, [productId, quantity]) => {
          const product = addons?.find(
            (p) => p.addOn_id === parseInt(productId)
          );
          return {
            price: curr?.price + (product ? product.price * quantity : 0),
            quantity: quantity + curr?.quantity,
          };
        },
        {
          price: 0,
          quantity: 0,
        }
      ),
    [quantities, addons]
  );

  // console.log(getValues(), quantities);
  const handleSubmit = async () => {
    const addonsArr = Object.keys(quantities)?.map((item) => {
      const addON_id = Array.isArray(addons)
        ? addons.find((el) => el.addOn_id == item)
        : [];
      return {
        addOn_id: addON_id?._id,
        count: quantities[item],
      };
    });
    const formData = getValues();

    const newOrder = {
      user_id: getCookie("_id"),
      order_status: "PENDING",
      payment_status: "PENDING",
      location: {
        latitude: 18.996559,
        longitude: 72.821319,
      },
      pincode: 12345,
      delivery_details: {
        product_id: selectedProductId,
        delivery_address: null,
        // "product_id": "670174711b685f8d65ce4bd1",
        // "product_id": "6700321b721e900c3fa00e81",
        message_on_product: formData?.msgOnCake ?? "",
        imgaes_on_product: formData?.imageOnCake ?? "",
        is_message: formData?.msgOnCake ? "true" : "false",
        is_image: formData?.imageOnCake ? "true" : "false",
        is_veg: formData?.egg == "on" ? "false" : true,
        special_request: "",
        delivary_date: formData?.day,
        shipping: {
          method: formData?.delivery?.title,
          time: formData?.slot?.time,
          shipping_amount: formData?.delivery?.price,
          delivary_date: formData?.day,
        },
        addOn: addonsArr ?? [],
      },
    };
    try {
      await createOrder(newOrder);
      toast.success("Order created successfully");
      navigate("/");
    } catch (error) {}
  };
  return (
    <section className=" h-[110vh] md:h-[90vh] md:w-[80vw] overflow-hidden ">
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

      <div className="mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 overflow-y-auto h-[62vh] ">
        {filteredProducts.map((product) => (
          <AddonCard
            key={product.addOn_id}
            product={product}
            quantity={quantities[product.addOn_id] || 0}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      <div className=" bg-white rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span>₹ 49</span>
        </div>
        <div className="flex justify-between items-center font-bold">
          <span>TOTAL</span>
          <span>₹ {total?.price ?? 0 + 49}</span>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4 font-bold"
        >
          CONTINUE WITH{total?.quantity > 0 ? ` ${total?.quantity}` : "OUT"}{" "}
          ADDON
        </button>
      </div>
    </section>
  );
};

export default ProductAddOns;
