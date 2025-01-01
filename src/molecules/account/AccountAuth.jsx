import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  useCheckEmailMutation,
  useCreateUserMutation,
  useLoginUserMutation,
} from "../../redux/apiSlices/account.jsx/accountSlice";
import { toast } from "sonner";
import setCookie from "../../atom/utils/setCookies";
import Loader from "../../atom/loader/loader";
import getCookie from "../../atom/utils/getCookies";
import { useCreateOrderMutation } from "../../redux/apiSlices/ecom/checkoutApiSlice";

function AccountAuth({ className, handleOnLogin }) {
  const [isExistingUser, setIsExistingUser] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          mobile: yup.string().when("isExistingUser", {
            is: false,
            then: yup.string().required("Phone number is required"),
          }),
        });
  const methods = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      isExistingUser: null, // Default value for isExistingUser in form data
    },
  });
  const [createOrder, { isLoading: createOrderLoading }] =
    useCreateOrderMutation();

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  const [
    createUser,
    { isLoading: createUserLoading, isError: creteUserLoading },
  ] = useCreateUserMutation();

  const [
    checkEmail,
    { isLoading: checkEmailLoading, isError: checkEmailError },
  ] = useCheckEmailMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const email = watch("email");

  const checkEmailExists = async (email) => {
    try {
      const response = await checkEmail({ email });
      console.log("response: ", response);
      return response.data.exists;
    } catch (error) {
      return null;
    }
  };

  const onSubmit = async (userData) => {
    // Trigger validation and get form values
    const data = methods.getValues();
    const validationResult = await methods.trigger();

    // Check if validation failed
    if (!validationResult) {
      toast.info("Validation failed!");
      return;
    }

    // Handle email existence check
    if (isExistingUser == null) {
      try {
        // if (data.email == "owner@bestbakery.com") {
        //   setIsExistingUser(true);
        //   setValue("isExistingUser", true);
        //   return;
        // }
        const exists = await checkEmailExists(data.email);
        if (exists === null) {
          toast.info("Something Went Wrong!");
          return;
        }
        setIsExistingUser(exists);
        setValue("isExistingUser", exists);
      } catch (error) {
        toast.error("Error checking email existence");
      }
      return;
    }

    // Handle login or user creation
    try {
      // if (data.email == "owner@bestbakery.com" && data.password == "One@123") {
      //   navigate('/owner/vendors')
      //   return;
      // }
      const response = isExistingUser
        ? await loginUser({
            email: data.email,
            password: data.password,
          }).unwrap()
        : await createUser({
            user_details: { ...getDefaultUser(), ...userData },
          });

      if ("error" in response) {
        toast.error(response.error.data.message);
        return;
      }
      const { user, user_id, email, authcode, message, _id, role } =
        response?.data || {};

      const cartCookie = getCookie("cart", true);
      const cartOrder = cartCookie
        ? typeof cartCookie == "object"
          ? cartCookie
          : JSON.parse(cartCookie)
        : [];
      if (cartOrder.length > 0) {
        cartOrder?.forEach(async (element) => {
          const { addons, mainItem } = element;
          const productDetails = mainItem?.productDetails?.[0] ?? {};
          const newOrder = {
            user_id: _id,
            order_status: "PENDING",
            payment_status: "PENDING",
            location: mainItem?.location ?? {},
            pincode: 12345,
            delivery_details: {
              product_id: productDetails?._id,
              delivery_address: null,
              message_on_product: mainItem?.message_on_product ?? "",
              imgaes_on_product: mainItem?.imgaes_on_product ?? "",
              is_message: mainItem?.is_message,
              is_image: mainItem?.is_image,
              is_veg: mainItem?.is_veg,
              special_request: mainItem?.special_request ?? "",
              delivary_date: mainItem.shipping.delivary_date,
              shipping: mainItem.shipping,
              addOn:
                addons?.map((addOn) => ({
                  addOn_id: addOn?.id,
                  count: addOn?.quantity ?? 0,
                })) ?? [],
            },
          };
          try {
            const response = await createOrder(newOrder);
          } catch (error) {}
        });
      }

      setCookie("cart", [], true);
      setCookie("user", email);
      setCookie("user_id", user_id);
      setCookie("email", email);
      setCookie("authcode", authcode);
      setCookie("isAuth", true);
      setCookie("_id", _id);
      setCookie("role", role);

      const buyNow = getCookie("buynow", true);
      if (typeof buyNow == "object") {
        console.log(buyNow);
        const { addons, mainItem } = buyNow;
        const productDetails = mainItem?.productDetails?.[0] ?? {};
        const newOrder = {
          user_id: _id,
          order_status: "PENDING",
          payment_status: "PENDING",
          location: mainItem?.location ?? {},
          pincode: 12345,
          delivery_details: {
            product_id: productDetails?._id,
            delivery_address: null,
            message_on_product: mainItem?.message_on_product ?? "",
            imgaes_on_product: mainItem?.imgaes_on_product ?? "",
            is_message: mainItem?.is_message,
            is_image: mainItem?.is_image,
            is_veg: mainItem?.is_veg,
            special_request: mainItem?.special_request ?? "",
            delivary_date: mainItem.shipping.delivary_date,
            shipping: mainItem.shipping,
            addOn:
              addons?.map((addOn) => ({
                addOn_id: addOn?.id,
                count: addOn?.quantity ?? 0,
              })) ?? [],
          },
        };
        try {
          const response = await createOrder(newOrder);
          const order_id = response.data.data.order.order_id;
          setCookie("buynow", "", true);
          navigate(
            `/checkout/details/?orderid=${encodeURIComponent(order_id)}`
          );
          return;
        } catch (error) {}
      }

      toast.success(message || "Operation successful");
      if (role == "Vendor") {
        navigate("/admin/dashboard");
      } else if (role == "Owner") {
        navigate("/owner/vendors");
      } else {
        handleOnLogin({ data: response?.data });
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // Helper function to get default user detail s
  const getDefaultUser = () => ({
    username: "",
    email: "",
    password: "",
    name: "",
    mobile: "",
    dob: "",
    dateOfAnniversary: "",
    gender: "NA",
    address: "",
    pincode: "",
    city: "",
    country: "",
  });

  if (checkEmailLoading || isLoading || createOrderLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col ">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`shadow bg-white p-4 border-2 rounded-lg ${className}`}
        >
          <AnimatePresence>
            <motion.h3
              key={isExistingUser} // Ensures the animation triggers on text change
              className="text-left font-bold text-lg text-gray-800 mb-3"
              initial={{ x: 100, opacity: 0 }} // Slide in from the left
              animate={{ x: 0, opacity: 1 }} // Animate to original position
              exit={{ x: -100, opacity: 0 }} // Slide out to the right
              transition={{ duration: 0.3 }} // Adjust speed of the animation
            >
              {isExistingUser == null
                ? "Check Email Exist"
                : isExistingUser
                ? "Log In"
                : "Sign Up"}
            </motion.h3>
          </AnimatePresence>

          <div className="relative ">
            <input
              type="text"
              id="email"
              className={`block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 ${
                isExistingUser ? "border-green-600" : "border-slate-200"
              } appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer`}
              placeholder=" "
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email regex pattern
                  message: "Invalid email format",
                },
                onChange: () => {
                  if (isExistingUser === false) {
                    setIsExistingUser(null); // Reset isExistingUser to null
                  }
                },
              })}
              disabled={isExistingUser} // Disable the field if isExistingUser is true
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
              <>
                {/* <motion.div
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
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 7,
                        message: "Password must be at least 7 characters long",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                        message:
                          "Password must contain at least one uppercase letter and one special character",
                      },
                    })}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Password
                  </label>
                  {errors.password && (
                    <p className="text-left text-red-500 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </motion.div> */}
                <motion.div
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.3 }}
                  className="relative mt-4"
                >
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id={"password"}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer pr-10"
                      placeholder=" "
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 7,
                          message:
                            "Password must be at least 7 characters long",
                        },
                        pattern: {
                          value: /^(?=.*[A-Z]).*$/,
                          message:
                            "Password must contain at least one uppercase letter",
                        },
                      })}
                    />

                    {/* Password Visibility Toggle */}
                    <motion.button
                      type="button"
                      onClick={togglePasswordVisibility}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-2 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <AnimatePresence mode="wait">
                        {showPassword ? (
                          <motion.div
                            key="hide"
                            initial={{ opacity: 0, rotate: -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 180 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-6"
                            >
                              <path d="m15 18-.722-3.25" />
                              <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                              <path d="m20 15-1.726-2.05" />
                              <path d="m4 15 1.726-2.05" />
                              <path d="m9 18 .722-3.25" />
                            </svg>{" "}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="show"
                            initial={{ opacity: 0, rotate: 180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -180 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              stroke-linejoin="round"
                              className="size-6"
                            >
                              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    <label
                      htmlFor={"password"}
                      className="absolute left-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Password
                    </label>
                  </div>

                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-left text-red-500 text-xs mt-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </motion.div>
                {!isExistingUser && (
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
                          {...register("name", {
                            required: "Name is required",
                            maxLength: "25",
                          })}
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
                      {/* Country Code Dropdown */}
                      <div className="relative z-0 w-1/4">
                        <select
                          id="countryCode"
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                          {...register("countryCode", {
                            required: "Country code is required",
                          })}
                        >
                          <option value="+91">+91 IND</option>
                          <option value="+1">+1 USA</option>
                          <option value="+44">+44 UK</option>
                        </select>
                        {errors.countryCode && (
                          <p className="text-left text-red-500 text-xs">
                            {errors.countryCode.message}
                          </p>
                        )}
                      </div>

                      {/* Phone Number Input */}
                      <div className="relative z-0 w-3/4 ml-2">
                        <input
                          type="text"
                          id="mobile"
                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                          placeholder=" "
                          {...register("mobile", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10}$/, // Phone number must be exactly 10 digits
                              message: "Phone number must be exactly 10 digits",
                            },
                          })}
                        />
                        <label
                          htmlFor="mobile"
                          className="absolute left-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                          Phone
                        </label>
                        {errors.mobile && (
                          <p className="text-left text-red-500 text-xs">
                            {errors.mobile.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </AnimatePresence>

          <button
            // onClick={onSubmit}
            type="submit"
            className="mt-6 bg-orange-500 text-white py-2 px-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
          >
            Continue
          </button>
        </form>
      </FormProvider>
      <div class="relative flex py-5 items-center">
        <div class="flex-grow border-t border-gray-400"></div>
        <span class="flex-shrink mx-4 text-gray-400">OR</span>
        <div class="flex-grow border-t border-gray-400"></div>
      </div>
      <button
        aria-label="Sign in with Google"
        className="flex items-center gap-3 rounded-md p-0.5 pr-3 transition-colors duration-300 w-fit mx-auto"
        style={{ backgroundColor: "#1a73e8" }} // Google button blue
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#5195ee")
        } // Hover color
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#1a73e8")
        }
      >
        <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <title>Sign in with Google</title>
            <desc>Google G Logo</desc>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285f4" // Google logo blue
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34a853" // Google logo green
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#fbbc05" // Google logo yellow
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#ea4335" // Google logo red
            />
          </svg>
        </div>

        <span className="text-sm text-white tracking-wider">
          Sign in with Google
        </span>
      </button>
    </div>
  );
}

export default AccountAuth;
