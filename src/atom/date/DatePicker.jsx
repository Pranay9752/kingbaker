import React, { useEffect, useState, useRef, useMemo } from "react";
import { Calendar } from "react-date-range";
import { format, isEqual, subDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AnimatePresence } from "framer-motion";
import Modal from "../../atom/popovers/Modal";
import BottomSheet from "../../atom/popovers/BottomSheet";
import BasicButton from "../../atom/button/BasicButton";
import AnimatedWrapper from "../../molecules/wrappers/AnimatedWrapper";
import BasicButton2 from "../button/BasicButton2";

function ReactDateRangePicker({
  newStartdate = new Date(),
  setStartDates = () => {},
  startDate = new Date(),
  newEnddate = new Date(),
  setEndDates = () => {},
  endDate = new Date(),
  handleApply = () => {},
  handleReset = () => {},
}) {
  const [showDateModal, setShowDateModal] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [startdate, setstartDate] = useState(new Date(newStartdate));
  const prevNewStartDate = useRef(newStartdate);
  const [enddate, setendDate] = useState(new Date(newEnddate));
  const prevNewEndDate = useRef(newEnddate);

  function onStartChange(newdate) {
    if (!isEqual(new Date(newdate), new Date(startdate))) {
      setstartDate(newdate);
      onClose();

      setStartDates(format(newdate, "yyyy-MM-dd"));
    }
  }
  function onEndChange(newdate) {
    if (!isEqual(new Date(newdate), new Date(enddate))) {
      setendDate(newdate);
      onClose();

      setEndDates(format(newdate, "yyyy-MM-dd"));
    }
  }

  const onClose = () => {
    setIsStartOpen(false);
    setIsEndOpen(false);
  };

  let currentStartDay = useMemo(
    () => String(startdate.getDate()).padStart(2, "0"),
    [startdate]
  );

  let currentStartMonth = useMemo(
    () => String(startdate.getMonth() + 1).padStart(2, "0"),
    [startdate]
  );

  let currentStartYear = useMemo(() => startdate.getFullYear(), [startdate]);

  let currentEndDay = useMemo(
    () => String(enddate.getDate()).padStart(2, "0"),
    [enddate]
  );

  let currentEndMonth = useMemo(
    () => String(enddate.getMonth() + 1).padStart(2, "0"),
    [enddate]
  );

  let currentEndYear = useMemo(() => enddate.getFullYear(), [enddate]);

  // we will display the date as DD-MM-YYYY

  let currentStartDate = useMemo(
    () => `${currentStartDay}-${currentStartMonth}-${currentStartYear}`,
    [currentStartDay, currentStartMonth, currentStartYear]
  );
  let currentEndDate = useMemo(
    () => `${currentEndDay}-${currentEndMonth}-${currentEndYear}`,
    [currentEndDay, currentEndMonth, currentEndYear]
  );

  const handleCloseSheet = () => setShowDateModal(false);

  useEffect(() => {
    const currentDate = new Date(newStartdate);
    const prevDate = prevNewStartDate.current;

    if (prevDate instanceof Date && !isNaN(prevDate.valueOf())) {
      // Check if prevDate is a valid Date object
      if (currentDate?.toDateString() !== prevDate?.toDateString()) {
        setstartDate(currentDate);
        prevNewStartDate.current = currentDate;
      }
    } else {
      // Handle case where prevDate is not a Date object
      prevNewStartDate.current = new Date(); // Set a default Date object
    }
  }, [newStartdate]);

  useEffect(() => {
    const currentDate = new Date(newEnddate);
    const prevDate = prevNewStartDate.current;

    if (prevDate instanceof Date && !isNaN(prevDate.valueOf())) {
      // Check if prevDate is a valid Date object
      if (currentDate?.toDateString() !== prevDate?.toDateString()) {
        setendDate(currentDate);
        prevNewEndDate.current = currentDate;
      }
    } else {
      // Handle case where prevDate is not a Date object
      prevNewEndDate.current = new Date(); // Set a default Date object
    }
  }, [newEnddate]);

  return (
    <>
      <div className="  justify-start items-end mt-3  gap-3 hidden lg:flex">
        <div class="w-full">
          <label
            for="email"
            class="block mb-0.5 text-xs font-semibold text-gray-900"
          >
            Start Date
          </label>
          <div className="relative w-full py-1.5 rounded-xl  flex items-center px-3 gap-3 truncate border-2 border-gray-600 bg-white hover:bg-rsecondary/60">
            <div className=" cursor-pointer ">
              <svg
                className="w-5 h-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                  stroke="#10141A"
                  strokeWidth="1.5"
                />
                <path
                  d="M7 4V2.5"
                  stroke="#10141A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M17 4V2.5"
                  stroke="#10141A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="16.5"
                  cy="16.5"
                  r="1.5"
                  stroke="#10141A"
                  strokeWidth="1.5"
                />
                <path
                  d="M2.5 9H21.5"
                  stroke="#10141A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="cursor-pointer w-full truncate text-sm ">
              <span onClick={() => setIsStartOpen(!isStartOpen)}>
                {currentStartDate}
              </span>
            </span>
          </div>
        </div>
        <div class="w-full">
          <label
            for="email"
            class="block mb-0.5  text-xs font-semibold text-gray-900"
          >
            End Date
          </label>
          <div className="relative w-full py-1.5  rounded-xl  flex items-center px-3 gap-3 truncate border-2 border-gray-600 bg-white hover:bg-rsecondary/60">
            <div className=" cursor-pointer ">
              <svg
                className="w-5 h-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                  stroke="#10141A"
                  strokeWidth="1.5"
                />
                <path
                  d="M7 4V2.5"
                  stroke="#10141A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M17 4V2.5"
                  stroke="#10141A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="16.5"
                  cy="16.5"
                  r="1.5"
                  stroke="#10141A"
                  strokeWidth="1.5"
                />
                <path
                  d="M2.5 9H21.5"
                  stroke="#10141A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="cursor-pointer w-full truncate text-sm ">
              <span onClick={() => setIsEndOpen(!isEndOpen)}>
                {currentEndDate}
              </span>
            </span>
          </div>
        </div>

        <BasicButton2
          className={"w-1/4 py-2 "}
          title={"Apply"}
          onClick={() => {
            handleApply();
          }}
        />
        <BasicButton2
          className={"w-1/4 py-2 bg-gray-800 text-gray-50"}
          title={"Reset"}
          onClick={() => {
            setstartDate(subDays(new Date(), 1));
            setendDate(new Date());
          }}
        />
      </div>
      <div className="lg:hidden z-10 relative rounded-md hover:bg-rsecondary/40 p-2 cursor-pointer flex justify-center items-center gap-2 font-semibold active:scale-90  transition-all ease-in duration-100 active:bg-rsecondary/70">
        <svg
          onClick={() => setShowDateModal((prev) => !prev)}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
            stroke="#10141A"
            strokeWidth="1.5"
          />
          <path
            d="M7 4V2.5"
            stroke="#10141A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M17 4V2.5"
            stroke="#10141A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="16.5"
            cy="16.5"
            r="1.5"
            stroke="#10141A"
            strokeWidth="1.5"
          />
          <path
            d="M2.5 9H21.5"
            stroke="#10141A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <AnimatePresence>
        {isStartOpen && (
          <Modal onClose={onClose}>
            <AnimatedWrapper direction={"up"}>
              <Calendar
                className=""
                editableDateInputs
                date={startdate}
                onChange={onStartChange}
                minDate={new Date(startDate) || new Date("17-04-2001")}
              />
            </AnimatedWrapper>
          </Modal>
        )}
        {isEndOpen && (
          <Modal onClose={onClose}>
            <AnimatedWrapper direction={"up"}>
              <Calendar
                className=""
                editableDateInputs
                date={enddate}
                onChange={onEndChange}
                minDate={new Date(endDate) || new Date("17-04-2001")}
              />
            </AnimatedWrapper>
          </Modal>
        )}
      </AnimatePresence>
      <BottomSheet
        isOpen={showDateModal}
        onClose={handleCloseSheet}
        maxHeight={"33vh"}
      >
        <section className=" flex flex-col justify-start item-center w-full h-full ">
          <div className="pb-3 border-b  flex justify-between items-center">
            <h2 className="text-lg font-semibold">Date Range Filters</h2>
            <button onClick={handleCloseSheet} className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex  justify-start items-start mt-3  gap-3">
            <div class="mb-5 w-full">
              <label
                for="email"
                class="block mb-0.5 text-sm font-medium text-gray-900"
              >
                Start Date
              </label>
              <div className="relative w-full py-2 .5 rounded-xl  flex items-center px-3 gap-3 truncate border-2 border-gray-600 bg-white hover:bg-rsecondary/60">
                <div className=" cursor-pointer ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                      stroke="#10141A"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 4V2.5"
                      stroke="#10141A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M17 4V2.5"
                      stroke="#10141A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="16.5"
                      cy="16.5"
                      r="1.5"
                      stroke="#10141A"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2.5 9H21.5"
                      stroke="#10141A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="cursor-pointer w-full truncate text-base ">
                  <span onClick={() => setIsStartOpen(!isStartOpen)}>
                    {currentStartDate}
                  </span>
                </span>
              </div>
            </div>
            <div class="mb-5 w-full">
              <label
                for="email"
                class="block mb-0.5 text-sm font-medium text-gray-900"
              >
                End Date
              </label>
              <div className="relative w-full py-2 .5  rounded-xl  flex items-center px-3 gap-3 truncate border-2 border-gray-600 bg-white hover:bg-rsecondary/60">
                <div className=" cursor-pointer ">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                      stroke="#10141A"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 4V2.5"
                      stroke="#10141A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M17 4V2.5"
                      stroke="#10141A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="16.5"
                      cy="16.5"
                      r="1.5"
                      stroke="#10141A"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2.5 9H21.5"
                      stroke="#10141A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="cursor-pointer w-full truncate text-base ">
                  <span onClick={() => setIsEndOpen(!isEndOpen)}>
                    {currentEndDate}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="lg:hidden flex gap-2 justify-end">
            <BasicButton2
              className={"w-1/4 py-2  bg-  focus:bg-gray-200"}
              title={"Reset"}
              onClick={handleReset}
            />
            <BasicButton2
              className={"w-1/4 py-2 "}
              title={"Apply"}
              onClick={() => {
                handleApply();
                handleCloseSheet();
              }}
            />
          </div>
        </section>
      </BottomSheet>
    </>
  );
}

export default ReactDateRangePicker;
