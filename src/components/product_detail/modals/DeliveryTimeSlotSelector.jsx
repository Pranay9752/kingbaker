import { isToday } from "date-fns";
import { useState } from "react";

const DeliveryTimeSlotSelector = ({ handleSelectSlot, deliverydate }) => {
  console.log(deliverydate)
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const expressSlots = [
    { id: 1, time: "08:00 AM - 09:00 PM" },
    { id: 2, time: "09:00 AM - 02:00 PM" },
    { id: 3, time: "12:00 PM - 05:00 PM" },
    { id: 4, time: "04:00 PM - 09:00 PM" },
    { id: 5, time: "05:00 PM - 11:00 PM" },
  ];

  const deliveryOptions = [
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
      id: "fixed",
      title: "Fixed Time Delivery",
      price: 99,
      description: "Choose from any 1-hour slot",
      expressSlots: [
        { id: 1, time: "08:00 AM - 09:00 PM" },
        { id: 2, time: "09:00 AM - 02:00 PM" },
        { id: 3, time: "12:00 PM - 05:00 PM" },
        { id: 4, time: "04:00 PM - 09:00 PM" },
        { id: 5, time: "05:00 PM - 11:00 PM" },
      ],
    },
    {
      id: "pre-midnight",
      title: "Pre-Midnight Delivery",
      price: 249,
      description: "Gift will be delivered any time between 11:00 PM-11:59 PM",
      expressSlots: [{ id: 1, time: "23:00 AM - 23:59 PM" }],
    },
  ];
  const deliveryTodayOptions = [
    {
      id: "standard",
      title: "Standard Delivery",
      price: 19,
      description: "Choose between 1st half or 2nd half of the day",
      expressSlots: [
        // { id: 3, time: "16:00 PM - 21:00 PM" },
        { id: 4, time: "17:00 PM - 24:00 PM" },
      ],
    },
    {
      id: "express",
      title: "Express Delivery",
      price: 49,
      description: "Choose from any 3-hour slot during the day",
      expressSlots: [

        // { id: 5, time: "05:00 PM - 11:00 PM" },
      ],
    },
    {
      id: "fixed",
      title: "Fixed Time Delivery",
      price: 99,
      description: "Choose from any 1-hour slot",
      expressSlots: [

        // { id: 5, time: "05:00 PM - 11:00 PM" },
      ],
    },
    {
      id: "pre-midnight",
      title: "Pre-Midnight Delivery",
      price: 249,
      description: "Gift will be delivered any time between 11:00 PM-11:59 PM",
      expressSlots: [{ id: 1, time: "23:00 AM - 23:59 PM" }],
    },
  ];

  const handleSlotSelect = (id) => {
    const delivery = deliveryOptions.find(
      (delivery) => delivery.id === selectedOption
    );
    const slot = expressSlots[id - 1];

    setSelectedSlot(id);
    handleSelectSlot({ delivery, slot });
  };

  return (
    <div className=" mx-auto text-left">
      <div className="text-gray-800 px-2 py-4 flex items-center">
        <h2 className="text-xl font-semibold ml-4">
          Select Delivery Time Slot
        </h2>
      </div>

      <div className="p-4 h-[450px] overflow-y-auto hide-scrollbar">
        {(isToday(new Date(deliverydate)) ? deliveryTodayOptions : deliveryOptions).map((option, index) => (
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
