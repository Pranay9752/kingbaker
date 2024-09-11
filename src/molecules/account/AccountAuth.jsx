import React, { useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserMutation,
  useLoginUserMutation,
} from "../../redux/apiSlices/account.jsx/accountSlice";
import { toast } from "sonner";
import setCookie from "../../atom/utils/setCookies";

function AccountAuth({ className, handleOnLogin }) {
  const [isExistingUser, setIsExistingUser] = useState(null);
  const schema =
    isExistingUser == null
      ? yup.object().shape({
          email: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
        })
      : yup.object().shape({
          email: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
          password: yup.string().when("isExistingUser", {
            is: true,
            then: yup.string().required("Password is required"),
          }),
          name: yup.string().when("isExistingUser", {
            is: false,
            then: yup.string().required("Name is required"),
          }),
          phone: yup.string().when("isExistingUser", {
            is: false,
            then: yup.string().required("Phone number is required"),
          }),
        });

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  const [
    createUser,
    { isLoading: createUserLoading, isError: creteUserLoading },
  ] = useCreateUserMutation();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isExistingUser: false,
    },
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const email = watch("email");

  const checkEmailExists = (email) => {
    // Replace with your logic to check if the email exists
    const existingEmails = [
      "user1@example.com",
      "user2@example.com",
      "john@example.com",
    ];
    return existingEmails.includes(email);
  };

  const onSubmit = async () => {
    const data = methods.getValues();
    methods.trigger();
    if (isExistingUser == null) {
      const exists = checkEmailExists(data["email"]);
      setIsExistingUser(exists);
      setValue("isExistingUser", exists);
    } else {
      try {
        if (isExistingUser) {
          const response = await loginUser({
            email: data["email"],
            password: data["password"],
          }).unwrap();

          setCookie("user", response?.data?.user);
          setCookie("user_id", response?.data?.user_id);
          setCookie("email", response?.data?.email);
          setCookie("authcode", response?.data?.authcode);
          setCookie("isAuth", true);
          toast.success(response?.data?.message ?? "Login Successfull");
          handleOnLogin({ data: response?.data });
        } else {
          const newUser = {
            user_details: {
              username: "johndoe123",
              email: "johndoe@example.com",
              password: "hashedPassword123",
              name: "John Doe",
              mobile: "+1234567890",
              dob: "1990-05-15T00:00:00.000Z",
              dateOfAnniversary: "2020-09-22T00:00:00.000Z",
              gender: "Male",
              address: "123 Main Street, Apt 4B",
              pincode: "12345",
              city: "New York",
              country: "USA",
            },
          };
          createUser(newUser);
        }
      } catch (error) {}
    }
    // navigate("/checkout");
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const exists = checkEmailExists(email);
    setIsExistingUser(exists);
    setValue("isExistingUser", exists);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`shadow bg-white p-4 border-2 rounded-lg ${className}`}
      >
        <div className="relative ">
          <input
            type="text"
            id="email"
            className={`block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 ${
              isExistingUser ? "border-green-600" : `border-slate-200`
            } appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer`}
            placeholder=" "
            {...register("email", {
              onChange: () => {
                isExistingUser === false && setIsExistingUser(null);
              },
            })}
            disabled={isExistingUser}
          />
          {isExistingUser == null ? (
            <></>
          ) : isExistingUser ? (
            <svg
              onClick={() => {
                methods.reset();
                setIsExistingUser(null);
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 absolute top-1/4 right-3 "
            >
              <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`size-6 text-green-600 absolute top-1/4 right-3  `}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"
              />
            </svg>
          )}

          <label
            htmlFor="email"
            className={`absolute  left-3  text-sm ${
              isExistingUser ? "text-green-600" : "text-gray-500"
            } duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4`}
          >
            Email
          </label>
          {errors.email && (
            <p className="text-left text-red-500 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
        <AnimatePresence>
          {isExistingUser != null ? (
            isExistingUser ? (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
                className="relative mt-4"
              >
                <input
                  type="password"
                  id="password"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                  placeholder=" "
                  {...register("password")}
                />
                <label
                  htmlFor="password"
                  className="absolute  left-3  text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Password
                </label>
                {errors.password && (
                  <p className="text-left text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center mt-4"
                >
                  <div className="relative z-0 w-1/4">
                    <select
                      id="title"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                      {...register("title")}
                    >
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Dr">Dr.</option>
                    </select>
                  </div>
                  <div className="relative z-0 w-3/4 ml-2">
                    <input
                      type="text"
                      id="name"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                      placeholder=" "
                      {...register("name")}
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Name
                    </label>
                    {errors.name && (
                      <p className="text-left text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center mt-4"
                >
                  <div className="relative z-0 w-1/4">
                    <select
                      id="countryCode"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                      {...register("countryCode")}
                    >
                      <option value="+91">+91 IND</option>
                      <option value="+1">+1 USA</option>
                      <option value="+44">+44 UK</option>
                    </select>
                  </div>
                  <div className="relative z-0 w-3/4 ml-2">
                    <input
                      type="text"
                      id="phone"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                      placeholder=" "
                      {...register("phone")}
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Phone
                    </label>
                    {errors.phone && (
                      <p className="text-left text-red-500 text-xs">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              </>
            )
          ) : (
            <></>
          )}
        </AnimatePresence>

        <button
          onClick={onSubmit}
          type="button"
          className="mt-6 bg-orange-500 text-white py-2 px-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
        >
          Continue
        </button>
      </form>
    </FormProvider>
  );
}

export default AccountAuth;
