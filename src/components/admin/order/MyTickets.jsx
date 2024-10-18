import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, parseISO, isWithinInterval } from "date-fns";
import HeaderLayout from "../../../molecules/header/HeaderLayout";
import BasicButton2 from "../../../atom/button/BasicButton2";

const dummyData = [
  {
    id: "240930-04536548",
    subOrderId: "5624440991",
    subject: "Product/Slot Related Issues > Product Substitution - Handicraft",
    status: "Closed",
    createdAt: "2024-09-30",
    lastUpdatedAt: "2024-09-30 12:06:03",
    lastUpdatedBy: "taneesha.kesarwani@cc.fnp.com",
  },
  {
    id: "240930-04537267",
    subOrderId: "5624440991",
    subject: "Vendor Related Issue - Delivery Charges Increase",
    status: "Closed",
    createdAt: "2024-09-30",
    lastUpdatedAt: "2024-09-30 12:28:03",
    lastUpdatedBy: "taneesha.kesarwani@cc.fnp.com",
  },
  {
    id: "240930-04536412",
    subOrderId: "5624470001",
    subject: "Product/Slot Related Issues > Product Substitution - Handicraft",
    status: "Closed",
    createdAt: "2024-09-30",
    lastUpdatedAt: "2024-09-30 10:47:54",
    lastUpdatedBy: "taneesha.kesarwani@cc.fnp.com",
  },
  {
    id: "240930-04537412",
    subOrderId: "5624470001",
    subject: "Vendor Related Issue - Delivery Charges Correction",
    status: "Closed",
    createdAt: "2024-09-30",
    lastUpdatedAt: "2024-09-30 12:14:09",
    lastUpdatedBy: "dimple.prakash@cc.fnp.com",
  },
  {
    id: "240930-04538774",
    subOrderId: "5624470001",
    subject: "Vendor Related Issue - Delivery Charges Increase",
    status: "Open",
    createdAt: "2024-09-30",
    lastUpdatedAt: "2024-09-30 16:10:25",
    lastUpdatedBy: "kailash.tanwar@cc.fnp.com",
  },
  {
    id: "240930-04536548",
    subOrderId: "5624440991",
    subject: "Product/Slot Related Issues > Product Substitution - Handicraft",
    status: "Closed",
    createdAt: "2024-09-30",
    lastUpdatedAt: "2024-09-30 12:06:03",
    lastUpdatedBy: "taneesha.kesarwani@cc.fnp.com",
  },
  {
    id: "240930-04537267",
    subOrderId: "5624440991",
    subject: "Vendor Related Issue - Delivery Charges Increase",
    status: "Closed",
    createdAt: "2024-09-30",
    lastUpdatedAt: "2024-09-30 12:28:03",
    lastUpdatedBy: "taneesha.kesarwani@cc.fnp.com",
  },
  {
    id: "240930-04536412",
    subOrderId: "5624470001",
    subject: "Product/Slot Related Issues > Product Substitution - Handicraft",
    status: "Closed",
    createdAt: "2024-09-30",
    lastUpdatedAt: "2024-09-30 10:47:54",
    lastUpdatedBy: "taneesha.kesarwani@cc.fnp.com",
  },
  {
    id: "240930-04537412",
    subOrderId: "5624470001",
    subject: "Vendor Related Issue - Delivery Charges Correction",
    status: "Closed",
    createdAt: "2024-09-30",
    lastUpdatedAt: "2024-09-30 12:14:09",
    lastUpdatedBy: "dimple.prakash@cc.fnp.com",
  },
  {
    id: "240930-04538774",
    subOrderId: "5624470001",
    subject: "Vendor Related Issue - Delivery Charges Increase",
    status: "Open",
    createdAt: "2024-09-30",
    lastUpdatedAt: "2024-09-30 16:10:25",
    lastUpdatedBy: "kailash.tanwar@cc.fnp.com",
  },
];

const MyTicket = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTickets, setFilteredTickets] = useState(dummyData);

  const recordsPerPage = 10;

  // Pagination Logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const paginatedTickets = filteredTickets.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredTickets.length / recordsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter the tickets based on searchTerm and date range when "Get Tickets" is clicked
    const filtered = dummyData.filter((ticket) => {
      let matchesSearch = true;
      let matchesDate = true;

      // Search Filter
      if (searchTerm && !ticket.id.includes(searchTerm)) {
        matchesSearch = false;
      }

      // Date Filter
      if (startDate && endDate) {
        const ticketDate = parseISO(ticket.createdAt);
        matchesDate = isWithinInterval(ticketDate, {
          start: parseISO(startDate),
          end: parseISO(endDate),
        });
      }

      return matchesSearch && matchesDate;
    });

    setFilteredTickets(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 absolute  top-3 left-3"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-grow space-x-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <BasicButton2
              type={"submit"}
              className={" "}
              title={"Get Tickets"}
            />
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
              {paginatedTickets.map((ticket) => (
                <motion.tr
                  key={ticket.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 divide-x"
                >
                  <td className="px-4 py-4 whitespace-nowrap">{ticket.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {ticket.subOrderId}
                  </td>
                  <td className="px-4 py-4">{ticket.subject}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        ticket.status === "Closed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {ticket.createdAt}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {ticket.lastUpdatedAt}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {ticket.lastUpdatedBy}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-700">
              Showing {firstIndex + 1} to{" "}
              {Math.min(lastIndex, filteredTickets.length)} of{" "}
              {filteredTickets.length} tickets
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
                className={`px-3 py-1 border rounded-md ${
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
  );
};

export default MyTicket;
