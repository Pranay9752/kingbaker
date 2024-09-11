import scrollToDiv from "../atom/utils/scrollToDiv";


const Rating = ({ score, reviews }) => (
  <div className="flex justify-between">
    <div
      onClick={() => scrollToDiv("productReview")}
      className="flex items-center "
    >
      <span className="text-white  font-bold mr-2 bg-green-600 px-1.5 py-0.5 rounded text-sm">
        {score}
        {"  "}★
      </span>
      <span className=" text-sm text-blue-600">
        {reviews?.length ?? 0} Reviews
      </span>
    </div>
    <div
      onClick={() => scrollToDiv("offersAvailable")}
      className={
        "text-white md:hidden bg-gray-500 rounded-lg py-1 text-xs px-2 flex gap-1"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M4.5 2A2.5 2.5 0 0 0 2 4.5v2.879a2.5 2.5 0 0 0 .732 1.767l4.5 4.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-4.5-4.5A2.5 2.5 0 0 0 7.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          clipRule="evenodd"
        />
      </svg>
      <span>Offers Available</span>
    </div>
  </div>
);

export default Rating;
