import React, { useState } from "react";
import { motion } from "framer-motion";

const OrderCard = ({ handleSelectedOrder, order, isActive }) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg p-6 mb-4 border-2 ${
        isActive ? " border-blue-500" : "border-transparent"
      }`}
      whileHover={{ scale: 1.009 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between w-full items-center mb-4">
        <div className="flex items-center w-full gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() =>
              handleSelectedOrder({ orderNumber: order?.orderNumber ?? "" })
            }
            className="mr-2 h-5 w-5 text-blue-600"
          />
          <h2  className="text-xl font-bold text-gray-800 w-full hover:text-blue-700 cursor-pointer">
            {order.orderNumber}
          </h2>
          <span className="text-lg font-medium text-gray-600 ">
            ₹{order.total}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">{order.customerName}</h3>
        <p className="text-sm text-gray-600">{order.address}</p>
        <p className="text-sm text-gray-600">{order.phone}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-blue-600">
          {order.deliveryType} | {order.date} | {order.time}
        </p>
      </div>
      <div className="divide-y">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center mb-1.5 pt-1.5">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div className="flex-grow">
              <h4 className="font-medium text-gray-800">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">₹{item.price}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default OrderCard;
