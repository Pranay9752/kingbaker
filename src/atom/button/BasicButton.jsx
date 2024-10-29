import { twMerge } from "tailwind-merge";

const BasicButton = ({
  disabled = false,
  children,
  onClick,
  className,
  type,
}) => (
  <button
    type={type}
    className={twMerge(`py-3  font-semibold `, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default BasicButton;
