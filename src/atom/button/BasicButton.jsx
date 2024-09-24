const BasicButton = ({ children, onClick, className, type }) => (
  <button
    type={type}
    className={`py-3  font-semibold ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default BasicButton;
