import React, { memo, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Basicheader from "./header/Basicheader";
import Cookies from "js-cookie";
// import { useAddAddressMutation } from "../../redux/apiSlices/ecom/checkouApiSlice";
import getCookie from "../../atom/utils/getCookies";
import { useNavigate } from "react-router-dom";
import { useAddAddressMutation } from "../../redux/apiSlices/ecom/checkoutApiSlice";
import OrderDeliveryDetails from "./OrderDeliveryDetails";
import { useSelector } from "react-redux";

// Define a pattern for mobile number validation
const mobileNumberPattern = /^[0-9]{10}$/;

const schema = yup.object().shape({
  recipientName: yup.string().required("Recipient's Name is required"),
  recipientAddress: yup.string().required("Recipient's Address is required"),
  recipientMobile: yup
    .string()
    .required("Recipient's Mobile is required")
    .matches(mobileNumberPattern, "Invalid mobile number"),
  recipientAltMobile: yup
    .string()
    .notRequired()
    .matches(mobileNumberPattern, "Invalid mobile number"),
  recipientEmail: yup.string().email("Invalid email"),
  landmark: yup.string(),
});

const Card = memo(() => (
  <div className="flex px-3 gap-3">
    <img
      src="https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg"
      className="h-[75px] aspect-square object-fill rounded-lg"
      alt="Product"
    />
    <div className="text-left truncate pt-3">
      <h3 className="font-medium">Decorated Chocolate Truffle Cake Half Kg</h3>
      <p className="text-slate-500">575 x 1 No</p>
    </div>
  </div>
));

const InputField = ({
  id,
  label,
  register,
  errors,
  type = "text",
  boxClass = "",
}) => (
  <div className={`relative ${boxClass}`}>
    <input
      type={type}
      id={id}
      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
      placeholder=" "
      {...register(id)}
    />
    <label
      htmlFor={id}
      className="absolute left-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
    >
      {label}
    </label>
    {errors[id] && (
      <p className="text-left text-red-500 text-xs">{errors[id].message}</p>
    )}
  </div>
);

const SelectField = ({ id, label, register, options, hideLabel = false }) => (
  <div className="relative z-0 w-full">
    <select
      id={id}
      className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
      {...register(id)}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    <label
      htmlFor={id}
      className={`${
        hideLabel ? "hidden" : "absolute"
      } left-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4`}
    >
      {label}
    </label>
  </div>
);

const RadioButton = ({ id, label, register, value }) => (
  <div className="flex items-center">
    <input type="radio" id={id} value={value} {...register("addressType")} />
    <label htmlFor={id} className="ml-2 text-sm">
      {label}
    </label>
  </div>
);

export const AddressForm = ({ defaultValues, onSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full px-3 flex flex-col gap-2 pb-2"
      >
        <div className="grid grid-cols-[25%,calc(75%-8px)] gap-2 mt-4">
          <SelectField
            id="title"
            label="Title"
            register={register}
            options={[
              { value: "Mr", label: "Mr." },
              { value: "Mrs", label: "Mrs." },
              { value: "Ms", label: "Ms." },
              { value: "Dr", label: "Dr." },
            ]}
            hideLabel={true}
          />
          <InputField
            boxClass={``}
            id="recipientName"
            label="*Recipient Name"
            register={register}
            errors={errors}
          />
        </div>
        <InputField
          id="recipientAddress"
          label="*Recipient's Address"
          register={register}
          errors={errors}
        />
        <InputField
          id="landmark"
          label="Landmark"
          register={register}
          errors={errors}
        />
        <div className="flex gap-2 my-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            {Cookies.get("city")}, {Cookies.get("pincode")}
          </span>
        </div>
        <div className="grid grid-cols-[25%,calc(75%-8px)] gap-2">
          <SelectField
            id="countryCode"
            label="Country Code"
            register={register}
            options={[
              { value: "+91", label: "+91 IND" },
              { value: "+1", label: "+1 USA" },
              { value: "+44", label: "+44 UK" },
            ]}
            hideLabel={true}
          />
          <InputField
            id="recipientMobile"
            label="*Recipient's Mobile"
            register={register}
            errors={errors}
          />
        </div>
        <div className="grid grid-cols-[25%,calc(75%-8px)] gap-2">
          <SelectField
            id="altCountryCode"
            label="Alt Country Code"
            register={register}
            options={[
              { value: "+91", label: "+91 IND" },
              { value: "+1", label: "+1 USA" },
              { value: "+44", label: "+44 UK" },
            ]}
            hideLabel={true}
          />
          <InputField
            id="recipientAltMobile"
            label="Alternate Mobile"
            register={register}
            errors={errors}
          />
        </div>
        <InputField
          id="recipientEmail"
          label="Recipient Alt Email"
          register={register}
          errors={errors}
        />
        <div className="flex justify-between mt-4">
          <label className="text-sm">Address Type</label>
          <RadioButton
            id="home"
            label="Home"
            register={register}
            value="home"
          />
          <RadioButton
            id="work"
            label="Work"
            register={register}
            value="work"
          />
          <RadioButton
            id="other"
            label="Other"
            register={register}
            value="other"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-600 text-white py-2 mt-4 rounded-lg w-full focus:scale-95"
        >
          Add Address
        </button>
      </form>
    </FormProvider>
  );
};

function AddNewAddress({ selectedAddress }) {
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const orderData = useSelector((state) => state.order);
  console.log('orderData: ', orderData);

  const [addAddress, { isLoading, isError }] = useAddAddressMutation();
  const [defaultAddress, setDefaultAddress] = useState({
    title: "Mr",
    recipientName: "",
    recipientMobile: "",
    recipientAltMobile: "",
    recipientEmail: "",
    recipientAddress: "",
    countryCode: "+91",
    addressType: "home",
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleFormSubmit = (data) => {
    const newAddress = {
      user_id: getCookie("_id"),
      delivary_address: {
        pincode: getCookie("pincode"),
        city: "Mumbai",
        country: "India",
        landmark: data?.landmark ?? "",
        area: "Mumbai",
        addressType: data?.addressType ?? "home",
        recipientName: data?.recipientName ?? "",
        recipientMobnumber: data?.recipientMobile ?? "",
        alternateMobileNo: data?.recipientAltMobile ?? "",
        alternateEmail: data?.recipientEmail ?? "",
        recipientAddress: data?.recipientAddress ?? "",
        title: data?.title ?? "",
        countryCode: data?.countryCode ?? "",
      },
    };

    try {
      const response = addAddress(newAddress);
      // navigate("/checkout/details");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      setDefaultAddress(selectedAddress);
    }
  }, [selectedAddress]);

  return (
    <>
      <Basicheader num={2} title={"Add New Address"} />
      <section className="w-full mt-20 flex flex-col gap-3 border-b-2 pb-2">
        {/* <Card />
        <h3 className="text-left font-semibold text-slate-600 mt-3 mb-2 px-3">
          Addons
        </h3>
        {[...Array(3)].map((_, i) => (
          <Card key={i} />
        ))} */}
        {orderData?.map((order, index) => {
          return (
            <>
              <OrderDeliveryDetails
                className={"border-none shadow-none "}
                key={order?.mainItem?.id}
                index={index}
                addons={order?.addons ?? []}
                deliveryDetails={order?.deliveryDetails ?? {}}
                addresses={[]}
                mainItem={order?.mainItem ?? {}}
                occasion={order?.occasion ?? null}
                handleOccation={() => {}}
                viewOnly
              />
              <div className="border" />
            </>
          );
        })}
      </section>
      <AddressForm defaultValues={defaultAddress} onSubmit={handleFormSubmit} />
    </>
  );
}

export default memo(AddNewAddress);
