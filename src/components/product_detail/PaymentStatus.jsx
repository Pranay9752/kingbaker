import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useVerifyPaymentMutation } from "../../redux/apiSlices/ecom/checkoutApiSlice";

function PaymentStatus() {
  const { taxId } = useParams();
  const [verifyPayment, { data, isLoading, error }] =
    useVerifyPaymentMutation();
  const [isPostRequest, setIsPostRequest] = useState(false);

  const navigate = useNavigate();
  const txnData = data?.data || {};

  useEffect(() => {
    if (taxId) {
      const data = verifyPayment({ taxId });
    }
  }, [taxId, verifyPayment]);

  useEffect(() => {
    // Detect if the request was a POST request
    if (window.performance?.navigation?.type === 1) {
      // User refreshed the page, so it's a GET request now
      return;
    }

    if (window.history.length === 1) {
      // Browser history length of 1 indicates a direct entry (likely a POST)
      setIsPostRequest(true);
    }
  }, []);

    // If it's a POST request, submit a GET request using a hidden form
    if (isPostRequest) {
      return (
        <form method="GET" action={`/status/${taxId}`} id="redirectForm">
          <p>Redirecting...</p>
          <script>document.getElementById('redirectForm').submit();</script>
        </form>
      );
    }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Verifying payment...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we confirm your transaction
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSuccessful = txnData?.status?.toLowerCase() === "success";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {isSuccessful ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Payment Successful
            </h2>
            <p className="text-gray-600 mb-6">Thank you for your payment!</p>

            <div className="border-t border-b border-gray-200 py-4 my-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold">₹{txnData.amt}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-semibold">{txnData.txnid}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Payment Mode:</span>
                <span className="font-semibold">
                  {txnData.mode} ({txnData.App_Name || "N/A"})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">
                  {new Date(txnData.addedon).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 mr-2"
            >
              Okay!
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-6">
              Sorry, your payment could not be processed.
            </p>

            <div className="border-t border-b border-gray-200 py-4 my-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-semibold">{txnData.txnid || "N/A"}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Error Message:</span>
                <span className="font-semibold text-red-500">
                  {txnData.error_Message || "Unknown error"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">
                  {txnData.addedon
                    ? new Date(txnData.addedon).toLocaleString()
                    : "N/A"}
                </span>
              </div>
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 mr-2">
              Try Again
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition duration-200">
              Contact Support
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentStatus;
