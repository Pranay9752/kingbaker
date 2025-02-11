import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
  isAfter,
  startOfDay,
  isBefore,
} from "date-fns";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

const DeliveryDatePicker = ({
  handleSelectDate,
  darkMode = false,
  onClose = () => {},
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update current date and time every minute
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const isDateSelectable = (day) => {
    const today = startOfDay(currentDateTime);

    // If the day is before today, it's not selectable
    if (isBefore(day, today)) return false;

    // If it's today, check the time
    if (isToday(day)) {
      const currentHour = currentDateTime.getHours();
      return currentHour < 23; // Selectable if it's before 11 PM
    }

    // If it's a future date, it's always selectable
    return true;
  };

  const onDateClick = (day) => {
    if (isDateSelectable(day)) {
      setSelectedDate(day);
      handleSelectDate(day);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div
        className={twMerge(
          "flex items-center justify-between p-4 text-gray-800",
          darkMode && "text-white"
        )}
      >
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
        <button type="button" onClick={nextMonth} className="p-2">
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
        const isSelectable = isDateSelectable(cloneDay);
        days.push(
          <div
            key={day}
            className={`relative p-2 text-center ${
              isSelectable ? "cursor-pointer" : "cursor-not-allowed"
            } ${
              !isSameMonth(day, monthStart) || !isSelectable
                ? "text-gray-400"
                : isSameDay(day, selectedDate)
                ? "bg-[#7e8037] text-white rounded-full"
                : ""
            }`}
            onClick={() => isSelectable && onDateClick(cloneDay)}
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
      className="h-[95vh] relative md:h-fit flex flex-col justify-start item-center w-full text-left "
    >
      <div onClick={onClose} className="absolute right-0 cursor-pointer ">
        <X />
      </div>
      <div className="flex items-center p-4 md:p-0 text-gray-800">
        <h2
          className={twMerge(
            "text-xl font-bold flex-grow text-left pl-3",
            darkMode && "text-white"
          )}
        >
          Select Delivery Date
        </h2>
      </div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="p-4 text-sm text-gray-600">
        <p>Gift may be delivered prior or after the chosen date.</p>
        {/* <p className="mt-2 text-blue-600 cursor-pointer">
          Want Delivery on Same Day? View Available Gifts
        </p> */}
      </div>
    </motion.div>
  );
};

export default DeliveryDatePicker;
