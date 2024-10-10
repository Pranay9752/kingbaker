const BasicButton = ({
  disabled = false,
  children,
  onClick,
  className,
  type,
}) => (
  <button
    type={type}
    className={`py-3  font-semibold ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default BasicButton;
