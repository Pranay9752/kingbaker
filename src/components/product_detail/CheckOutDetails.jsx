import { useDispatch, useSelector } from "react-redux";
import { useGetProfileQuery } from "../../redux/apiSlices/account.jsx/accountSlice";
import getCookie from "../../atom/utils/getCookies";
import { addProfile } from "../../redux/slices/ecom/profileSlice";
import { useNavigate } from "react-router-dom";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useGetAddressQuery } from "../../redux/apiSlices/ecom/checkouApiSlice";
import Basicheader from "./header/Basicheader";

const Icon = ({ name }) => {
  const icons = {
    gift: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
          clipRule="evenodd"
        />
        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    envelope: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

const CartItem = ({ item, onUpdateQuantity, onDelete }) => (
  <div className="flex justify-between items-start mb-4">
    <div className="flex">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded mr-2"
      />
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">
          ₹{item.price} x {item.quantity} • {item.option}
        </p>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <button
        onClick={() => onDelete(item.id)}
        className="text-red-500 text-sm mb-2"
      >
        DELETE
      </button>
      <div className="flex items-center">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>
    </div>
  </div>
);

const CartSummary = ({
  items,
  onUpdateQuantity,
  onDelete,
  onAddAddress,
  onChangeDelivery,
  onSelectOccasion,
  onAddMessageCard,
}) => {
  const [deliveryDate, setDeliveryDate] = useState("17 Sep");
  const [deliveryType, setDeliveryType] = useState("Courier");
  const [deliveryTime, setDeliveryTime] = useState("9:00 AM - 9:00 PM");
  const [deliveryFee, setDeliveryFee] = useState(19);

  const totalAmount = useMemo(
    () =>
      items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0,
    [items]
  );

  const handleUpdateQuantity = useCallback(
    (id, newQuantity) => {
      if (newQuantity > 0) {
        onUpdateQuantity(id, newQuantity);
      }
    },
    [onUpdateQuantity]
  );

  return (
    <div className="max-w-md mx-auto bg-white p-4 shadow-md rounded-lg">
      {items?.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={handleUpdateQuantity}
          onDelete={onDelete}
        />
      ))}

      <button
        onClick={onAddAddress}
        className="w-full bg-orange-400 text-white py-2 rounded-md mb-4"
      >
        Add Address
      </button>

      <div className="flex justify-between items-center mb-2 text-sm">
        <div>
          <Icon name="gift" />
          <span>
            Delivery on {deliveryDate}, {deliveryType}
          </span>
          <p className="ml-5">{deliveryTime} Hrs</p>
        </div>
        <div className="flex items-center">
          <span className="mr-2">₹{deliveryFee}</span>
          <button onClick={onChangeDelivery} className="text-blue-500">
            CHANGE
          </button>
        </div>
      </div>

      <button
        onClick={onSelectOccasion}
        className="w-full bg-gray-100 text-gray-800 py-2 rounded-md mb-2 flex justify-between items-center px-4"
      >
        <div className="flex items-center">
          <Icon name="star" />
          <span className="ml-2">Select Occasion</span>
        </div>
        <span>&gt;</span>
      </button>

      <button
        onClick={onAddMessageCard}
        className="w-full bg-gray-100 text-gray-800 py-2 rounded-md flex justify-between items-center px-4"
      >
        <div className="flex items-center">
          <Icon name="envelope" />
          <span className="ml-2">Free Message Card</span>
        </div>
        <span>&gt;</span>
      </button>

      <div className="mt-4 text-right">
        <p className="font-semibold">Total: ₹{totalAmount + deliveryFee}</p>
      </div>
    </div>
  );
};

function CheckOutDetails() {
  // const deliveryAddress = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetAddressQuery();
  console.log("data: ", data);
  useEffect(() => {
    if (data !== null && data?.delivary_address?.length === 0) {
      navigate("/checkout/add-address");
    }
  }, [data]);

  // Dummy data
  const dummyItems = [
    {
      id: 1,
      name: "Red Roses Bouquet",
      price: 599,
      quantity: 2,
      option: "With Vase",
      image: "https://via.placeholder.com/64x64?text=Rose",
    },
    {
      id: 2,
      name: "Chocolate Cake",
      price: 799,
      quantity: 1,
      option: "Dark Chocolate",
      image: "https://via.placeholder.com/64x64?text=Cake",
    },
  ];

  // Dummy functions
  const handleUpdateQuantity = (id, newQuantity) => {
    console.log(`Update item ${id} to quantity ${newQuantity}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete item ${id}`);
  };

  const handleAddAddress = () => {
    console.log("Add Address");
  };

  const handleChangeDelivery = () => {
    console.log("Change Delivery");
  };

  const handleSelectOccasion = () => {
    console.log("Select Occasion");
  };

  const handleAddMessageCard = () => {
    console.log("Add Message Card");
  };

  return (
    <>
      <Basicheader num={2} title={"Order Details"} />

      <div>
        {/* <CartSummary
          items={dummyItems}
          onUpdateQuantity={handleUpdateQuantity}
          onDelete={handleDelete}
          onAddAddress={handleAddAddress}
          onChangeDelivery={handleChangeDelivery}
          onSelectOccasion={handleSelectOccasion}
          onAddMessageCard={handleAddMessageCard}
        /> */}
      </div>
    </>
  );
}

export default CheckOutDetails;
