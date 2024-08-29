
const Input = ({ placeholder, value, onChange, className }) => (
    <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border rounded p-2 ${className}`}
    />
);

export default Input