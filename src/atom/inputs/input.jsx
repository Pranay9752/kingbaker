import { useFormContext } from "react-hook-form";

const Input = ({
  placeholder,
  value,
  onChange,
  className,
  id,
  validations = {},
}) => {
  const { register } = useFormContext();

  return (
    <input
      id={id}
      name={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded p-2 ${className}`}
      {...register(id,validations)}
    />
  );
};

export default Input;
