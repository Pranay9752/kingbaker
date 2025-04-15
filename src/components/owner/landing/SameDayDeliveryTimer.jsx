import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const formatTime = (seconds) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hrs} : ${mins} : ${secs}`;
};

const SameDayDeliveryTimer = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
  });
  const navigate = useNavigate();

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          const now = new Date();
          const midnight = new Date();
          midnight.setHours(24, 0, 0, 0);
          return Math.floor((midnight.getTime() - now.getTime()) / 1000);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="bg-[#8D9440] text-center px-4 py-3 mt-5 rounded-lg">
      <h2 className="text-white text-lg font-semibold">Same Day Delivery</h2>
      <p className="text-[#C6CC87] text-sm mb-1">
        Time Left for Today 's Delivery
      </p>
      <div className="text-[#F9C544] text-2xl font-medium mb-3">
        {formatTime(remainingSeconds)}
      </div>
      <button onClick={() => navigate('/search/same day delivery')} className="bg-[#E97E27] text-white text-sm font-medium px-4 py-2 rounded">
        Explore Now
      </button>
    </section>
  );
};

export default SameDayDeliveryTimer;
