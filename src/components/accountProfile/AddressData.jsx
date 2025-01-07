import React, { useEffect, useState } from "react";
import {
  useAddAddressMutation,
  useGetAddressQuery,
} from "../../redux/apiSlices/ecom/checkoutApiSlice";
import AddressCard from "../../molecules/cards/AddressCard";
import ModalWrapper from "../../molecules/wrappers/ModalWrapper";
import { AddressForm } from "../product_detail/AddAddress";
import getCookie from "../../atom/utils/getCookies";
import Modal from "../../atom/popovers/Modal";
import Loader from '../../atom/loader/loader'
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
  const [reicipientAddress, setReicipientAddress] = useState([]);
  console.log('reicipientAddress: ', reicipientAddress);

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
      setReicipientAddress((prev) => {
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
      setReicipientAddress(data?.delivery_address ?? []);
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
          {reicipientAddress?.map((address, index) => (
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
          ))}
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

      {
        isLoading && <Modal>
        <Loader />
      </Modal>
      }
    </>
  );
};

export default AddressData;
