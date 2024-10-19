import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";
import HeaderLayout from "../../../molecules/header/HeaderLayout";
import BasicButton2 from "../../../atom/button/BasicButton2";
import { useGetTicketQuery } from "../../../redux/apiSlices/admin/tickets";
import Modal from "../../../atom/popovers/Modal";
import Loader from "../../../atom/loader/loader";
import ModalWrapper from "../../../molecules/wrappers/ModalWrapper";
import TicketDetailsModal from "./modal/TicketDetailModal";

const MyTicket = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(subDays(new Date(), 1));
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [triggerApi, setTriggerApi] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const recordsPerPage = 10;

  const { data, isLoading } = useGetTicketQuery(
    triggerApi
      ? {
          startDate,
          endDate,
          refNo: searchTerm,
        }
      : undefined,
    {
      skip: !triggerApi, // Skip the query until the form is submitted
      refetchOnMountOrArgChange: true,
    }
  );

  // Pagination logic
  const totalTickets = data?.tickets?.length || 0;
  const totalPages = Math.ceil(totalTickets / recordsPerPage);
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = firstIndex + recordsPerPage;

  const currentTickets = useMemo(() => {
    return data?.tickets?.slice(firstIndex, lastIndex) || [];
  }, [data, firstIndex, lastIndex]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page
    setTriggerApi(true); // Trigger API call when form is submitted
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (data) {
      setTriggerApi(false); // Reset API trigger after fetching data
    }
  }, [data]);

  return (
    <>
      <HeaderLayout
        id={1}
        logoSrc="https://i.ibb.co/LPFC6F8/logoking.png"
        logoAlt="King Baker Logo"
        title="KING BAKER"
      >
        <motion.div className={`md:p-6 bg-gray-100`}>
          <div className="mb-6 flex flex-wrap gap-4">
            <form
              onSubmit={handleSearch}
              className="w-full flex flex-col sm:flex-row gap-4"
            >
              <div className="relative w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Search by ticket Reference Id"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-grow space-x-2">
                <input
                  type="date"
                  value={startDate.toISOString().split("T")[0]}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  value={endDate.toISOString().split("T")[0]}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <BasicButton2 type={"submit"} title={"Get Tickets"} />
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-300">
                <tr className="divide-x">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference Id
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sub-Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated At
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated By
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentTickets.map((ticket) => {
                  const chat = ticket?.chat?.[0] ?? {};
                  return (
                    <motion.tr
                      key={ticket.reference_number}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50 divide-x"
                    >
                      <td
                        className="px-4 py-4 whitespace-nowrap text-blue-600 hover:underline cursor-pointer"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        {ticket?.reference_number ?? ""}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {ticket?.sub_orderId ?? ""}
                      </td>
                      <td className="px-4 py-4">
                        {ticket?.query ?? ""}{" "}
                        {ticket?.subquery && `> ${ticket?.subquery}`}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ticket.status === "Closed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {ticket?.status ?? "open"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {ticket?.createdAt
                          ? format(new Date(ticket?.createdAt), "yyyy-MM-dd")
                          : ""}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {chat?.date
                          ? format(new Date(chat?.date), "yyyy-MM-dd")
                          : ""}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {chat?.Updated_By ?? ""}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-700">
                Showing {firstIndex + 1} to {Math.min(lastIndex, totalTickets)}{" "}
                of {totalTickets} tickets
              </span>
            </div>
            <div className="flex space-x-2">
              <BasicButton2
                className={"bg-blue-300 px-2"}
                title={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3                   py-1 border rounded-md ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <BasicButton2
                className={"bg-blue-300 px-2"}
                title={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </div>
          </div>
        </motion.div>
      </HeaderLayout>
      <ModalWrapper
        isOpen={selectedTicket !== null}
        onClose={() => setSelectedTicket(null)}
        height={"90vh"}
      >
        <TicketDetailsModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      </ModalWrapper>
      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
};

export default MyTicket;
