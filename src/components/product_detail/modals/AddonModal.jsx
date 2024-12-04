import React, { useState, useMemo } from "react";
import AddonCard from "../../../molecules/cards/AddonCard";
import CategoryFilter from "../../../molecules/CategoryFilter";
import { useNavigate, useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import getCookie from "../../../atom/utils/getCookies";
import setCookie from "../../../atom/utils/setCookies";
import {
  useCreateOrderMutation,
  useGetCartItemQuery,
} from "../../../redux/apiSlices/ecom/checkoutApiSlice";
import { toast } from "sonner";
import { addInit } from "../../../redux/slices/ecom/orderSlice";
import { useDispatch } from "react-redux";

const ProductAddOns = ({
  closeModal,
  addons,
  product,
  productId: selectedProductId,
}) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [quantities, setQuantities] = useState({});
  const { getValues } = useFormContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
  const { data } = useGetCartItemQuery();

  const delivery = getValues("delivery");
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
        (acc, current) => {
          const product = addons?.find((p) => p.addOn_id == current[0]);
          console.log(product);

          return {
            price: acc?.price + (product ? product.price * current[1] : 0),
            quantity: current[1] + acc?.quantity,
          };
        },
        {
          price: 0,
          quantity: 0,
        }
      ),
    [quantities, addons]
  );

  const convertData = (order, selectedAddon) => {
    const addonMap = selectedAddon.reduce((map, item) => {
      map[item.addOn_id] = item.count; // Key is addOn_id, value is count
      return map;
    }, {});

    // Step 2: Iterate over the addons and attach the count from addonMap
    const result = addons
      .filter((addon) => addonMap[addon._id] !== undefined) // Filter if addon exists in addonMap
      .map((addon) => ({
        ...addon, // Spread addon details
        count: addonMap[addon._id], // Add count from the map
      }));
    const { delivery_details, location } = order;
    const shipping = delivery_details?.shipping ?? {};
    const baseObject = {
      mainItem: {
        productDetails: [
          {
            _id: product?._id,
            productId: delivery_details?.product_id,
            prices:
              getValues("specification")?.value?.price ?? product?.prices ?? 0,
            imageLink: product?.imageLink ?? [],
            title: product?.title ?? "",
          },
        ],
        order_id: `ORD${Math.floor(Math.random() * 1000) + 1}`,
        deliveryAddresses: [],
        is_veg: delivery_details?.is_veg,
        shipping: shipping,
        message_on_product: delivery_details?.message_on_product,
        is_message: delivery_details?.is_message,
        is_image: delivery_details?.is_image,
        images: [],
        special_request: "",
        order_status: order?.order_status,
        payment_status: order?.payment_status,
        location: location,
        id: delivery_details?.product_id,
        name: product?.title ?? "",
        price: getValues("specification")?.value?.price ?? product?.prices ?? 0,
        quantity: 1,
        image: product?.imageLink?.[0] ?? "",
      },
      addons: result?.map((item) => ({
        id: item?._id,
        name: item?.title,
        price: item?.price,
        quantity: item?.count,
        image: item?.images?.[0] ?? "",
      })),
      deliveryDetails: {
        method: shipping?.method ?? "",
        date: shipping?.delivery_date,
        timeSlot: shipping?.time,
        fee: shipping?.shipping_amount,
      },
      occasion: null,
      messageCard: "",
      messageOnCake: "",
    };
    return baseObject;
  };

  const transformData = (data) => {
    const tData = data.map((item, index) => {
      const main = item?.mainItem ?? {};
      const productDetail = main?.productDetails?.[0];
      const addons = item?.addOn ?? [];
      return {
        mainItem: {
          ...main,
          id: productDetail._id,
          name: productDetail?.title,
          price: productDetail?.prices,
          quantity: 1,
          image: productDetail?.imageLink?.[0],
        },
        addons: addons?.map((addon) => ({
          id: addon?._id ?? "",
          name: addon?.title ?? "",
          price: addon?.price ?? 0,
          quantity: addon?.count?.count ?? 0,
          image: addon?.images?.[0] ?? "",
        })),
        deliveryDetails: {
          method: main?.shipping?.method,
          date: main?.shipping?.delivary_date,
          timeSlot: main?.shipping?.time,
          fee: main?.shipping?.shipping_amount ?? 0,
        },
        occasion: null,
        messageCard: "",
        messageOnCake: "",
      };
    });

    return tData;
  };

  const addToCartItem = async () => {
    // if (data) {
    //   const transformedData = transformData(data?.data?.delivery_details);
    //   dispatch(addInit(transformedData));
    //   navigate("/");
    // }
  };

  const handleSubmit = async () => {
    const isLogin = getCookie("_id") ? true : false;
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

    const convertedData = convertData(newOrder, addonsArr ?? []);

    if (!isLogin) {
      const cartCookie = getCookie("cart", true);
      const cartOrder = cartCookie
        ? typeof cartCookie == "object"
          ? cartCookie
          : JSON.parse(cartCookie)
        : [];
      setCookie("cart", [...cartOrder, convertedData], true);
      dispatch(addInit([...cartOrder, convertedData]));
      closeModal();
    } else {
      try {
        await createOrder(newOrder);
        toast.success("Order created successfully");
        await addToCartItem();
        location.reload();
      } catch (error) {}
    }
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
          <span>₹ {delivery?.price ?? 0}</span>
        </div>
        <div className="flex justify-between items-center font-bold">
          <span>TOTAL</span>
          <span>₹ {total?.price ?? 0 + (delivery?.price ?? 0)}</span>
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
