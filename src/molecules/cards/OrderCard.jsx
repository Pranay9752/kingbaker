import React, { memo } from "react";
import { motion } from "framer-motion";
import formatDate from "../../atom/utils/formatDate";
import classNames from "classnames"; // Optional utility for conditional class names

const OrderCard = ({
  handleSelectedOrder,
  order,
  isActive,
  handleDetailView,
  index,
}) => {
  const {
    order_id,
    total,
    customerName,
    address,
    phone,
    delivary_details: { shipping, addOn } = {},
  } = order || {};

  return (
    <motion.div
      className={classNames("bg-white rounded-lg shadow-lg p-6 mb-4 border-2", {
        "border-blue-500": isActive,
        "border-transparent": !isActive,
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
            onChange={() => handleSelectedOrder({ order_id: order_id ?? "" })}
            className="mr-2 h-5 w-5 text-blue-600"
          />
          <h2
            onClick={() => handleDetailView({ index })}
            className="text-xl font-bold text-gray-800 w-full hover:text-blue-700 cursor-pointer"
          >
            {order_id}
          </h2>
          <span className="text-lg font-medium text-gray-600">₹{total}</span>
        </div>
      </div>

      {/* Customer Details */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">{customerName}</h3>
        <p className="text-sm text-gray-600">{address}</p>
        <p className="text-sm text-gray-600">{phone}</p>
      </div>

      {/* Delivery Details */}
      <div className="mb-4">
        {shipping && (
          <p className="text-sm font-medium text-blue-600">
            {shipping.method} | {formatDate(shipping.delivary_date)} |{" "}
            {shipping.time}
          </p>
        )}
      </div>

      {/* Add-On Items */}
      <div className="divide-y">
        {addOn?.map(({ image, name, description, price, count }, index) => (
          <div key={index} className="flex items-center mb-1.5 pt-1.5">
            <img
              src={image}
              alt={name}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div className="flex-grow">
              <h4 className="font-medium text-gray-800">{name}</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">₹{price}</p>
              <p className="text-sm text-gray-600">Qty: {count}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default memo(OrderCard);
