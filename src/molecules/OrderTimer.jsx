const OrderTimer = ({ timeLeft }) => (
    <div className="bg-yellow-100 p-2 rounded shadow-t-lg">
        <p className="text-sm">Get Today! Order within {timeLeft} Hrs</p>
    </div>
);

export default OrderTimer