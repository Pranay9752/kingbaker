import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addDays,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import BottomSheet from "../atom/popovers/BottomSheet";
import ModalWrapper from "./wrappers/ModalWrapper";
import { useFormContext } from "react-hook-form";
import DeliveryDatePicker from "../components/product_detail/modals/DeliveryDatePicker";
import DeliveryTimeSlotSelector from "../components/product_detail/modals/DeliveryTimeSlotSelector";

const DeliveryDateSelector = () => {
  const { setValue } = useFormContext();

  const [deliveryData, setDeliveryData] = useState(null);
  const [DateModal, setDateModal] = useState(false);
  const [deliveryModal, setDeliveryModal] = useState(false);
  const handleToggleDateModal = (e, value = null) => {
    setDateModal((prev) => (value ? value : !prev));
  };

  const handleSelectDate = (day) => {
    setDeliveryData({ date: day });
    setValue("day", day);
    setDateModal((prev) => false);
    setDeliveryModal((prev) => true);
  };

  const handleSelectSlot = ({ delivery, slot }) => {
    setValue("delivery", delivery);
    setValue("slot", slot);
    setDeliveryData((prev) => ({ ...prev, ...delivery, selectedSlot: slot }));
    setDeliveryModal((prev) => false);
  };

  return (
    <>
      {deliveryData ? (
        <div
          onClick={handleToggleDateModal}
          className=" bg-white border-2 border-gray-400 px-3 py-1 flex gap-2 rounded w-full"
        >
          <div className="flex items-baseline">
            <span className="text-5xl [40px] text-[#222222] mr-2">
              {new Date(deliveryData.date).getDate()}
            </span>
          </div>
          <div className="flex flex-col justify-center item-center text-left pr-4">
            <span className="text-gray-600 uppercase  mr-2">
              {new Date(deliveryData.date).toLocaleString("default", {
                month: "short",
              })}
            </span>
            <span className="text-gray-600 uppercase ">
              {new Date(deliveryData.date).toLocaleString("default", {
                weekday: "short",
              })}
            </span>
          </div>

          <div className=" text -sm text-gray-700">
            {deliveryData?.title ?? ""}:{" "}
            <span className="font-bold">₹ {deliveryData?.price ?? ""}</span>
            <br />
            {deliveryData?.selectedSlot?.time ?? ""}
          </div>
        </div>
      ) : (
        <div
          onClick={handleToggleDateModal}
          className="flex items-center justify-between bg-white border-2 border-orange-400 animate-glow px-3 py-2 rounded w-full"
        >
          <div className="flex items-center gap-2 text-xl truncate w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
              <path
                fillRule="evenodd"
                d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate w-full">Select Delivery Date & Time</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-auto size-6"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}

      <ModalWrapper
        isOpen={DateModal}
        onClose={(e) => {}}
        maxHeight={"101vh"}
        className={`p-3`}
      >
        <DeliveryDatePicker handleSelectDate={handleSelectDate} />
      </ModalWrapper>
      <ModalWrapper
        className={`p-3`}
        isOpen={deliveryModal}
        onClose={(e) => {}}
        maxHeight={"101vh"}
      >
        <DeliveryTimeSlotSelector
          deliverydate={deliveryData?.date}
          handleSelectSlot={handleSelectSlot}
        />
      </ModalWrapper>
    </>
  );
};

export default DeliveryDateSelector;
