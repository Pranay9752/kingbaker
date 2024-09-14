const CheckoutCard = ({ children, stepNumber, title, done = false }) => {
  return (
    <div className="w-[40vw] border shadow-lg rounded-md p-5 bg-white relative">
      {title && <h3 className="text-lg font-bold text-left ml-6">{title}</h3>}
      {children}
      {done && (
        <div className=" absolute inset-y-0 right-4 flex justify-center items-center">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-9 text-green-600 "
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
        </div>
      )}
      <div className="absolute bg-[#7D8035] rounded-e-lg py-1 px-2.5 text-white font-semibold left-0 top-4">
        {stepNumber}
      </div>
    </div>
  );
};

export default CheckoutCard;
