const AddressCard = ({ address, onSelect, onEdit, isShow = false }) => {
  return (
    <div className="bg-blue-100 border relative rounded py-1 px-2 flex items-center gap-2 overflow-hidden">
      {!isShow && (
        <input
          type="radio"
          id={address?._id}
          name="address"
          value={address?._id}
          onChange={() => onSelect(address?._id)}
        />
      )}
      <label htmlFor={address?._id} className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm whitespace-nowrap">
            {address?.recipientName}
          </span>
          <div className="h-[5px] w-[5px] rounded-full bg-gray-800" />
          <span className="font-semibold text-sm whitespace-nowrap">
            {address?.recipientMobnumber ?? address?.recipientMobile}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="bg-gray-200 text-xs font-bold px-1 rounded-md">
            {address?.addressType}
          </span>
          <span className="whitespace-nowrap truncate text-sm">
            {address?.recipientAddress} {address?.area} {address?.city} -{" "}
            {address?.pincode}
          </span>
        </div>
      </label>
      <div onClick={onEdit} className="absolute top-1 right-1 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default AddressCard;
