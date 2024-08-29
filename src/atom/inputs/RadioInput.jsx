const RadioInput = ({ label, name, checked = false }) => (
    <label className="mr-4">
        <input type="radio" name={name} className="mr-1" defaultChecked={checked} />
        {label}
    </label>
);

export default RadioInput