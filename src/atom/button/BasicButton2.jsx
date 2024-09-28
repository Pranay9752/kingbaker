import { twMerge } from "tailwind-merge";

function BasicButton2({ title, className, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className={twMerge(
          `  py-1.5 border -2 border-gray-800  rounded-xl text-gray-800 bg-pgreen font-semibold   active:scale-95 text-sm lg:text-base px-3 `,
          className
        )}
      >
        <span>{title}</span>
      </button>
    </>
  );
}

export default BasicButton2;
