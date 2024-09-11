

import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import BottomSheet from '../atom/popovers/BottomSheet';

const DeliveryDatePicker = ({ handleSelectDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const onDateClick = (day) => {
        setSelectedDate(day);
        handleSelectDate(day)
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {

        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between p-4  text-gray-800">
                <button onClick={prevMonth} className="p-2">
                    {/* <ChevronLeft size={24} /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
                <button onClick={nextMonth} className="p-2">
                    {/* <ChevronRight size={24} /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>

                </button>
            </div>
        );
    };

    const renderDays = () => {
        const dateFormat = "EEEEE";
        const days = [];

        let startDate = startOfMonth(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className="text-center font-bold p-2">
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="grid grid-cols-7 mb-2">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        key={day}
                        className={`relative p-2 text-center cursor-pointer ${(!isSameMonth(day, monthStart) || new Date(day) < new Date())
                            ? "text-gray-400"
                            : isSameDay(day, selectedDate)
                                ? "bg-[#7e8037] text-white rounded-full"
                                : ""
                            }`}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span
                            className={`${isToday(day) ? "bg-red-500 text-white rounded-full px-2.5 py-1" : ""
                                }`}
                        >
                            {formattedDate}
                        </span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day} className="grid grid-cols-7">
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="mb-4">{rows}</div>;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-[95vh] flex flex-col justify-start item-center w-full  "
        >
            <div className="flex items-center p-4  text-gray-800">

                {/* <ChevronLeft className="cursor-pointer" onClick={() => { }} /> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg> */}
                <h2 className="text-xl font-bold flex-grow text-left pl-3">Select Delivery Date</h2>
                {/* <Calendar className="cursor-pointer" onClick={() => { }} /> */}
            </div>
            {renderHeader()}
            {renderDays()}
            {renderCells()}
            <div className="p-4 text-sm text-gray-600">
                <p>Gift may be delivered prior or after the chosen date.</p>
                <p className="mt-2 text-blue-600 cursor-pointer">
                    Want Delivery on Same Day? View Available Gifts
                </p>
            </div>
        </motion.div>
    );
};



const DeliveryTimeSlotSelector = ({ handleSelectSlot }) => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const expressSlots = [
        { id: 1, time: '08:00 AM - 09:00 PM' },
        { id: 2, time: '09:00 AM - 02:00 PM' },
        { id: 3, time: '12:00 PM - 05:00 PM' },
        { id: 4, time: '04:00 PM - 09:00 PM' },
        { id: 5, time: '05:00 PM - 11:00 PM' },
    ];

    const deliveryOptions = [
        { id: 'express', title: 'Express Delivery', price: 19, description: 'Choose from any 5-hour slot during the day', expressSlots },
        { id: 'standard', title: 'Standard Delivery', price: 19, description: 'Choose between 1st half or 2nd half of the day', expressSlots },
        { id: 'express3', title: 'Express Delivery', price: 49, description: 'Choose from any 3-hour slot during the day', expressSlots },
        { id: 'fixed', title: 'Fixed Time Delivery', price: 99, description: 'Choose from any 1-hour slot', expressSlots },
        { id: 'pre-midnight', title: 'Pre-Midnight Delivery', price: 249, description: 'Gift will be delivered any time between 11:00 PM-11:59 PM', expressSlots },
    ];

    const handleSlotSelect = (id) => {
        const delivery = deliveryOptions.find((delivery) => delivery.id === selectedOption)
        const slot = expressSlots[id - 1]

        setSelectedSlot(id)
        handleSelectSlot({ delivery, slot })

    }

    return (
        <div className=" mx-auto">
            <div className="text-gray-800 px-2 py-4 flex items-center">
                <h2 className="text-xl font-semibold ml-4">Select Delivery Time Slot</h2>
            </div>

            <div className="p-4">
                {deliveryOptions.map((option, index) => (
                    <div key={option.id} className={`mb-4 ${index !== 0 ? 'border-t pt-4' : ''}`}>
                        <div onClick={() => setSelectedOption(option.id)} className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">{option.title}</h3>
                            <span className="text-lg">₹ {option.price}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{option.description}</p>

                        {option.id === selectedOption && (
                            <div>
                                <p className=" text-gray-500 mb-2">Select Time Slot</p>
                                <ul>

                                    {expressSlots.map((slot, index) => (
                                        <li key={slot.id} className="flex items-center mb-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="timeSlot"
                                                id={`${option.id}-${index}`}
                                                value={slot.id}
                                                checked={selectedSlot === slot.id}
                                                onChange={() => handleSlotSelect(slot.id)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`${option.id}-${index}`}>{slot.time}</label>
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



const DeliveryDateSelector = () => {
    const [deliveryData, setDeliveryData] = useState(null)
    const [DateModal, setDateModal] = useState(false);
    const [deliveryModal, setDeliveryModal] = useState(false);
    const handleToggleDateModal = (e, value = null) => {
        setDateModal((prev) => (value ? value : !prev));
    };

    const handleSelectDate = (day) => {
        setDeliveryData({ date: day });
        setDateModal((prev) => false)
        setDeliveryModal((prev) => true)
    }

    const handleSelectSlot = ({ delivery, slot }) => {
        setDeliveryData((prev) => ({ ...prev, ...delivery, selectedSlot: slot }))
        setDeliveryModal((prev) => false)
    }
    console.log(deliveryData);


    return (<>
        {deliveryData ? <div onClick={handleToggleDateModal} className=" bg-white border-2 border-gray-400 px-3 py-1 flex gap-2 rounded w-full">
                <div className="flex items-baseline">
                    <span className="text-5xl [40px] text-[#222222] mr-2">{new Date(deliveryData.date).getDate()}</span>
                </div>
                <div className='flex flex-col justify-center item-center text-left pr-4'>

                    <span className="text-gray-600 uppercase  mr-2">
                        {new Date(deliveryData.date).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-gray-600 uppercase ">
                        {new Date(deliveryData.date).toLocaleString('default', { weekday: 'short' })}
                    </span>
                </div>

                <div className=" text -sm text-gray-700">
                    {deliveryData?.title ?? ""}: <span className='font-bold'>₹ {deliveryData?.price ?? ""}</span>
                    <br />
                    {deliveryData?.selectedSlot?.time ?? ""}
                </div>
        </div> : <div onClick={handleToggleDateModal} className="flex items-center justify-between bg-white border-2 border-orange-400 animate-glow px-3 py-2 rounded w-full">
            <div className="flex items-center gap-2 text-xl truncate w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
                    <path fillRule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clipRule="evenodd" />
                </svg>
                <span className="truncate w-full">Select Delivery Date & Time</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-auto size-6">
                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                </svg>
            </div>
        </div>}
        <BottomSheet
            isOpen={DateModal}
            onClose={(e) => { }}
            maxHeight={"101vh"}
        >
            <DeliveryDatePicker handleSelectDate={handleSelectDate} />
        </BottomSheet>
        <BottomSheet
            isOpen={deliveryModal}
            onClose={(e) => { }}
            maxHeight={"101vh"}
        >
            <DeliveryTimeSlotSelector handleSelectSlot={handleSelectSlot} />
        </BottomSheet>

    </>
    )
};

export default DeliveryDateSelector;