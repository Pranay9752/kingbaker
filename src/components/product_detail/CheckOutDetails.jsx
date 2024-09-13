import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import React, { useState,  useEffect } from "react";
// import {
//   useGetAddressQuery,
//   useGetOccationQuery,
// } from "../../redux/apiSlices/ecom/checkouApiSlice";
import Basicheader from "./header/Basicheader";
import {
  addOccasion,
  deleteAddon,
  deleteOrder,
  updateAddonQuantity,
} from "../../redux/slices/ecom/orderSlice";

import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { motion } from "framer-motion"; // For the animation
import { useGetAddressQuery, useGetOccationQuery } from "../../redux/apiSlices/ecom/checkoutApiSlice";

const options1 = [
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
];

const options2 = [
  {
    value: "message1",
    label: "On This Special Day, I Hope That You Get All That...",
  },
  {
    value: "message2",
    label: "Wishing You Lots of Love and Joy on Your Special Day...",
  },
];

const AddOccation = ({ occationData, occationIndex, onOccationSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: occationData === null ? { to: "Dear," } : occationData,
  });
  const [showUsername, setShowUsername] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [occationList, setOccationList] = useState([]);
  const [messageList, setMessageList] = useState([]);

  const dispatch = useDispatch();
  const { data } = useGetOccationQuery();
  const onSubmit = (data) => {
    dispatch(addOccasion({ occationIndex, data }));
    onOccationSubmit();
  };

  const handleToggle = () => {
    setShowUsername(!showUsername);
    if (!showUsername) {
      setValue("username", "");
    }
  };

  useEffect(() => {
    if (watch("messageSelect")?.label) {
      setValue("message", watch("messageSelect")?.label ?? "");
    }
  }, [watch("messageSelect")]);

  useEffect(() => {
    if (data) {
      setOccationList(() =>
        data?.data.map((item) => ({
          label: item?.["name"],
          value: item?.["occasion_id"],
        }))
      );
    }
  }, [data]);

  useEffect(() => {
    const occasion = watch("occasion");
    setValue("messageSelect", null);
    if (occasion) {
      const ocationData = data?.data?.find(
        (item) => item?.occasion_id === occasion?.value
      );
      const messages = ocationData?.messages?.map((item, index) => ({
        label: item,
        value: index,
      }));
      setMessageList(messages);
    }
  }, [watch("occasion")]);
  return (
    <div className="p-6 mt-12 max-w-md mx-auto bg-white shadow-md rounded-lg text-left">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* React Select for first field */}
        <div className="mb-4">
          <label className="block mb-1">Select Occasion</label>
          <Controller
            name="occasion"
            control={control}
            rules={{ required: "Occasion is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={occationList}
                placeholder="Select Occasion"
              />
            )}
          />
          {errors.occasion && (
            <p className="text-red-500 text-sm">{errors.occasion.message}</p> 
          )}
        </div>

        {/* React Select for second field */}
        <div className="mb-4">
          <label className="block mb-1">Select Message</label>
          <Controller
            name="messageSelect"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={messageList}
                placeholder="Select Message"
              />
            )}
          />
          {errors.messageSelect && (
            <p className="text-red-500 text-sm">
              {errors.messageSelect.message}
            </p>
          )}
        </div>

        {/* Textarea for message */}
        <div className="mb-4">
          <label className="block mb-1">Message</label>
          <input
            className="w-full border border-gray-300 rounded-t p-2"
            {...register("to")}
            placeholder=""
          />
          <textarea
            className={`w-full border border-gray-300 rounded-b  p-2`}
            {...register("message")}
            placeholder="Write your message here..."
          ></textarea>
          {showUsername && (
            <input
              className="w-full border border-gray-300 rounded-b p-2"
              {...register("username")}
              placeholder="Enter your name"
            />
          )}
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Checkbox for toggle */}
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={handleToggle}
              className="h-4 w-4 border border-gray-300 rounded"
            />
            <span>Don't show my name on the card</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-2 mb-2">
          <button
            onClick={onOccationSubmit}
            type="button"
            className="bg-gray-400 text-white w-full py-2 px-4 rounded-lg"
          >
            Discard
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white w-full py-2 px-4 rounded-lg"
          >
            Preview
          </button>
        </div>
        <button
          type="submit"
          className="bg-orange-600 text-white w-full py-2 px-4 rounded-lg"
        >
          CONTINUE
        </button>
      </form>
      {/* Animation (book opening on preview) */}
      {isPreview && (
        <motion.div
          className="mt-6 p-6 border rounded-lg shadow-lg bg-orange-500 text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <p>{watch("message")}</p>
          {showUsername && <p>- {watch("username")}</p>}
        </motion.div>
      )}
    </div>
  );
};

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

const OrderDeliveryDetails = ({
  index,
  mainItem,
  addons,
  deliveryDetails,
  occasion,
  handleOccation,
}) => {
const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleQuantityChange = (id, change) => {
    // dispatch({ type: "UPDATE_ADDON_QUANTITY", payload: { id, change } });
    dispatch(updateAddonQuantity({ id, change, orderIndex: index }));
  };

  const handleDelete = (id) => {
    // dispatch({ type: "DELETE_ADDON", payload: id });
    dispatch(deleteAddon({ id, orderIndex: index }));
  };

  const handleDeleteOrder = () => {
    dispatch(deleteOrder({ id: mainItem?.id }));
  };

  return (
    <div className=" text-gray-800 py-4 text-left border shadow-xl">
      <div className="bg-white text-black rounded-lg p-4 ">
        <div className="flex items-start mb-4">
          <img
            src={mainItem.image}
            alt={mainItem.name}
            className="w-[75px] h-[75px] object-cover rounded-md mr-4"
          />
          <div>
            <h2 className="font-medium">{mainItem.name}</h2>
            <p>₹{mainItem.price} x 1</p>
          </div>
          <button
            onClick={handleDeleteOrder}
            className="ml-auto text-gray-600 border rounded border-gray-600 hover:bg-gray-300 text-sm px-1 py-0.5"
          >
            DELETE
          </button>
        </div>

        <h3 className="mb-2">Addons</h3>
        {addons.map((addon) => (
          <div key={addon.id} className="flex items-center mb-2 border-b pb-3">
            <img
              src={addon.image}
              alt={addon.name}
              className="w-[75px] h-[75px] object-cover rounded-md mr-2"
            />
            <div>
              <p className="text-[14px]">{addon.name}</p>
              <div className="mt-6 flex items-center gap-3">
                <p className="text-[13px]">
                  ₹{addon.price} x {addon.quantity}
                </p>
                <div className="flex rounded-md overflow-hidden divide-x border">
                  <button
                    className="bg-[#555555]/20 p-1"
                    onClick={() => handleQuantityChange(addon.id, -1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <p className="text-[13px] w-8 text-center">
                    {addon.quantity}
                  </p>
                  <button
                    className="bg-[#555555]/20 p-1"
                    onClick={() => handleQuantityChange(addon.id, 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="ml-auto flex items-center">
              {/* <button onClick={() => handleDelete(addon.id)} className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button> */}
              <button
                onClick={() => handleDelete(addon.id)}
                className="ml-auto text-gray-600 border rounded border-gray-600 hover:bg-gray-300 text-sm px-1 py-0.5"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full px-4">
        <button onClick={() => {
          navigate("/checkout/add-address")
        }} className="w-full  bg-orange-500  text-white py-2 rounded-lg mb-4">
          Add Address
        </button>
      </div>

      <div className="bg-white text-black rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4 text-orange-500"
              >
                <path d="M10 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H10ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V12ZM11.25 10.005c0-.417.338-.755.755-.755h2a.755.755 0 1 1 0 1.51h-2a.755.755 0 0 1-.755-.755ZM6.005 11.25a.755.755 0 1 0 0 1.51h4a.755.755 0 1 0 0-1.51h-4Z" />
                <path
                  fillRule="evenodd"
                  d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Delivery on{" "}
              <span className="font-medium">{deliveryDetails.date}</span>
            </p>
            <p className="font-medium">Standard Delivery</p>
            <p className="font-medium">
              {deliveryDetails.timeSlot}{" "}
              <span className="text-orange-500 font-light ml-2">₹ 99</span>
            </p>
          </div>
          <button className="ml-auto text-gray-600 border rounded border-gray-600 hover:bg-gray-300 text-sm px-1 py-0.5">
            Change
          </button>
        </div>
      </div>

      <div className="space-y-2 px-4">
        <button
          onClick={() => handleOccation({ index: index })}
          className="w-full text-lg border-gray-500 bg-slate-100 text-black py-2 rounded-lg flex justify-start items-center px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-orange-600"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="font-semibold ml-2">
            {occasion?.occasion?.label  ?? "Select Occasion"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 ml-auto"
          >
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* <button className="w-full text-lg border-gray-500 bg-slate-100 text-black py-2 rounded-lg flex justify-start items-center px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-orange-600"
          >
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
          </svg>

          <span className="font-semibold ml-2">Free Message Card</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 ml-auto"
          >
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button> */}
        <div className="w-full text-lg border-gray-500 bg-slate-100 text-black py-2 rounded-lg flex justify-start items-center px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-orange-600"
          >
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
          </svg>

          {/* <span className="font-semibold ml-2">Free Message Card</span> */}
          <input
            placeholder="Free Message Card"
            className="outline-none bg-transparent border-none ml-2"
            maxLength={25}
          />
        </div>
      </div>
    </div>
  );
};

function CheckOutDetails() {
  const [isOpen, setIsOpen] = useState(0);
  const [occationIndex, setOccationIndex] = useState(0);

  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetAddressQuery();

  const orderData = useSelector((state) => state.order);

  const handleOccation = ({ index, data }) => {
    setOccationIndex(index);
    setIsOpen(1);
  };

  useEffect(() => {
    if (data !== null && data?.delivary_address?.length === 0) {
      navigate("/checkout/add-address");
    }
  }, [data]);

  return (
    <>
      <Basicheader num={2} title={"Order & Delivery Details"} />
      {isOpen === 0 ? (
        <>
          <div className="mt-14 p-2">
            {orderData?.map((order, index) => {
              return (
                <OrderDeliveryDetails
                  key={order?.mainItem?.id}
                  index={index}
                  addons={order?.addons ?? []}
                  deliveryDetails={order?.deliveryDetails ?? {}}
                  mainItem={order?.mainItem ?? {}}
                  occasion={order?.occasion ?? null}
                  handleOccation={handleOccation}
                />
              );
            })}
          </div>
        </>
      ) : isOpen == 1 ? (
        <AddOccation
          onOccationSubmit={() => setIsOpen(0)}
          occationData={orderData?.[occationIndex]?.occasion ?? {}}
          occationIndex={occationIndex}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default CheckOutDetails;
