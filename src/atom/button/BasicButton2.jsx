import { twMerge } from "tailwind-merge";

function BasicButton2({
  type,
  title,
  className,
  onClick,
  disabled = false,
  icon,
}) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={twMerge(
          `  py-1.5 flex items-center border-gray-800  rounded-xl text-gray-800 bg-pgreen font-semibold   active:scale-95 text-sm lg:text-base px-3 `,
          className
        )}
        disabled={disabled}
      >
        {icon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-4 mr-2"
          >
            {icon}
          </svg>
        )}
        <span>{title}</span>
      </button>
    </>
  );
}

export default BasicButton2;
