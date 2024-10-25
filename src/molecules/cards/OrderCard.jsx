import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import formatDate from "../../atom/utils/formatDate";
import classNames from "classnames"; // Optional utility for conditional class names

const OrderCard = ({
  handleSelectedOrder,
  order,
  isActive,
  handleDetailView,
  index,
  darkMode = false,
}) => {
  const deliveryAddress = order?.deliveryAddresses?.[0] ?? {};
  const addOn = order?.addOn;
  const shipping = order?.shipping ?? {};
  const user = order?.user?.[0] ?? {};
  const productDetails = order?.productDetails?.[0];

  const totalPrice = useMemo(() => {
    const shipping_amount = parseFloat(order?.shipping?.shipping_amount) ?? 0;
    const itemPrice = parseFloat(order?.productDetails?.[0]?.prices) ?? 0;
    const addonPrice =
      order?.addOn?.length > 0
        ? order?.addOn?.reduce(
            (prev, curr) => {
              return (
                parseFloat(prev) +
                (parseFloat(curr?.price) ?? 0) *
                  (parseFloat(curr?.count?.count) ?? 0)
              );
            },
            [0]
          )
        : 0;
    console.log(shipping_amount, itemPrice, addonPrice);
    return (shipping_amount + itemPrice + addonPrice)?.toFixed(0);
  }, [order]);
  return (
    // <motion.div
    //   className={classNames("bg-white rounded-lg shadow-lg p-6 mb-4 border-2", {
    //     "border-blue-500": isActive,
    //     "border-transparent": !isActive,
    //   })}
    //   whileHover={{ scale: 1.009 }}
    //   transition={{ type: "spring", stiffness: 300 }}
    // >
    //   {/* Order Header */}
    //   <div className="flex justify-between w-full items-center mb-4">
    //     <div className="flex items-center w-full gap-2">
    //       <input
    //         type="checkbox"
    //         checked={isActive}
    //         onChange={() =>
    //           handleSelectedOrder({
    //             order_id: order?.order_id ?? "",
    //             user_id: order?.user?.[0]?._id ?? "",
    //           })
    //         }
    //         className="mr-2 h-5 w-5 text-blue-600"
    //       />
    //       <h2
    //         onClick={() => handleDetailView({ index })}
    //         className="text-xl font-bold text-gray-800 w-full hover:text-blue-700 cursor-pointer"
    //       >
    //         {order?.order_id ?? ""}
    //       </h2>
    //       <span className="text-lg font-medium text-gray-600">
    //         ₹{totalPrice ?? 0}
    //       </span>
    //     </div>
    //   </div>

    //   {/* Customer Details */}
    //   <div className="mb-4">
    //     <h3 className="font-semibold text-gray-700">
    //       {deliveryAddress?.recipientName ?? ""}
    //     </h3>
    //     <p className="text-sm text-gray-600">
    //       {deliveryAddress?.recipientAddress ?? ""}
    //     </p>
    //     <p className="text-sm text-gray-600">
    //       {deliveryAddress?.recipientMobnumber ?? ""}
    //     </p>
    //   </div>

    //   {/* Delivery Details */}
    //   <div className="mb-4">
    //     {shipping && (
    //       <p className="text-sm font-medium text-blue-600">
    //         {shipping.method} | {formatDate(shipping.delivary_date)} |{" "}
    //         {shipping.time}
    //       </p>
    //     )}
    //   </div>

    //   {/* Add-On Items */}
    //   <div className="divide-y">
    //   <div className="flex items-center mb-1.5 pt-1.5">
    //         <img
    //           src={
    //             productDetails?.imageLink?.[0] ??
    //             "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg"
    //           }
    //           alt={productDetails?.title ?? ""}
    //           className="w-16 h-16 object-cover rounded-md mr-4"
    //         />
    //         <div className="flex-grow">
    //           <h4 className="font-medium text-gray-800">
    //             {productDetails?.title ?? ""}
    //           </h4>
    //           <p className="text-sm text-gray-600">
    //             {productDetails?.description ?? ""}
    //           </p>
    //         </div>
    //         <div className="text-right">
    //           <p className="font-medium text-gray-800">₹{productDetails?.prices ?? 0}</p>
    //           <p className="text-sm text-gray-600">
    //             Qty: 1
    //           </p>
    //         </div>
    //       </div>
    //     {addOn?.map((addon, index) => (
    //       <div key={index} className="flex items-center mb-1.5 pt-1.5">
    //         <img
    //           src={
    //             addon?.image?.[0] ??
    //             "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg"
    //           }
    //           alt={addon?.title ?? ""}
    //           className="w-16 h-16 object-cover rounded-md mr-4"
    //         />
    //         <div className="flex-grow">
    //           <h4 className="font-medium text-gray-800">
    //             {addon?.title ?? ""}
    //           </h4>
    //           <p className="text-sm text-gray-600">
    //             {addon?.description ?? ""}
    //           </p>
    //         </div>
    //         <div className="text-right">
    //           <p className="font-medium text-gray-800">₹{addon?.price ?? 0}</p>
    //           <p className="text-sm text-gray-600">
    //             Qty: {addon?.count?.count ?? 0}
    //           </p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </motion.div>
    <motion.div
      className={classNames("rounded-lg shadow-lg p-6 mb-4 border-2", {
        "border-blue-500": isActive,
        "border-transparent": !isActive,
        "bg-white": !darkMode,
        "bg-[#1a1f25]": darkMode,
      })}
      whileHover={{ scale: 1.009 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Order Header */}
      <div className="flex justify-between w-full items-center mb-4">
        <div className="flex items-center w-full gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() =>
              handleSelectedOrder({
                order_id: order?.order_id ?? "",
                user_id: order?.user?.[0]?._id ?? "",
              })
            }
            className="mr-2 h-5 w-5 text-blue-600"
          />
          <h2
            onClick={() => handleDetailView({ index })}
            className={classNames(
              "text-xl font-bold w-full cursor-pointer",
              darkMode
                ? "text-white hover:text-blue-400"
                : "text-gray-800 hover:text-blue-700"
            )}
          >
            {order?.order_id ?? ""}
          </h2>
          <span
            className={`text-lg font-medium ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            ₹{totalPrice ?? 0}
          </span>
        </div>
      </div>

      {/* Customer Details */}
      <div className="mb-4">
        <h3
          className={`font-semibold ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {deliveryAddress?.recipientName ?? ""}
        </h3>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {deliveryAddress?.recipientAddress ?? ""}
        </p>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {deliveryAddress?.recipientMobnumber ?? ""}
        </p>
      </div>

      {/* Delivery Details */}
      <div className="mb-4">
        {shipping && (
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            {shipping.method} | {formatDate(shipping.delivary_date)} |{" "}
            {shipping.time}
          </p>
        )}
      </div>

      {/* Add-On Items */}
      <div
        className={`divide-y ${
          darkMode ? "divide-gray-700" : "divide-gray-200"
        }`}
      >
        <div className="flex items-center mb-1.5 pt-1.5">
          <img
            src={
              productDetails?.imageLink?.[0] ??
              "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg"
            }
            onError={(e) => {
              e.target.src = 'https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg';
            }}
            alt={productDetails?.title ?? ""}
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          <div className="flex-grow">
            <h4
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {productDetails?.title ?? ""}
            </h4>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {productDetails?.description ?? ""}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              ₹{productDetails?.prices ?? 0}
            </p>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Qty: 1
            </p>
          </div>
        </div>
        {addOn?.map((addon, index) => (
          <div key={index} className="flex items-center mb-1.5 pt-1.5">
            <img
              src={
                addon?.image?.[0] ??
                "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg"
              }
              onError={(e) => {
                e.target.src = 'https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg';
              }}
              alt={addon?.title ?? ""}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div className="flex-grow">
              <h4
                className={`font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {addon?.title ?? ""}
              </h4>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {addon?.description ?? ""}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                ₹{addon?.price ?? 0}
              </p>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Qty: {addon?.count?.count ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default memo(OrderCard);
