const NumberCard = ({ title, value, textColor }) => (
  <div className="bg-white border p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
  </div>
);

export default NumberCard;
