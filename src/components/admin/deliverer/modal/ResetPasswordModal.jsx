import React from "react";
import { useForm } from "react-hook-form";
import BasicButton2 from "../../../../atom/button/BasicButton2";

function ResetPasswordModal({ handleSaveUser, currentUser, handleCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      phoneNo: currentUser?.phoneNo,
    },
  });

  const onSubmit = (data) => {
    handleSaveUser(data);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className="flex justify-end items-center gap-3">
          <BasicButton2
            className={`bg-gray-400 text-white text-base rounded-lg `}
            title={"Cancel"}
            onClick={handleCancel}
          />
          <BasicButton2
            type={"submit"}
            className={`bg-pgreen text-base rounded-lg`}
            title={"Reset"}
          />
        </div>
      </form>
    </>
  );
}

export default ResetPasswordModal;
