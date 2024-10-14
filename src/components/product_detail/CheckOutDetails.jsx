import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
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
import {
  useAddAddressMutation,
  useCreateOrderMutation,
  useGetAddressQuery,
  useGetCartItemQuery,
  useGetOccationQuery,
} from "../../redux/apiSlices/ecom/checkoutApiSlice";
import CheckoutCard from "../../molecules/cards/CheckoutCard";
import SecurePaymentCard from "../../molecules/cards/SecurePaymentCard";
import { twMerge } from "tailwind-merge";
import { AddressForm } from "./AddAddress";
import getCookie from "../../atom/utils/getCookies";
import OrderDeliveryDetails from "./OrderDeliveryDetails";
import { toast } from "sonner";

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

const PriceDetails = ({ className }) => {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const data = useSelector((state) => state.order);

  const totalPrice = useMemo(() => {
    const totalAddons = data?.reduce((prev, curr) => {
      const itemPrice = curr?.mainItem?.price ?? 0;
      let addonPrice = 0;
      curr?.addons?.forEach((element) => {
        addonPrice = addonPrice + element.price;
      });

      return prev + itemPrice + addonPrice;
    }, 0);
    return totalAddons;
  }, [data]);
  const totalAddonPrice = useMemo(() => {
    const totalAddons = data?.reduce((prev, curr) => {
      let addonPrice = 0;
      curr?.addons?.forEach((element) => {
        addonPrice = addonPrice + element.price;
      });

      return prev + addonPrice;
    }, 0);
    return totalAddons;
  }, [data]);
  const totalitemPrice = useMemo(() => {
    const totalAddons = data?.reduce((prev, curr) => {
      const itemPrice = curr?.mainItem?.price ?? 0;
      return prev + itemPrice;
    }, 0);
    return totalAddons;
  }, [data]);

  const handleProceedToPay = async () => {
    try {
      data.forEach(async (item) => {
        const { mainItem, addons, deliveryDetails } = item;
        console.log("mainItem: ", mainItem);
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
            product_id: mainItem?.productDetails?.[0]?._id,
            delivery_address: deliveryDetails?.delivery_address,
            message_on_product:
              mainItem?.delivery_details?.message_on_product ?? "",
            images_on_product:
              mainItem?.delivery_details?.image_on_product ?? "",
            is_message: mainItem?.delivery_details?.message_on_product
              ? "true"
              : "false",
            is_image: mainItem?.delivery_details?.image_on_product
              ? "true"
              : "false",
            is_veg: mainItem?.delivery_details?.is_veg ?? true,
            special_request: "",
            delivary_date: deliveryDetails?.date,
            shipping: {
              method: deliveryDetails?.method,
              time: deliveryDetails?.timeSlot,
              shipping_amount: deliveryDetails?.fee,
              delivary_date: deliveryDetails?.date,
            },
            addOn: Array.isArray(addons)
              ? addons?.map((item) => ({
                  addOn_id: item?.id,
                  count: item?.quantity,
                }))
              : [],
          },
        };

        // await createOrder(newOrder);
      });
      // await createOrder(newOrder);
      toast.success("Order created successfully");
      navigate("/checkout/payment");
    } catch (error) {}
  };

  return (
    <div
      className={twMerge(
        `bg-white p-4 rounded-lg shadow-md max-w-sm border`,
        className
      )}
    >
      <h2 className="text-lg font-semibold mb-4">PRICE DETAILS</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total Product Price</span>
          <span>₹ {totalitemPrice}</span>
        </div>
        {/* <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹ 118</span>
        </div> */}
        <div className="flex justify-between">
          <span>Total Addon Charge</span>
          <span>₹ {totalAddonPrice}</span>
        </div>
        {/* <div className="flex justify-between text-green-600">
          <span>
            Donate ₹10 to CIRY{" "}
            <span className="text-blue-500 cursor-pointer">ⓘ</span>
          </span>
          <span>₹10</span>
        </div> */}
      </div>
      <div className="border-t border-gray-200 my-4"></div>
      <div className="flex justify-between font-semibold">
        <span>TOTAL</span>
        <span>₹ {totalPrice ?? 0}</span>
      </div>

      <p className="text-xs text-gray-500 mb-4">
        By continuing you agree to our T&C/Disclaimer
      </p>
      <button
        type={"button"}
        onClick={handleProceedToPay}
        className="bg-orange-500 text-white w-full py-2 rounded"
      >
        PROCEED TO PAY
      </button>
    </div>
  );
};

function CheckOutDetails() {
  const [isOpen, setIsOpen] = useState(0);
  const [occationIndex, setOccationIndex] = useState(0);

  const navigate = useNavigate();

  const { data, isError, isLoading } = useGetAddressQuery();
  const { data: cartOrder } = useGetCartItemQuery();

  const orderData = useSelector((state) => state.order);

  const handleOccation = ({ index, data }) => {
    setOccationIndex(index);
    setIsOpen(1);
  };

  useEffect(() => {
    console.log(isError);
    if (
      data !== null &&
      data?.delivary_address?.length === 0 &&
      window.innerWidth < 768
    ) {
      navigate("/checkout/add-address");
    }
  }, [data]);

  useEffect(() => {
    if (window.innerWidth > 768) document.body.classList.add("bg-[#f2f2f2]");
    return () => {
      if (window.innerWidth > 768)
        document.body.classList.remove("bg-[#f2f2f2]");
    };
  }, []);

  return (
    <>
      <Basicheader num={2} title={"Order & Delivery Details"} />
      <div className="md:hidden">
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
                    addresses={data?.delivery_address ?? []}
                    handleOccation={handleOccation}
                  />
                );
              })}
            </div>
            <PriceDetails className={`w-full max-w-full`} />
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
      </div>
      <div className="hidden md:flex justify-center items-start gap-4 py-20 mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-4 overflow-y-auto h-[90vh] hide-scrollbar">
          {/* Card 1 */}
          <CheckoutCard stepNumber={2} title="LOGIN / REGISTER" done={true} />

          {/* Card 2 */}
          <CheckoutCard stepNumber={2} title="ORDER & DELIVERY DETAILS">
            {orderData?.map((order, index) => {
              return (
                <>
                  <OrderDeliveryDetails
                    className={"border-none shadow-none "}
                    key={order?.mainItem?.id}
                    index={index}
                    addons={order?.addons ?? []}
                    deliveryDetails={order?.deliveryDetails ?? {}}
                    addresses={data?.delivery_address ?? []}
                    mainItem={order?.mainItem ?? {}}
                    occasion={order?.occasion ?? null}
                    handleOccation={handleOccation}
                  />
                  <div className="border" />
                </>
              );
            })}
          </CheckoutCard>

          <CheckoutCard stepNumber={3} title="PAYMENT OPTIONS" />
        </div>
        <div className="sticky">
          <PriceDetails />
          <SecurePaymentCard />
        </div>
      </div>
    </>
  );
}

export default CheckOutDetails;
