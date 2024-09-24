const NumberCard = ({ title, value, textColor }) => (
  <div className="bg-white border p-4 rounded-lg shadow flex flex-col justify-center items-center gap-2">
    <p className={`text-3xl font-semibold ${textColor}`}>{value}</p>
    <h3 className="text-lg text-slate-500 font- mb-2">{title}</h3>
  </div>
);

export default NumberCard;
