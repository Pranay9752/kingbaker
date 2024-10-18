import React from "react";
import { useForm } from "react-hook-form";
import BasicButton2 from "../../../atom/button/BasicButton2";
import { toast } from "sonner";
import { useCreateTicketMutation } from "../../../redux/apiSlices/admin/tickets";

const RaiseTicket = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const onSubmit = (data) => {
    console.log(data);

    const body = {
      sub_orderId: data?.subOrderId,
      query: data?.queryType,
      subquery: "Delayed delivery",
      status: "open",
      chat: [
        {
          Updated_By: "By You",
          user_name: "shubham",
          text: data?.question,
          document: "",
        },
      ],
    };
    createTicket({ body })
      .then(() => {
        toast.success("Ticket Raised Successfully");
      })
      .catch(() => {
        toast.error("Something went Wrong!");
      });
    onClose();
    // Handle form submission
  };

  return (
    <>
      <h2 className="text-2xl text-left font-bold mb-2 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>
        Talk To Us
        <svg
          onClick={onClose}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer text-gray-600 hover:text-black hover:size-7 ml-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </h2>
      <p className="text-gray-600 text-left">
        Our dedicated staff will respond within a short time
      </p>
      <p className="text-gray-600 mb-6 text-left">
        Note: Please select the exact query type
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="subOrderId" className="block text-gray-700 mb-2">
            SubOrder Id
          </label>
          <input
            type="text"
            id="subOrderId"
            {...register("subOrderId")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="queryType" className="block text-gray-700 mb-2">
            Query Type *
          </label>
          <select
            id="queryType"
            {...register("queryType", { required: "Query type is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="vendorRelated">Vendor Related Issue</option>
            <option value="productSlotRelated">
              Product/Slot Related Issues
            </option>
            <option value="partnerAccounts">
              Partner - Accounts Related Issues
            </option>
            <option value="partnerHandicraft">
              Partner - Handicraft/Supply Chain Related Issues
            </option>
            <option value="partnerRetail">Partner - Retail Issues</option>
            <option value="partnerOperations">
              Partner - Operation Related Issues
            </option>
          </select>
          {errors.queryType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.queryType.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 mb-2">
            Question *
          </label>
          <textarea
            id="question"
            {...register("question", { required: "Question is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          ></textarea>
          {errors.question && (
            <p className="text-red-500 text-sm mt-1">
              {errors.question.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="attachments" className="block text-gray-700 mb-2">
            Attach Documents
          </label>
          <input
            type="file"
            id="attachments"
            multiple
            {...register("attachments")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
        >
          Submit
        </button> */}
        <div className="flex gap-2">
          <BasicButton2
            className={"w-full text-center py-2 bg-red-400 hover:opacity-85"}
            title={"Cancel"}
            onClick={onClose}
          />
          <BasicButton2
            type={"submit"}
            className={"w-full text-center py-2 hover:opacity-85 "}
            title={"Submit"}
            onClick={() => {}}
          />
        </div>
      </form>
    </>
  );
};

export default RaiseTicket;
