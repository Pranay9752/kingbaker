import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddAddressMutation } from "../../redux/apiSlices/ecom/checkoutApiSlice";
import { twMerge } from "tailwind-merge";
import {
  addDeliveryAddress,
  deleteAddon,
  deleteOrder,
  updateAddonQuantity,
  updateShipping,
} from "../../redux/slices/ecom/orderSlice";
import { format, isValid } from "date-fns";
import ModalWrapper from "../../molecules/wrappers/ModalWrapper";
import DeliveryDatePicker from "./modals/DeliveryDatePicker";
import DeliveryTimeSlotSelector from "./modals/DeliveryTimeSlotSelector";
import { AddressForm } from "./AddAddress";
import getCookie from "../../atom/utils/getCookies";
import AddressCard from "../../molecules/cards/AddressCard";

const OrderDeliveryDetails = ({
  index,
  mainItem,
  addons,
  deliveryDetails,
  occasion,
  handleOccation,
  className,
  addresses = [],
  isCart = false,
  dense = false,
  viewOnly = false,
}) => {
  const [reicipientAddress, setReicipientAddress] = useState([]);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState({
    title: "Mr",
    recipientName: "",
    recipientMobile: "",
    recipientAltMobile: "",
    recipientEmail: "",
    recipientAddress: "",
    countryCode: "+91",
    addressType: "home",
  });

  const [DateModal, setDateModal] = useState(false);
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addAddress, { isLoading, isError }] = useAddAddressMutation();

  const handleQuantityChange = (id, change) => {
    console.log('id, change: ', id, change);
    dispatch(updateAddonQuantity({ id, change, orderIndex: index }));
  };

  const handleDelete = (id) => {
    dispatch(deleteAddon({ id, orderIndex: index }));
  };

  const handleDeleteOrder = () => {
    dispatch(deleteOrder({ id: mainItem?.id }));
  };

  const onAddAddress = (data) => {
    const newAddress = {
      user_id: getCookie("user_id"),
      _id: data?._id ?? null,
      delivary_address: {
        pincode: getCookie("pincode"),
        city: "Mumbai",
        country: "India",
        landmark: data?.landmark ?? "",
        area: "Mumbai",
        addressType: data?.addressType ?? "home",
        recipientName: data?.recipientName ?? "",
        recipientMobnumber: data?.recipientMobile ?? "",
        alternateMobileNo: data?.recipientAltMobile ?? "",
        alternateEmail: data?.recipientEmail ?? "",
        recipientAddress: data?.recipientAddress ?? "",
        title: data?.title ?? "",
        countryCode: data?.countryCode ?? "",
      },
    };

    try {
      const response = addAddress(newAddress);
      setReicipientAddress((prev) => {
        const newArr = [...prev];
        const addressIndex = newArr.findIndex(
          (item) => item?._id === data?._id
        );
        if (addressIndex == -1) {
          return [...newArr, data];
        } else {
          newArr[addressIndex] = data;
          return newArr;
        }
      });
      setOpenAddAddress(false);
      // navigate("/checkout/details");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectAddress = (id) => {
    dispatch(updateShipping({ index, name: "delivery_address", value: id }));
    // dispatch(addDeliveryAddress({ id, index }));
  };

  const handleSelectDate = (day) => {
    setDateModal((prev) => false);
    setDeliveryModal((prev) => true);
    setDeliveryDate(day);
    dispatch(updateShipping({ index, name: "date", value: day }));
  };

  const handleSelectSlot = ({ delivery, slot }) => {
    setDeliveryModal((prev) => false);
    dispatch(updateShipping({ index, name: "timeSlot", value: slot?.time }));
    dispatch(
      updateShipping({ index, name: "fee", value: delivery?.price ?? 0 })
    );
    dispatch(
      updateShipping({ index, name: "method", value: delivery?.title ?? "" })
    );
  };

  useEffect(() => {
    if (addresses?.length > 0 && reicipientAddress?.length === 0) {
      setReicipientAddress(addresses);
    }
  }, [addresses]);

  return (
    <>
      <div
        className={twMerge(
          ` text-gray-800 py-4 text-left border shadow-xl`,
          className
        )}
      >
        <div
          className={`bg-white text-black rounded-lg  ${dense ? "" : "p-4"}`}
        >
          <div className={`flex items-start ${dense ? "mb-2" : "mb-4"}`}>
            <img
              src={mainItem.image}
              alt={mainItem.name}
              onError={(e) => {
                e.target.src =
                  "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";
              }}
              className="w-[75px] h-[75px] object-cover rounded-md mr-4"
            />
            <div>
              <h2 className="font-medium">{mainItem.name}</h2>
              <p>₹{mainItem.price} x 1</p>
            </div>
            <button
              onClick={handleDeleteOrder}
              className={
                twMerge("ml-auto text-gray-600 border rounded border-gray-600 hover:bg-gray-300 text-sm px-1 py-0.5",
                viewOnly && "hidden")
              }
            >
              DELETE
            </button>
          </div>

          <h3 className={`${dense ? "" : "mb-2"}`}>Addons</h3>
          {addons.map((addon) => (
            <div
              key={addon.id}
              className={`flex items-center mb-2 border-b ${
                dense ? "pb-2" : "pb-3"
              }`}
            >
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
                  <div className={twMerge("flex rounded-md overflow-hidden divide-x border",viewOnly && "hidden")}>
                    <button
                      className={twMerge("bg-[#555555]/20 p-1")}
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
              <div className={twMerge("ml-auto flex items-center",viewOnly && "hidden")}>
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
        <div
          className={`w-full px-4 flex flex-col gap-2 ${isCart && "hidden"}`}
        >
          {openAddAddress ? (
            <div className="border rounded-md bg-yellow-300/20">
              <AddressForm
                defaultValues={defaultAddress}
                onSubmit={onAddAddress}
              />
            </div>
          ) : (
            <button
              onClick={() => {
                window.innerWidth < 768
                  ? navigate("/checkout/add-address")
                  : setOpenAddAddress(true);
              }}
              className="w-full  bg-orange-500 md:bg-white md:text-blue-500 flex md:font-semibold justify-center items-center md:border md:border-dotted md:border-blue-500 text-white py-2 rounded-lg mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
              Add Address
            </button>
          )}

          {reicipientAddress?.map((address, index) => (
            <AddressCard
              key={address?._id}
              address={address}
              onSelect={handleSelectAddress} // Handle the radio selection
              onEdit={() => {
                setDefaultAddress(address);
                setOpenAddAddress(true);
              }} // Handle edit
            />
          ))}
        </div>

        <div
          className={`bg-white text-black rounded-lg  ${
            dense ? "px-4 m-1  border py-2" : "p-4 mb-4"
          }`}
        >
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
                <span className="font-medium">
                  {isValid(new Date(deliveryDetails.date))
                    ? format(new Date(deliveryDetails.date), "dd MMM")
                    : deliveryDetails.date}
                </span>
              </p>
              <p className="font-medium">
                {deliveryDetails?.method ?? "Standard Delivery"}
              </p>
              <p className="font-medium">
                {deliveryDetails.timeSlot}{" "}
                <span className="text-orange-500 font-light ml-2">
                  ₹ {deliveryDetails?.fee ?? 0}
                </span>
              </p>
            </div>
            <button
              type={"button"}
              onClick={() => setDateModal(true)}
              className="ml-auto text-gray-600 border rounded border-gray-600 hover:bg-gray-300 text-sm px-1 py-0.5"
            >
              Change
            </button>
          </div>
        </div>

        <div className={`space-y-2 px-4 md:hidden ${isCart && "hidden"}`}>
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
              {occasion?.occasion?.label ?? "Select Occasion"}
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

          <div
            className={`w-full text-lg border-gray-500 bg-slate-100 text-black py-2 rounded-lg flex justify-start items-center px-4 ${
              isCart && "hidden"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-orange-600"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>

            <input
              placeholder="Free Message Card"
              className="outline-none bg-transparent border-none ml-2"
              maxLength={25}
            />
          </div>
        </div>
      </div>
      <ModalWrapper
        isOpen={DateModal}
        onClose={(e) => {}}
        maxHeight={"101vh"}
        className={`p-3 text-gray-800`}
      >
        <DeliveryDatePicker handleSelectDate={handleSelectDate} />
      </ModalWrapper>
      <ModalWrapper
        className={`p-3 text-gray-800`}
        isOpen={deliveryModal}
        onClose={(e) => {}}
        maxHeight={"101vh"}
      >
        <DeliveryTimeSlotSelector
          deliverydate={deliveryDate}
          handleSelectSlot={handleSelectSlot}
        />
      </ModalWrapper>
    </>
  );
};

export default OrderDeliveryDetails;
