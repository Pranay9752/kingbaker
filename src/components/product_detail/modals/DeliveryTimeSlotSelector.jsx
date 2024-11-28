import { addHours, isAfter, isBefore, isToday, parse } from "date-fns";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const DeliveryTimeSlotSelector = ({
  handleSelectSlot,
  deliverydate,
  darkMode = false,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const [deliveryOptions, setDeliveryOptions] = useState([
    {
      id: "fixed",
      title: "Fixed Time Delivery",
      price: 99,
      description: "Choose from any 1-hour slot",
      expressSlots: [
        { id: 1, time: "10:00 AM - 11:00 AM" },
        { id: 2, time: "11:00 AM - 12:00 PM" },
        { id: 3, time: "12:00 PM - 1:00 PM" },
        { id: 4, time: "1:00 PM - 2:00 PM" },
        { id: 5, time: "2:00 PM - 3:00 PM" },
        { id: 6, time: "3:00 PM - 4:00 PM" },
        { id: 7, time: "4:00 PM - 5:00 PM" },
        { id: 8, time: "5:00 PM - 6:00 PM" },
        { id: 9, time: "6:00 PM - 7:00 PM" },
        { id: 10, time: "7:00 PM - 8:00 PM" },
        { id: 11, time: "8:00 PM - 9:00 PM" },
      ],
    },
    {
      id: "standard",
      title: "Standard Delivery",
      price: 19,
      description: "Choose between 1st half or 2nd half of the day",
      expressSlots: [
        { id: 1, time: "09:00 AM - 14:00 PM" },
        { id: 2, time: "12:00 AM - 17:00 PM" },
        { id: 3, time: "16:00 PM - 21:00 PM" },
        { id: 4, time: "17:00 PM - 24:00 PM" },
      ],
    },
    {
      id: "courier",
      title: "Courier Delivery",
      price: 60,
      description: "",
      expressSlots: [{ id: 1, time: "09:00 AM - 9:00 PM" }],
    },
    {
      id: "express",
      title: "Express Delivery",
      price: 49,
      description: "Choose from any 3-hour slot during the day",
      expressSlots: [
        { id: 1, time: "08:00 AM - 09:00 PM" },
        { id: 2, time: "09:00 AM - 02:00 PM" },
        { id: 3, time: "12:00 PM - 05:00 PM" },
        { id: 4, time: "04:00 PM - 09:00 PM" },
        { id: 5, time: "05:00 PM - 11:00 PM" },
      ],
    },
    {
      id: "midnight",
      title: "Midnight Delivery",
      price: 249,
      description: "Gift will be delivered any time between 11:00 PM-11:59 PM",
      expressSlots: [{ id: 1, time: "23:00 AM - 23:59 PM" }],
    },
  ]);

  const handleSlotSelect = (id) => {
    const delivery = deliveryOptions.find(
      (delivery) => delivery?.id == selectedOption
    );
    const slot = delivery?.expressSlots[id - 1];

    setSelectedSlot(id);
    handleSelectSlot({ delivery, slot });
  };

  const filterSlots = (slots) => {
    const currentTime = new Date(); // Use current time
    const futureTime = addHours(currentTime, 2);

    return slots.filter((slot) => {
      const [startTime, endTime] = slot.time.split(" - ");
      const startDate = parse(startTime, "hh:mm a", currentTime);
      const endDate = parse(endTime, "hh:mm a", currentTime);

      return (
        isAfter(startDate, futureTime) ||
        (isAfter(endDate, futureTime) && isBefore(startDate, futureTime))
      );
    });
  };

  useEffect(() => {
    setDeliveryOptions((prev) => {
      const newSlots = [];

      prev?.forEach((item) => {
        if (isToday(new Date(deliverydate))) {
          const filteredSlots = filterSlots(item.expressSlots);
          if (filteredSlots?.length > 0) {
            newSlots.push({ ...item, expressSlots: filteredSlots });
          }
        } else {
          newSlots.push(item);
        }
      });

      return newSlots;
    });
  }, [deliverydate]);

  useEffect(() => {
    const isFree = true;
    isFree &&
      setDeliveryOptions((prev) => [
        {
          id: "freeDelivery",
          title: "Free Delivery",
          price: 0,
          description: "Choose for free in your given timeslot.",
          expressSlots: [
            { id: 1, time: "09:00 AM - 14:00 PM" },
            { id: 2, time: "12:00 AM - 17:00 PM" },
            { id: 3, time: "16:00 PM - 21:00 PM" },
            { id: 4, time: "17:00 PM - 24:00 PM" },
          ],
        },
        ...prev,
      ]);
  }, []);

  return (
    <div className=" mx-auto text-left">
      <div className="text-gray-800 px-2 py-4 flex items-center">
        <h2
          className={twMerge(
            "text-xl font-semibold ml-4",
            darkMode && "text-white"
          )}
        >
          Select Delivery Time Slot
        </h2>
      </div>

      <div className="p-4 h-[450px] overflow-y-auto hide-scrollbar">
        {deliveryOptions.map((option, index) => (
          <div
            key={option.id}
            className={`mb-4 md:mb-0 ${index !== 0 ? "border-t pt-4" : ""}`}
          >
            <div
              onClick={() => setSelectedOption(option.id)}
              className="flex justify-between items-center mb-2 md:mb-0.5"
            >
              <h3 className="font-semibold text-lg">{option.title}</h3>
              <span className="text-lg">₹ {option.price}</span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{option.description}</p>

            {option.id === selectedOption && (
              <div>
                <p className=" text-gray-500 mb-2">Select Time Slot</p>
                <ul>
                  {option?.expressSlots.map((slot, index) => (
                    <li
                      key={slot.id}
                      className="flex items-center mb-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="timeSlot"
                        id={`${option.id}-${index}`}
                        value={slot.id}
                        checked={selectedSlot === slot.id}
                        onChange={() => handleSlotSelect(slot.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`${option.id}-${index}`}>
                        {slot.time}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryTimeSlotSelector;
