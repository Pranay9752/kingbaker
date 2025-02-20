import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";

import Basicheader from "./header/Basicheader";

import {
  useGetAddressQuery,
  useGetCartItemQuery,
  usePlaceOrderMutation,
} from "../../redux/apiSlices/ecom/checkoutApiSlice";
import CheckoutCard from "../../molecules/cards/CheckoutCard";
import SecurePaymentCard from "../../molecules/cards/SecurePaymentCard";
import { toast } from "sonner";
import setCookie from "../../atom/utils/setCookies";
import { addInit } from "../../redux/slices/ecom/orderSlice";
import createOrderAnimationData from "./create_order_animation.json";
import Lottie from "lottie-react";
import SEO from "../../atom/seo/SEO";
const PaymentOptions = ({ orderIds = [], totalPrice = 0 }) => {
  const [selectedOption, setSelectedOption] = useState("cod");
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [placeOrder] = usePlaceOrderMutation();
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (orderIds?.length == 0) {
      toast.info("No Order available to place!");
      return;
    }
    try {
      setIsLoading(true);

      Array.isArray(orderIds) &&
        orderIds.forEach(async (item, index) => {
          await placeOrder({ order_id: item }).unwrap();
          index == 0 &&
            toast.success("Order added successfully with order id: " + item);
        });

      setCookie("cart", [], true);
      dispatch(addInit([]));
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = "/";
      }, 5000);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
     {loading && (
        <div className="fixed inset-0 bg-black/30 z-50  flex justify-center items-center">
          <Lottie className="size-[600px]" animationData={createOrderAnimationData} loop={false} />
        </div>
      )}
      <div className="w-full p-3">
        <div className="w-full space-y-4">
          {/* Wallets Option */}
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="cod"
              name="paymentOption"
              checked={selectedOption === "cod"}
              onChange={() => handleOptionChange("cod")}
              className="form-radio text-orange-500"
            />
            <label htmlFor="cod" className="font-medium">
              Pay
            </label>
          </div>
          {selectedOption === "cod" && (
            <div className="ml-6 space-y-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-orange-500 text-white py-2 rounded"
              >
                PAY ₹{totalPrice}
              </button>
            </div>
          )}

          {/* UPI Option */}
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="upi"
              name="paymentOption"
              checked={selectedOption === "upi"}
              onChange={() => handleOptionChange("upi")}
              className="form-radio text-orange-500"
            />
            <label htmlFor="upi" className="font-medium">
              UPI
            </label>
          </div>
          {selectedOption === "upi" && (
            <div className="ml-6 space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2 border border-gray-300 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-200 mb-2"></div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded">
                    Show QR
                  </button>
                </div>
                <div className="w-1/2 flex flex-col justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-8 h-8 text-blue-500 mb-2"
                  >
                    <path d="M8 16.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z" />
                    <path
                      fillRule="evenodd"
                      d="M4 4a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4Zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75V2.5h1A1.5 1.5 0 0 1 14.5 4v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 16V4A1.5 1.5 0 0 1 7 2.5h1Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="text-sm">
                    Scan QR code with any upi app to proceed with payment of ₹
                    {totalPrice}
                  </p>
                </div>
              </div>
              <div className="text-center text-gray-500">Or</div>
              <input
                type="text"
                placeholder="Enter UPI ID: (Ex. 99XXXXXX99@icici)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <button className="w-full bg-orange-500 text-white py-2 rounded">
                PAY ₹ {totalPrice}
              </button>
            </div>
          )}

          {/* Credit/Debit Card Option */}
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="card"
              name="paymentOption"
              checked={selectedOption === "card"}
              onChange={() => handleOptionChange("card")}
              className="form-radio text-orange-500"
            />
            <label htmlFor="card" className="font-medium">
              Credit/Debit Card
            </label>
          </div>
          {selectedOption === "card" && (
            <div className="ml-6 space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Name On Card"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-1/3 border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-1/3 border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button className="w-full bg-orange-500 text-white py-2 rounded">
                PAY ₹ {totalPrice}
              </button>
            </div>
          )}

          {/* Wallets Option */}
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="wallets"
              name="paymentOption"
              checked={selectedOption === "wallets"}
              onChange={() => handleOptionChange("wallets")}
              className="form-radio text-orange-500"
            />
            <label htmlFor="wallets" className="font-medium">
              Wallets
            </label>
            <span className="text-red-500 text-sm">• Offers Available</span>
          </div>
          {selectedOption === "wallets" && (
            <div className="ml-6 space-y-4">
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 border border-gray-300 rounded p-2 w-1/3">
                  <input
                    type="radio"
                    name="wallet"
                    className="form-radio text-orange-500"
                  />
                  <span>Airtel</span>
                </label>
                <label className="flex items-center space-x-2 border border-gray-300 rounded p-2 w-1/3">
                  <input
                    type="radio"
                    name="wallet"
                    className="form-radio text-orange-500"
                  />
                  <span>OLAMONEY</span>
                </label>
                <label className="flex items-center space-x-2 border border-gray-300 rounded p-2 w-1/3">
                  <input
                    type="radio"
                    name="wallet"
                    className="form-radio text-orange-500"
                  />
                  <span>Pay</span>
                </label>
              </div>
              <button className="w-full bg-orange-500 text-white py-2 rounded">
                PAY ₹{totalPrice}
              </button>
            </div>
          )}

          {/* Net Banking Option */}
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="netbanking"
              name="paymentOption"
              checked={selectedOption === "netbanking"}
              onChange={() => handleOptionChange("netbanking")}
              className="form-radio text-orange-500"
            />
            <label htmlFor="netbanking" className="font-medium">
              Net Banking
            </label>
          </div>
          {selectedOption === "netbanking" && (
            <div className="ml-6 space-y-4">
              <p className="font-medium">POPULAR BANKS</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  "AXIS BANK",
                  "Standard Chartered",
                  "HDFC BANK",
                  "ICICI Bank",
                  "Kotak",
                  "SBI",
                ].map((bank) => (
                  <label
                    key={bank}
                    className="flex items-center space-x-2 border border-gray-300 rounded p-2"
                  >
                    <input
                      type="radio"
                      name="bank"
                      className="form-radio text-orange-500"
                    />
                    <span>{bank}</span>
                  </label>
                ))}
              </div>
              <p className="font-medium">ALL BANKS</p>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>Select Bank</option>
              </select>
              <button className="w-full bg-orange-500 text-white py-2 rounded">
                PAY ₹ {totalPrice}
              </button>
            </div>
          )}
        </div>
      </div>
     
    </>
  );
};

const PriceDetails = ({
  totalPrice,
  totalAddonPrice = 0,
  totalitemPrice = 0,
  totalShipping = 0,
}) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md max-w-sm border">
      <h2 className="text-lg font-semibold mb-4">PRICE DETAILS</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total Product Price</span>
          <span>₹ {totalitemPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹ {totalShipping}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Addon Charge</span>
          <span>₹ {totalAddonPrice}</span>
        </div>
        {/* <div className="flex justify-between text-green-600">
          <span>
            Donate ₹10 to CIRY{" "}
            <span className="text-blue-500 cursor-pointer">ⓘ</span>
          </span>
          <span>₹10</span>
        </div> */}
      </div>
      <div className="border-t border-gray-200 my-4"></div>
      <div className="flex justify-between font-semibold">
        <span>TOTAL</span>
        <span>
          ₹{" "}
          {(
            (totalitemPrice || 0) +
            (totalShipping || 0) +
            (totalAddonPrice || 0)
          )?.toLocaleString("en-IN") ?? 0}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-4">
        By continuing you agree to our T&C/Disclaimer
      </p>
    </div>
  );
};

function CheckOutPayment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCartItemQuery();

  const handleBuyNowData = (orderData) => {
    const orderId = searchParams.get("orderid");
    if (!orderId || orderId == "") {
      return orderData || [];
    }
    return (
      orderData?.filter((item) => item?.mainItem.order_id === orderId) || []
    );
  };
  const orderIds = useMemo(() => {
    return Array.isArray(data?.data?.delivery_details)
      ? handleBuyNowData(data?.data?.delivery_details || []).map(
          (item) => item?.mainItem?.order_id
        )
      : [];
  }, [data?.data, searchParams.get("orderid")]);

  const totalPrice = useMemo(() => {
    const totalAddons = handleBuyNowData(
      data?.data?.delivery_details || []
    )?.reduce((prev, curr) => {
      const itemPrice = curr?.mainItem?.productDetails?.[0]?.prices ?? 0;
      let addonPrice = 0;
      curr?.addOn?.forEach((element) => {
        addonPrice =
          addonPrice + (element?.price ?? 0) * (element?.count?.count ?? 0);
      });

      return prev + itemPrice + addonPrice;
    }, 0);
    return totalAddons;
  }, [data, searchParams.get("orderid")]);

  const totalShipping =
    handleBuyNowData(data?.data?.delivery_details || [])?.reduce((acc, cur) => {
      return acc + (cur?.mainItem?.shipping?.shipping_amount ?? 0);
    }, 0) ?? 0;

  const totalAddonPrice =
    handleBuyNowData(data?.data?.delivery_details || [])?.reduce((acc, cur) => {
      let totalprice = 0;

      cur?.addOn?.forEach((item) => {
        totalprice += (item?.price || 0) * (item?.count?.count || 0);
      });
      return acc + totalprice;
    }, 0) ?? 0;
  const totalitemPrice = useMemo(() => {
    const totalAddons = handleBuyNowData(
      data?.data?.delivery_details || []
    )?.reduce((prev, curr) => {
      return prev + (curr?.mainItem?.productDetails?.[0]?.prices ?? 0);
    }, 0);
    return totalAddons;
  }, [data, searchParams.get("orderid")]);

  useEffect(() => {
    if (window.innerWidth > 768) document.body.classList.add("bg-[#f2f2f2]");
    return () => {
      if (window.innerWidth > 768)
        document.body.classList.remove("bg-[#f2f2f2]");
    };
  }, []);

  return (
    <>
      <Basicheader num={2} title={"Payment Details"} />
      <SEO title={'Checkout'} />

      <div className="hidden md:flex justify-center items-start gap-4 py-20 mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-4 overflow-y-auto h-[90vh] hide-scrollbar">
          {/* Card 1 */}
          <CheckoutCard stepNumber={2} title="LOGIN / REGISTER" done={true} />

          {/* Card 2 */}
          <CheckoutCard stepNumber={2} title="ORDER & DELIVERY DETAILS" done />

          <CheckoutCard stepNumber={3} title="PAYMENT OPTIONS">
            <PaymentOptions
              orderIds={orderIds}
              totalPrice={
                (totalitemPrice || 0) +
                  (totalShipping || 0) +
                  (totalAddonPrice || 0) ?? 0
              }
            />
          </CheckoutCard>
        </div>
        <div className="sticky">
          <PriceDetails
            orderIds={orderIds}
            totalAddonPrice={totalAddonPrice}
            totalPrice={totalPrice}
            totalitemPrice={totalitemPrice}
            totalShipping={totalShipping}
          />
          <SecurePaymentCard />
        </div>
      </div>
      <div className="md:hidden flex flex-col gap-4 mt-20 justify-start items-center w-full">
        <PriceDetails
          orderIds={orderIds}
          totalAddonPrice={totalAddonPrice}
          totalPrice={totalPrice}
          totalShipping={totalShipping}
          totalitemPrice={totalitemPrice}
        />
        <PaymentOptions
          orderIds={orderIds}
          totalPrice={
            (totalitemPrice || 0) +
              (totalShipping || 0) +
              (totalAddonPrice || 0) ?? 0
          }
        />
        <SecurePaymentCard />
      </div>
    </>
  );
}

export default CheckOutPayment;
