import useCountdown from "./hooks/useCountDown";

const OrderTimer = (
  {
    // timeLeft
  }
) => {
  const timeLeft = useCountdown(new Date("2024-08-30T23:59:59"), new Date());
  return (
    <div className="bg-yellow-100 p-2 rounded shadow-t-lg">
      <p className="text-sm">Get Today! Order within {timeLeft} Hrs</p>
    </div>
  );
};

export default OrderTimer;
