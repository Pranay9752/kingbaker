import React, { useState, useCallback, useEffect } from "react";
import { User, Mail, Phone, MapPin, Edit2 } from "lucide-react";
import getCookie from "../../atom/utils/getCookies";
import { useUpdateOrderMutation } from "../../redux/apiSlices/owner/order";
import { debounce } from "lodash";

const SenderDetailsForm = ({ orderIds }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: getCookie("email") ?? "",
    phone: "",
    location: `${getCookie("city")}, ${getCookie("region")}`,
  });

  const [updateOrder] = useUpdateOrderMutation();

  // Handler to update formData immediately
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Debounced function to send updates
  const debouncedUpdateOrder = debounce(async (updatedData) => {
    if (Array.isArray(orderIds) && orderIds.length > 0) {
      try {
        await Promise.all(
          orderIds.map((orderId) =>
            updateOrder({
              orderId,
              body: { sender_details: updatedData },
            })
          )
        );
      } catch (error) {
        console.error("Error updating order:", error);
      }
    }
  }, 1000);

  // Use useEffect to trigger the debounced update
  useEffect(() => {
    debouncedUpdateOrder(formData);

    return () => {
      debouncedUpdateOrder.cancel(); // Cleanup to prevent multiple calls
    };
  }, [formData]);

  return (
    <div className="bg-white md:shadow-lg rounded-md md:rounded-2xl p-6 max-w-2xl mx-auto mb-3 md:mt-3">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Sender's Details</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your contact information for order communications
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Name Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name === "undefined" ? "" : formData.name}
            onChange={handleInputChange}
            className="
              w-full 
              pl-10 
              pr-4 
              py-3 
              rounded-xl 
              border 
              border-gray-300 
              focus:border-blue-500 
              focus:ring-2 
              focus:ring-blue-200 
              transition 
              duration-300 
              text-gray-700
            "
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            defaultValue={formData.email === "undefined" ? "" : formData.email}
            onChange={handleInputChange}
            className="
              w-full 
              pl-10 
              pr-4 
              py-3 
              rounded-xl 
              border 
              border-gray-300 
              focus:border-blue-500 
              focus:ring-2 
              focus:ring-blue-200 
              transition 
              duration-300 
              text-gray-700
            "
          />
        </div>

        {/* Phone Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            defaultValue={formData.phone === "undefined" ? "" : formData.phone}
            onChange={handleInputChange}
            className="
              w-full 
              pl-10 
              pr-4 
              py-3 
              rounded-xl 
              border 
              border-gray-300 
              focus:border-blue-500 
              focus:ring-2 
              focus:ring-blue-200 
              transition 
              duration-300 
              text-gray-700
            "
          />
        </div>

        {/* Location Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            defaultValue={
              formData.location === "undefined" ? "" : formData.location
            }
            onChange={handleInputChange}
            className="
              w-full 
              pl-10 
              pr-4 
              py-3 
              rounded-xl 
              border 
              border-gray-300 
              focus:border-blue-500 
              focus:ring-2 
              focus:ring-blue-200 
              transition 
              duration-300 
              text-gray-700
            "
          />
        </div>
      </div>

      {/* Subtle Hint */}
      <div className="mt-4 text-sm text-gray-500 flex items-center">
        <Edit2 className="h-4 w-4 mr-2" />
        You can update your details anytime
      </div>
    </div>
  );
};

export default SenderDetailsForm;
