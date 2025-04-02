import React, { useState } from "react";
import TopNavbar from "../../molecules/header/TopNavBar";
import SEO from "../../atom/seo/SEO";

const TermsAndConditions = () => {
  const [activeTab, setActiveTab] = useState("products");

  const tabs = [
    { id: "products", label: "Products" },
    { id: "delivery", label: "Delivery" },
    { id: "options", label: "Delivery Options" },
    { id: "availability", label: "Availability" },
    { id: "peak", label: "Peak Season" },
    { id: "gifts", label: "Gifts" },
  ];

  return (
    <>
      <div className="min-h-screen ">
        <TopNavbar
          logo="/path/to/your/logo.png"
          title="logo"
          searchPlaceholder="Search flowers, cakes, gifts, etc."
          currencies={["INR", "USD", "EUR"]}
          deliveryLocationText="Select Delivery Location"
          franchiseEnquiriesText="Franchise Enquiries"
          corporateGiftsText="Corporate Gifts"
          moreOptions={[
            { label: "About Us", link: "/about" },
            { label: "Contact", link: "/contact" },
            { label: "FAQ", link: "/faq" },
          ]}
          userGreeting="Hi Guest"
        />
        <SEO title={"Terms & Condition"} />
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Terms & Conditions
            </h2>
            <p className="text-gray-600">
              Please read our terms carefully before placing an order
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-orange-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-orange-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            {activeTab === "products" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-orange-700 flex items-center">
                  <span className="bg-orange-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </span>
                  Products
                </h3>
                <ul className="pl-12 space-y-3 text-gray-700">
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      All products displayed on our website are subject to
                      availability and may change from time to time.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      In case of supply limitations, we reserve the right to
                      replace a product with one of equal value and quality
                      without prior notice.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      Some flowers and plants may be delivered in bud form to
                      ensure longer-lasting freshness.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      If we are unable to fulfill your order, either in full or
                      partially, we will notify you at the earliest and process
                      a full refund within 30 days of the intended delivery
                      date.
                    </p>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-orange-700 flex items-center">
                  <span className="bg-orange-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                      />
                    </svg>
                  </span>
                  Delivery
                </h3>
                <ul className="pl-12 space-y-3 text-gray-700">
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      By placing an order on our website, you agree to abide by
                      our terms and conditions.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      Order confirmation will be sent via email, and processing
                      will commence upon acceptance of the order.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      Courier deliveries follow standard schedules between 9 AM
                      – 7 PM and cannot be guaranteed at specific times.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      If delivery is not possible due to public holidays or
                      local restrictions, it will be scheduled for the next
                      working day.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      For modifications or cancellations, please contact us at
                      least 48 hours before the scheduled delivery via phone at
                      +91 7217250250 (8:00 AM - 11:00 PM) or email
                      support@kingbakers.in.
                    </p>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "options" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-orange-700 flex items-center">
                  <span className="bg-orange-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  Delivery Options
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold mr-2">
                        M
                      </div>
                      <h4 className="font-semibold text-orange-700">
                        Morning Delivery
                      </h4>
                    </div>
                    <p className="text-gray-600 pl-10">7:00 AM – 9:00 AM</p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold mr-2">
                        S
                      </div>
                      <h4 className="font-semibold text-orange-700">
                        Standard Delivery
                      </h4>
                    </div>
                    <p className="text-gray-600 pl-10">9:00 AM – 9:00 PM</p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-2">
                        F
                      </div>
                      <h4 className="font-semibold text-orange-700">
                        Fix Time Delivery
                      </h4>
                    </div>
                    <p className="text-gray-600 pl-10">
                      1 hour delivery from 10:00 AM – 10:00 PM
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold mr-2">
                        M
                      </div>
                      <h4 className="font-semibold text-orange-700">
                        Midnight Delivery
                      </h4>
                    </div>
                    <p className="text-gray-600 pl-10">11:00 PM – 11:59 PM</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-yellow-700">
                    While we make every effort to honor preferred delivery
                    times, they are not guaranteed and are subject to
                    feasibility.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "availability" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-orange-700 flex items-center">
                  <span className="bg-orange-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  Product Availability & Substitutions
                </h3>
                <ul className="pl-12 space-y-3 text-gray-700">
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      All listed products are subject to availability and may
                      change without prior notice.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      If an item is unavailable, we reserve the right to replace
                      it with a product of equal value and quality.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      Certain flowers and plants may be delivered in bud form to
                      ensure freshness and longevity.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      If we cannot fulfill your order or provide a suitable
                      alternative, we will notify you and issue a full refund
                      within 30 days of the scheduled delivery date.
                    </p>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "peak" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-orange-700 flex items-center">
                  <span className="bg-orange-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                  Peak Season & Delivery Attempts
                </h3>
                <ul className="pl-12 space-y-3 text-gray-700">
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      During high-demand periods such as festivals and special
                      events, real-time delivery confirmation may be delayed,
                      but our team ensures that orders are fulfilled at the
                      earliest.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      If the recipient is unavailable, the package may be left
                      with a neighbor, security personnel, or reception. Once
                      delivered, we are not responsible for any loss or damage.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      If the recipient's contact information is incorrect or
                      unresponsive, the delivery may not be completed, and the
                      recipient must collect the order from our delivery center
                      within 24 hours.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      If the recipient refuses to accept the delivery, the order
                      will be marked as "attempted delivery," and no refunds or
                      modifications will be processed.
                    </p>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "gifts" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-orange-700 flex items-center">
                  <span className="bg-orange-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                  </span>
                  Gifts Category & Shipping
                </h3>
                <ul className="pl-12 space-y-3 text-gray-700">
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      Items under the "GIFTS" category are shipped via Bluedart
                      or a similar courier service.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      Delivery times cannot be guaranteed, and shipping may take
                      3-5 business days, depending on the product and location.
                    </p>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold mr-3 flex-shrink-0">
                      •
                    </div>
                    <p>
                      If multiple products are ordered with different delivery
                      dates, perishable items (cakes, flowers) will be delivered
                      on the selected date, while other gifts will be shipped at
                      the earliest availability.
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Accept Terms Section */}
          {/* <div className="flex flex-col items-center">
            <div className="flex items-center mb-6">
              <input
                id="accept-terms"
                type="checkbox"
                className="w-5 h-5 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="accept-terms" className="ml-2 text-gray-700">
                I have read and agree to the Terms & Conditions
              </label>
            </div>

            <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-pink-500 text-white font-bold rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95">
              Accept & Continue
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
