import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useUpdateOrderByOwnerMutation } from "../../../redux/apiSlices/owner/order";
import DeliveryDateSelector from "../../../molecules/DeliveryDateSelector";
import BasicButton from "../../../atom/button/BasicButton";

function UpdateOrderModal({ data, onClose }) {
  const [updateOrderByOwner, { isLoading }] = useUpdateOrderByOwnerMutation();
  const methods = useForm({});

  // State to manage add-ons
  const [addons, setAddons] = useState(data?.addOn || []);

  // Update local state with data on component mount or when data changes
  useEffect(() => {
    setAddons(data?.addOn || []);
  }, [data]);

  // Increment add-on count
  const incrementCount = (index) => {
    setAddons((prevAddons) =>
      prevAddons.map((addon, i) =>
        i === index
          ? { ...addon, count: { count: (addon?.count?.count ?? 0) + 1 } }
          : addon
      )
    );
  };

  // Decrement add-on count
  const decrementCount = (index) => {
    setAddons((prevAddons) =>
      prevAddons.map((addon, i) =>
        i === index && addon?.count?.count > 1
          ? { ...addon, count: { count: (addon?.count?.count ?? 1) - 1 } }
          : addon
      )
    );
  };

  // Delete add-on
  const deleteAddon = (index) => {
    setAddons((prevAddons) => prevAddons.filter((_, i) => i !== index));
  };

  const onSubmit = async (value) => {
    console.log("value: ", value);
    const orderData = {
      ...value,
      addOn: addons,
      delivery_date: value.delivery_date,
    };
    console.log("orderData: ", orderData);

    try {
      //   await updateOrderByOwner({
      //     orderId: data.order_id,
      //     ownerId: data.owner_id,
      //     vendorId: data.vendor_id,
      //     data: orderData,
      //   });
      //   onClose();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const addAddons = () => {};

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-300 mb-5 flex gap-2 items-center">
        Update Order ({data?.order_id ?? ""})
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <DeliveryDateSelector darkMode isUpdate />
          <div className="bg-[#1a1f25] rounded-lg">
            <h3>Add-ons</h3>
            {addons.map((addon, index) => (
              <div
                key={addon._id}
                className="flex items-center mb-2 border-b border-gray-600 pb-3"
              >
                <img
                  src={addon?.image?.[0] ?? ""}
                  alt={addon?.title ?? ""}
                  onError={(e) =>
                    (e.target.src =
                      "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg")
                  }
                  className="w-[75px] h-[75px] object-cover rounded-md mr-2"
                />
                <div>
                  <p className="text-[14px]">{addon?.title ?? ""}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <p className="text-[13px]">
                      ₹{addon?.price ?? 0} x {addon?.count?.count ?? 0}
                    </p>
                    <div className="flex rounded-md overflow-hidden divide-x border">
                      <button
                        type="button"
                        className="bg-[#555555]/20 p-1"
                        onClick={() => decrementCount(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <p className="text-[13px] w-8 text-center">
                        {addon?.count?.count ?? 0}
                      </p>
                      <button
                        type="button"
                        className="bg-[#555555]/20 p-1"
                        onClick={() => incrementCount(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteAddon(index)}
                  className="ml-auto text-gray-600 border rounded border-gray-600 hover:bg-gray-300 text-sm px-1 py-0.5"
                >
                  DELETE
                </button>
              </div>
            ))}
            <BasicButton
              type="button"
              className="border-gray-300 w-full text-gray-300 px-4 py-2 bg-orange-800/50 rounded-lg"
              onClick={addAddons}
            >
              Add Addons
            </BasicButton>
          </div>
          <div className="flex justify-end items-center gap-3">
            <BasicButton
              type="button"
              className="border-gray-300 text-gray-300 px-4 py-2 bg-red-800/50 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </BasicButton>
            <BasicButton
              type="submit"
              className="border-gray-300 text-gray-300 px-4 py-2 bg-green-800/50 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Order"}
            </BasicButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default UpdateOrderModal;
