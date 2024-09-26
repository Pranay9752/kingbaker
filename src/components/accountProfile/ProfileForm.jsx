import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetProfileQuery } from "../../redux/apiSlices/account.jsx/accountSlice";
import getCookie from "../../atom/utils/getCookies";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .required("Mobile is required")
    .matches(/^\+\d{2}\s\d{10}$/, "Invalid mobile format"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  dateOfAnniversary: yup.date(),
  gender: yup
    .string()
    .oneOf(["Male", "Female", "Other"], "Please select a gender"),
  address: yup.string().required("Address is required"),
  pincode: yup.string().required("Pincode is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
});

const InputField = ({ name, label, errors, register, icon, type = "text" }) => {
  return (
    <div className="relative z-0">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className={`h-5 w-5  ${
              errors[name] ? "text-red-600" : "text-gray-500"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {icon}
          </svg>
        </div>
      )}
      <input
        type={type}
        id={name}
        name={name}
        {...register(name)}
        aria-describedby={`${name}_help`}
        className={`block py-2.5 ${
          icon && `pl-10`
        } px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer
     
      ${
        errors[name] ? "border-red-600 focus:border-red-600 text-red-600" : ""
      }`}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-6
     
      ${
        errors[name]
          ? "text-red-600  peer-focus:text-red-600"
          : "text-gray-500  peer-focus:text-blue-600 "
      }
      `}
      >
        {label}
      </label>
      {errors[name] && (
        <p id={`${name}_help`} className="mt-2 text-xs text-red-600 ">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

const ProfileForm = () => {
  const { data, isLoading } = useGetProfileQuery({ email: getCookie("email") });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...(data?.data ?? {}), country: "India" },
  });

  console.log("data: ", data);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-6 "
    >
      <div className="grid grid-cols-2 gap-4">
        <InputField
          errors={errors}
          register={register}
          name={"name"}
          label={"Name"}
          icon={
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          }
        />
        <InputField
          errors={errors}
          register={register}
          name={"mobile"}
          label={"Mobile"}
          icon={
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          }
        />
      </div>

      <InputField
        type={"email"}
        errors={errors}
        register={register}
        name={"email"}
        label={"Email"}
        icon={
          <>
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          type={"date"}
          errors={errors}
          register={register}
          name={"dob"}
          label={"Date Of Birth"}
        />
        <InputField
          type={"date"}
          errors={errors}
          register={register}
          name={"dateOfAnniversary"}
          label={"Date of Anniversary"}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <div className="mt-2 space-x-4">
          {["Male", "Female", "N/A"].map((option) => (
            <label key={option} className="inline-flex items-center">
              <input
                type="radio"
                {...register("gender")}
                value={option}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      <InputField
        errors={errors}
        register={register}
        name={"address"}
        label={"Address"}
        icon={
          <>
            <path
              fillRule="evenodd"
              d="M8.157 2.176a1.5 1.5 0 0 0-1.147 0l-4.084 1.69A1.5 1.5 0 0 0 2 5.25v10.877a1.5 1.5 0 0 0 2.074 1.386l3.51-1.452 4.26 1.762a1.5 1.5 0 0 0 1.146 0l4.083-1.69A1.5 1.5 0 0 0 18 14.75V3.872a1.5 1.5 0 0 0-2.073-1.386l-3.51 1.452-4.26-1.762ZM7.58 5a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5A.75.75 0 0 1 7.58 5Zm5.59 2.75a.75.75 0 0 0-1.5 0v6.5a.75.75 0 0 0 1.5 0v-6.5Z"
              clipRule="evenodd"
            />
          </>
        }
      />
      <div className="grid grid-cols-2 gap-4">
        <InputField
          errors={errors}
          register={register}
          name={"Pincode"}
          label={"pincode"}
          icon={
            <>
              <path
                fillRule="evenodd"
                d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                clipRule="evenodd"
              />
            </>
          }
        />
        <InputField
          errors={errors}
          register={register}
          name={"City"}
          label={"city"}
          icon={
            <>
              <path
                fillRule="evenodd"
                d="M8.157 2.176a1.5 1.5 0 0 0-1.147 0l-4.084 1.69A1.5 1.5 0 0 0 2 5.25v10.877a1.5 1.5 0 0 0 2.074 1.386l3.51-1.452 4.26 1.762a1.5 1.5 0 0 0 1.146 0l4.083-1.69A1.5 1.5 0 0 0 18 14.75V3.872a1.5 1.5 0 0 0-2.073-1.386l-3.51 1.452-4.26-1.762ZM7.58 5a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5A.75.75 0 0 1 7.58 5Zm5.59 2.75a.75.75 0 0 0-1.5 0v6.5a.75.75 0 0 0 1.5 0v-6.5Z"
                clipRule="evenodd"
              />
            </>
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          {...register("country")}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a country</option>
          <option value="India">India</option>
          {/* Add more country options here */}
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
        )}
      </div>

      <div className="pt-3 ml-auto">
        <button
          type="submit"
          className="w-fit inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
