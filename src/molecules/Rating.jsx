
const Rating = ({ score, reviews }) => (
    <div className="flex items-center ">
        <span className="text-white  font-bold mr-2 bg-green-600 px-1.5 py-0.5 rounded text-sm">{score}{"  "}★</span>
        <span className=" text-sm text-blue-600">{reviews} Reviews</span>
    </div>
);

export default Rating