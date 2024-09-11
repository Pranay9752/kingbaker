import { useFormContext } from "react-hook-form";

const RadioInput = ({ label, name, checked = false }) => {
  const { register } = useFormContext();
  return (
    <label className="mr-4">
      <input
        type="radio"
        id={name}
        name={name}
        className="mr-1"
        defaultChecked={checked}
        {...register(name)}
      />
      {label}
    </label>
  );
};

export default RadioInput;
