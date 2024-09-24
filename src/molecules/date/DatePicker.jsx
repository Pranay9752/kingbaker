import React, { useEffect, useState } from "react";
import { addDays, differenceInDays, subDays } from "date-fns";
import ReactDateRangePicker from "../../atom/date/DatePicker";

function DateRangeOneFilter({
  handleDateChange,
  defaultDate = {
    startDate: subDays(new Date(), 1),
    endDate: new Date(),
  },
}) {
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 1),
    endDate: new Date(),
  });

  const handleStartDateChange = (date) => {
    if (differenceInDays(date, dateRange.endDate) < 0) {
      setDateRange((prev) => ({ ...prev, startDate: date }));
    } else {
      setDateRange((prev) => ({ endDate: addDays(date, 1), startDate: date }));
    }
  };

  const handleEndDateChange = (date) => {
    if (differenceInDays(date, dateRange.startDate) > 0) {
      setDateRange((prev) => ({ ...prev, endDate: date }));
    } else {
      setDateRange((prev) => ({ startDate: subDays(date, 1), endDate: date }));
    }
  };

  const handleApply = () => handleDateChange(dateRange);
  const handleReset = () => setDateRange(defaultDate);

  useEffect(() => {
    if (defaultDate) setDateRange(defaultDate);
  }, []);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate && window.innerWidth > 1024) {
      handleDateChange(dateRange);
    }
  }, [dateRange.startDate, dateRange.endDate, window.innerWidth]);

  return (
    <div className="flex justify-start items-center gap-3 w-fit  max-w-[400px] ">
      <ReactDateRangePicker
        newStartdate={dateRange.startDate}
        startDate={null}
        setStartDates={handleStartDateChange}
        newEnddate={dateRange.endDate}
        endDate={null}
        setEndDates={handleEndDateChange}
        handleApply={handleApply}
        handleReset={handleReset}
      />
    </div>
  );
}

export default DateRangeOneFilter;
