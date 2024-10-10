import React, { useState } from "react";
import { useGetSalesmanQuery } from "../../../redux/apiSlices/admin/delivery-boy";
import Select from "react-select";
import BasicButton from "../../../atom/button/BasicButton";
import { toast } from "sonner";
import { useAssignDeliveryBoysMutation } from "../../../redux/apiSlices/admin/vendor";

function AllocateDeliveryBoy({ selectedOrders, onClose }) {
  const { data, isLoading } = useGetSalesmanQuery();
  console.log("data: ", data);
  const [selectedSalesman, setSelectedSalesman] = useState(null);
  const [assignDeliveryBoys] = useAssignDeliveryBoysMutation();
  const salesmanOptions =
    data?.salesman
      ?.filter((item) => item?.isActive)
      ?.map((s) => ({
        value: s,
        label: `${s.name} (${s.username})`,
      })) || [];

  const handleSalesmanSelect = (selectedOption) => {
    setSelectedSalesman(selectedOption?.value);
  };

  const handleSave = async () => {
    if (selectedOrders?.length == 0) return;
    if (selectedSalesman) {
      try {
        selectedOrders?.forEach(async (item) => {
          await assignDeliveryBoys({
            order_id: item,
            salesman_id: selectedSalesman?._id,
          });
        });
        toast.success("Orders Allocated Successfully");
        onClose();
      } catch (error) {}
      toast.error("Low Internet Connection!");
    } else {
      toast.info("Please select a salesman before saving");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col gap-2 md:justify-between">
      <div className="flex justify-between items-center">
        <h3 className="font-bold ">Allocate Delivery Boy</h3>
        <svg
        onClick={() => onClose()}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </div>
      <Select
        options={salesmanOptions}
        onChange={handleSalesmanSelect}
        placeholder="Select a salesman"
        isClearable
        isSearchable
      />

      <BasicButton
        onClick={handleSave}
        disabled={!selectedSalesman}
        className={`border border-gray-800 px-2 py-1 text-xs rounded-lg bg-pgreen md:mt-3 mt-auto`}
      >
        Alocate
      </BasicButton>
    </div>
  );
}

export default AllocateDeliveryBoy;
