import { useState, useEffect } from 'react';
import { formatDistanceStrict, differenceInMilliseconds } from 'date-fns';

const useCountdown = (targetDate, currentTime) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const timeDifference = differenceInMilliseconds(targetDate, currentTime);

      if (timeDifference > 0) {
        setTimeLeft(formatDistanceStrict(targetDate, currentTime));
      } else {
        setTimeLeft('Time is up!');
        clearInterval(interval); // Use the interval variable after it's defined
      }
    };

    updateCountdown();

    const interval = setInterval(() => {
      currentTime.setSeconds(currentTime.getSeconds() + 1);
      updateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, currentTime]);

  return timeLeft;
};

export default useCountdown;
