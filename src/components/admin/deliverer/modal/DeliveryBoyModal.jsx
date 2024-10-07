import React from "react";
import { useForm } from "react-hook-form";
import BasicButton2 from "../../../../atom/button/BasicButton2";

function DeliveryBoyModal({ handleSaveUser, currentUser, handleCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: currentUser
  });

  const onSubmit = (data) => {
    handleSaveUser(data);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        {currentUser ? "Edit User" : "Add New User"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[a-z]+$/,
                message:
                  "Username must contain only lowercase letters with no spaces",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            No special characters are allowed and use only small letters with no
            space for creating username
          </p>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        {!currentUser && (
          <>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Your passwords do not match";
                    }
                  },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </>
        )}
        <div className="mb-6">
          <label className="block mb-2">Mobile Number</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              +91
            </span>
            <input
              type="tel"
              {...register("phoneNo", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number",
                },
              })}
              className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
            />
          </div>
          {errors.phoneNo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNo.message}
            </p>
          )}
        </div>
        <div className="flex justify-end items-center gap-3">
          <BasicButton2
            className={`bg-gray-400 text-white text-base rounded-lg `}
            title={"Cancel"}
            onClick={handleCancel}
          />
          <BasicButton2
            type={"submit"}
            className={`bg-pgreen text-base rounded-lg`}
            title={"Save"}
          />
        </div>
      </form>
    </>
  );
}

export default DeliveryBoyModal;
