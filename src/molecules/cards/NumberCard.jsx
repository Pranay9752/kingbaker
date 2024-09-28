import { twMerge } from "tailwind-merge";

const NumberCard = ({ title, value, textColor, className, onClick, active=false }) => (
  <div
    onClick={onClick}
    className={twMerge(
      `bg-white border p-4 rounded-lg shadow flex flex-col justify-center items-center gap-2 cursor-pointer `, active && 'bg-yellow-300/20 border border-gray-500',
      className
    )}
  >
    <p className={`text-3xl font-semibold ${textColor}`}>{value}</p>
    <h3 className="text-lg text-slate-500 font- mb-2">{title}</h3>
  </div>
);

export default NumberCard;
