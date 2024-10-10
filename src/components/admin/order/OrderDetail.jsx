import React, { useMemo, useState } from "react";
import HeaderLayout from "../../../molecules/header/HeaderLayout";
import { twMerge } from "tailwind-merge";
import formatDate from "../../../atom/utils/formatDate";
import BasicButton from "../../../atom/button/BasicButton";
import { useUpdatePrintStatusMutation } from "../../../redux/apiSlices/admin/vendor";
import { toast } from "sonner";
import ChallanPDF from "../pdfs/challanPDF";
import ReactPDF from "@react-pdf/renderer";

const OrderDetailsCard = ({ order }) => {
  const [updatePrintStatus] = useUpdatePrintStatusMutation();
  const deliveryAddress = order?.deliveryAddresses?.[0] ?? {};
  const addOn = order?.addOn;
  const shipping = order?.shipping ?? {};
  const user = order?.user?.[0] ?? {};
  const productDetails = order?.productDetails?.[0];

  const printChallan = async () => {
    try {
      await updatePrintStatus({
        order_ids: [order.order_id],
        user_id: user?._id,
        vendor_id: "66f5347ec07df9ae95aae79c",
      });

      const blob = await ReactPDF.pdf(
        // <BrandingChallanPDF data={[orderData, orderData]} />
        <ChallanPDF data={[order]} />
      ).toBlob();

      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "CHALLAN.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // navigate("/admin/dashboard");
      // toast.success("All Selected Orders Accepted");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const totalPrice = useMemo(() => {
    const shipping_amount = parseFloat(order?.shipping?.shipping_amount) ?? 0;
    const itemPrice = parseFloat(order?.productDetails?.[0]?.prices) ?? 0;
    const addonPrice =
      order?.addOn?.length > 0
        ? order?.addOn?.reduce(
            (prev, curr) => {
              return (
                parseFloat(prev) +
                (parseFloat(curr?.price) ?? 0) *
                  (parseFloat(curr?.count?.count) ?? 0)
              );
            },
            [0]
          )
        : 0;
    console.log(shipping_amount, itemPrice, addonPrice);
    return (shipping_amount + itemPrice + addonPrice)?.toFixed(0);
  }, [order]);
  return (
    <HeaderLayout
      id={3}
      logoSrc="https://i.ibb.co/NYGqQxs/Screenshot-20240915-192128-Drive.jpg"
      logoAlt="King Baker Logo"
      title="KING BAKER"
    >
      <div className={`bg-white rounded-lg w-full shadow-lg p-6 mb-4 `}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {order.order_id}
            </h2>
            <span className="text-sm font-medium text-green-600">Accepted</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-gray-800">
              ₹{totalPrice}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                  clipRule="evenodd"
                />
              </svg>
              Time Details
            </h3>
            <p className="text-sm text-gray-600">
              Time Difference: {order.timeDifference}
            </p>
            <p className="text-sm text-gray-600">
              Allocation: {order.allocationTime}
            </p>
            <p className="text-sm text-gray-600">
              Acceptance: {order.acceptanceTime}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 mr-2"
              >
                <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 0 0 2 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 0 0 6.5 3ZM2 12v2.5A1.5 1.5 0 0 0 3.5 16h.041a3 3 0 0 1 5.918 0h.791a.75.75 0 0 0 .75-.75V12H2Z" />
                <path d="M6.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM13.25 5a.75.75 0 0 0-.75.75v8.514a3.001 3.001 0 0 1 4.893 1.44c.37-.275.61-.719.595-1.227a24.905 24.905 0 0 0-1.784-8.549A1.486 1.486 0 0 0 14.823 5H13.25ZM14.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
              Delivery Details
            </h3>
            <p className="text-sm text-gray-600">
              Date: {formatDate(shipping.delivary_date)}
            </p>
            <p className="text-sm text-gray-600">Mode: {shipping.method}</p>
            <p className="text-sm text-gray-600">Time: {shipping.time}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Order Items</h3>

          <div className="divide-y">
            <div
              className={twMerge(
                "flex items-center mb-1.5 py-1.5 px-3 rounded-lg border border-gray-800  "
              )}
            >
              <img
                src={
                  productDetails?.imageLink?.[0] ??
                  "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg"
                }
                alt={productDetails?.title ?? ""}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h4 className="font-medium text-gray-800">
                  {productDetails?.title ?? ""}
                </h4>
                <p className="text-sm text-gray-600">
                  {productDetails?.description ?? ""}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">
                  ₹{productDetails?.prices ?? 0}
                </p>
                <p className="text-sm text-gray-600">Qty: 1</p>
              </div>
            </div>
            {addOn?.map((addon, index) => (
              <div
                key={index}
                className={twMerge("flex items-center mb-1.5 py-1.5 px-3")}
              >
                <img
                  src={
                    addon?.image?.[0] ??
                    "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg"
                  }
                  alt={addon?.title ?? ""}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-800">
                    {addon?.title ?? ""}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {addon?.description ?? ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">
                    ₹{addon?.price ?? 0}
                  </p>
                  <p className="text-sm text-gray-600">
                    Qty: {addon?.count?.count ?? 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 mr-2"
              >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </svg>
              Recipient Details
            </h3>
            <p className="text-sm text-gray-800">
              {deliveryAddress?.recipientName ?? ""}
            </p>
            <p className="text-sm text-gray-600">
              {deliveryAddress?.recipientAddress ?? ""}
            </p>
            <p className="text-sm text-gray-600">
              {deliveryAddress?.recipientMobnumber ?? ""}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mr-2 size-5"
              >
                <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
              </svg>
              Sender Details
            </h3>
            <p className="text-sm text-gray-800">{user?.name ?? ""}</p>
            <p className="text-sm text-gray-800">{user?.mobile ?? ""}</p>
            <p className="text-sm text-gray-800">{user?.email ?? ""}</p>
          </div>
        </div>

        {order.personalizedImage && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mr-2 size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                  clipRule="evenodd"
                />
              </svg>
              Personalized Image
            </h3>
            <img
              src={order.personalizedImage}
              alt="Personalized"
              className=" h-48 w-fit rounded-lg"
            />
          </div>
        )}
        {/* {order.orderItem && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M9.25 3H3.5A1.5 1.5 0 0 0 2 4.5v4.75h3.365A2.75 2.75 0 0 1 9.25 5.362V3ZM2 10.75v4.75A1.5 1.5 0 0 0 3.5 17h5.75v-4.876A4.75 4.75 0 0 1 5 14.75a.75.75 0 0 1 0-1.5 3.251 3.251 0 0 0 3.163-2.5H2ZM10.75 17h5.75a1.5 1.5 0 0 0 1.5-1.5v-4.75h-6.163A3.251 3.251 0 0 0 15 13.25a.75.75 0 0 1 0 1.5 4.75 4.75 0 0 1-4.25-2.626V17ZM18 9.25V4.5A1.5 1.5 0 0 0 16.5 3h-5.75v2.362a2.75 2.75 0 0 1 3.885 3.888H18Zm-4.496-2.755a1.25 1.25 0 0 0-1.768 0c-.36.359-.526.999-.559 1.697-.01.228-.006.443.004.626.183.01.398.014.626.003.698-.033 1.338-.2 1.697-.559a1.25 1.25 0 0 0 0-1.767Zm-5.24 0a1.25 1.25 0 0 0-1.768 1.767c.36.36 1 .526 1.697.56.228.01.443.006.626-.004.01-.183.015-.398.004-.626-.033-.698-.2-1.338-.56-1.697Z"
                  clipRule="evenodd"
                />
              </svg>
              Addons
            </h3>

            
          </div>
        )} */}

        {order.message && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a2.5 2.5 0 0 0-4-3 2.5 2.5 0 0 0-4 3H3.25C2.56 6 2 6.56 2 7.25v.5C2 8.44 2.56 9 3.25 9h6V6h1.5v3h6C17.44 9 18 8.44 18 7.75v-.5C18 6.56 17.44 6 16.75 6H14Zm-1-1.5a1 1 0 0 1-1 1h-1v-1a1 1 0 1 1 2 0Zm-6 0a1 1 0 0 0 1 1h1v-1a1 1 0 0 0-2 0Z"
                  clipRule="evenodd"
                />
                <path d="M9.25 10.5H3v4.75A2.75 2.75 0 0 0 5.75 18h3.5v-7.5ZM10.75 18v-7.5H17v4.75A2.75 2.75 0 0 1 14.25 18h-3.5Z" />
              </svg>
              Message on Card
            </h3>
            <p className="text-sm text-gray-600 italic">"{order.message}"</p>
          </div>
        )}

        {order.specialInstructions && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Special Instructions
            </h3>
            <p className="text-sm text-gray-800">{order.specialInstructions}</p>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-6 ">
          <BasicButton
            className={`border border-gray-800 px-2 py-1 text-xs rounded-lg bg-pgreen`}
            onClick={printChallan}
          >
            Print Challan
          </BasicButton>
          {/* <BasicButton
            className={`border border-gray-800 px-2 py-1 text-xs rounded-lg bg-pgreen`}
            onClick={printBrandingChallan}
          >
            Print Branding Challan
          </BasicButton> */}
        </div>
      </div>
    </HeaderLayout>
  );
};
export default OrderDetailsCard;
