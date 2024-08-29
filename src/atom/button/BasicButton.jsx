

const BasicButton = ({ children, onClick, className }) => (
    <button
        className={`py-3 font-semibold ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
);

export default BasicButton