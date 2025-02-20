import React, { useEffect, useState } from "react";
import {
  useAddAddressMutation,
  useGetAddressQuery,
} from "../../redux/apiSlices/ecom/checkoutApiSlice";
import ModalWrapper from "../../molecules/wrappers/ModalWrapper";
import { AddressForm } from "../product_detail/AddAddress";
import getCookie from "../../atom/utils/getCookies";
import Modal from "../../atom/popovers/Modal";
import Loader from "../../atom/loader/loader";
import { Pencil, Home, Building2, MapPin } from "lucide-react";

const AddressCard = ({ address, onSelect, onEdit, isShow = false }) => {
  const getAddressTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "home":
        return <Home className="h-4 w-4" />;
      case "office":
        return <Building2 className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative group hover:shadow-lg transition-all duration-300 bg-white rounded-lg border border-gray-200">
      <div className="p-4">
        {!isShow && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <input
              type="radio"
              id={address?._id}
              name="address"
              value={address?._id}
              onChange={() => onSelect(address?._id)}
              className="h-4 w-4 accent-blue-600 cursor-pointer"
            />
          </div>
        )}

        <div className={`flex flex-col gap-3 ${!isShow ? "ml-8" : ""}`}>
          {/* Header with name and phone */}
          <div className="flex items-center gap-2 text-gray-900">
            <span className="font-medium">{address?.recipientName}</span>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />
            <span className="font-medium">
              {address?.recipientMobnumber ?? address?.recipientMobile}
            </span>
          </div>

          {/* Custom badge for address type */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              {getAddressTypeIcon(address?.addressType)}
              <span className="text-xs font-medium">
                {address?.addressType}
              </span>
            </div>
          </div>

          {/* Full address */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {address?.recipientAddress}, {address?.area}, {address?.city} -{" "}
            {address?.pincode}
          </p>
        </div>

        {/* Edit button */}
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <Pencil className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

const Default = {
  title: "Mr",
  recipientName: "",
  recipientMobile: "",
  recipientAltMobile: "",
  recipientEmail: "",
  recipientAddress: "",
  countryCode: "+91",
  addressType: "home",
};
const AddressData = () => {
  const { data } = useGetAddressQuery();
  const [addAddress, { isLoading, isError }] = useAddAddressMutation();
  const [recipientAddress, setRecipientAddress] = useState([]);

  const [openAddAddress, setOpenAddAddress] = useState(false);

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
  const onAddAddress = (data) => {
    const newAddress = {
      user_id: getCookie("_id"),
      _id: data?._id ?? null,
      delivery_address: {
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
      setRecipientAddress((prev) => {
        const newArr = [...prev];
        const addressIndex = newArr.findIndex(
          (item) => item?._id === data?._id
        );
        if (addressIndex == -1) {
          return [...newArr, data];
        } else {
          newArr[addressIndex] = data;
          return newArr;
        }
      });
      setDefaultAddress(Default);
      setOpenAddAddress(false);
      // navigate("/checkout/details");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      console.log("data: ", data?.delivery_address);
      const addressess = data?.delivery_address?.map((item) => ({
        ...item,
        recipientEmail: item?.alternateEmail || "",
        recipientMobile: item?.recipientMobnumber || "",
        recipientAltMobile: item?.alternateMobileNo || "",
      })) || [];
      setRecipientAddress(addressess);
    }
  }, [data]);
  return (
    <>
      <div className="flex flex-col justify-start items-start gap-5">
        <div className="pt-3 ml-auto">
          <button
            type="button"
            onClick={() => setOpenAddAddress(true)}
            className="w-fit inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs md:text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add New Address
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipientAddress?.map((address, index) =>
            !!address ? (
              <AddressCard
                key={address?._id}
                isShow={true}
                address={address}
                onSelect={(id) => console.log(`Selected address: ${id}`)} // Handle the radio selection
                onEdit={() => {
                  setDefaultAddress(address);
                  setOpenAddAddress(true);
                }} // Handle edit
              />
            ) : (
              <></>
            )
          )}
        </div>
      </div>
      <ModalWrapper
        isOpen={openAddAddress}
        onClose={(e) => {
          setOpenAddAddress(false), setDefaultAddress(Default);
        }}
        maxHeight={"101vh"}
        className={`p-3 text-gray-800`}
      >
        <AddressForm defaultValues={defaultAddress} onSubmit={onAddAddress} />{" "}
      </ModalWrapper>

      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
};

export default AddressData;
