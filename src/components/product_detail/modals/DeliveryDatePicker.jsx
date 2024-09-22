import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";



const DeliveryDatePicker = ({ handleSelectDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
  
    const onDateClick = (day) => {
      setSelectedDate(day);
      handleSelectDate(day);
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
          <button type="button" onClick={prevMonth} className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button  type="button" onClick={nextMonth} className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
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
              className={`relative p-2 text-center cursor-pointer ${
                !isSameMonth(day, monthStart) || new Date(day) < new Date()
                  ? "text-gray-400"
                  : isSameDay(day, selectedDate)
                  ? "bg-[#7e8037] text-white rounded-full"
                  : ""
              }`}
              onClick={() => onDateClick(cloneDay)}
            >
              <span
                className={`${
                  isToday(day)
                    ? "bg-red-500 text-white rounded-full px-2.5 py-1"
                    : ""
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
        className="h-[95vh] md:h-fit flex flex-col justify-start item-center w-full text-left "
      >
        <div className="flex items-center p-4 md:p-0 text-gray-800">
         
          <h2 className="text-xl font-bold flex-grow text-left pl-3">
            Select Delivery Date
          </h2>
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


  export default DeliveryDatePicker;