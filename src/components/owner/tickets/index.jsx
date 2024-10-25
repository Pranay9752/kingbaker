// import React from "react";
// import OwnerHeader from "../../../molecules/header/OwnerHeader";
// import { useGetTicketOfVendorQuery } from "../../../redux/apiSlices/owner/tickets";

// function OwnerTickets() {
//   const { data, isLoading } = useGetTicketOfVendorQuery();
//   return <OwnerHeader>{}</OwnerHeader>;
// }

// export default OwnerTickets;

// import React, { useState } from "react";
// import OwnerHeader from "../../../molecules/header/OwnerHeader";
// import { useGetTicketOfVendorQuery } from "../../../redux/apiSlices/owner/tickets";
// import {motion} from 'framer-motion'
// const OwnerTickets = ({}) => {
//   const { data, isLoading } = useGetTicketOfVendorQuery();

//   const [expandedTickets, setExpandedTickets] = useState({});

//   const toggleExpand = (ownerId, ticketId) => {
//     setExpandedTickets((prev) => ({
//       ...prev,
//       [`${ownerId}-${ticketId}`]: !prev[`${ownerId}-${ticketId}`],
//     }));
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <OwnerHeader>
//       <div className="w-full overflow-x-auto bg-[#0a0a0a] rounded-lg shadow-xl">
//         {Array.isArray(data?.data) &&
//           data?.data?.map((ownerData) => (
//             <div key={ownerData.owner_name} className="mb-4">
//               <div className="text-gray-400 text-lg font-semibold p-4 border-b border-gray-400">
//                 {ownerData.owner_name}'s Tickets ({ownerData.count})
//               </div>
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-400">
//                     <th className="p-4 text-left text-gray-400">Ticket ID</th>
//                     <th className="p-4 text-left text-gray-400">Order ID</th>
//                     <th className="p-4 text-left text-gray-400">Status</th>
//                     <th className="p-4 text-left text-gray-400">Date</th>
//                     <th className="p-4 text-left text-gray-400">Vendor</th>
//                     <th className="p-4 text-left text-gray-400">Query Type</th>
//                     <th className="p-4 text-left text-gray-400"></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {ownerData.tickets.map((ticket) => (
//                     <React.Fragment key={ticket.ticket_id}>
//                       <tr className="border-b border-gray-400 hover:bg-gray-900 transition-colors">
//                         <td className="p-4 text-gray-400">
//                           {ticket.ticket_reference_number}
//                         </td>
//                         <td className="p-4 text-gray-400">
//                           {ticket.ticket_subOrderId}
//                         </td>
//                         <td className="p-4">
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs ${
//                               ticket.ticket_status === "open"
//                                 ? "bg-green-900 text-green-300"
//                                 : "bg-gray-800 text-gray-300"
//                             }`}
//                           >
//                             {ticket.ticket_status}
//                           </span>
//                         </td>
//                         <td className="p-4 text-gray-400">
//                           {formatDate(ticket.ticket_date)}
//                         </td>
//                         <td className="p-4 text-gray-400">
//                           {ticket.vendor_name}
//                         </td>
//                         <td className="p-4 text-gray-400">
//                           {ticket.ticket_query} - {ticket.ticket_subquery}
//                         </td>
//                         <td className="p-4 text-gray-400">
//                           <button
//                             onClick={() =>
//                               toggleExpand(
//                                 ownerData.owner_name,
//                                 ticket.ticket_id
//                               )
//                             }
//                             className="text-gray-400 hover:text-white transition-colors"
//                           >
//                             {expandedTickets[
//                               `${ownerData.owner_name}-${ticket.ticket_id}`
//                             ] ? (
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                                 className="size-5"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             ) : (
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                                 className="size-5"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             )}
//                           </button>
//                         </td>
//                       </tr>
//                       {expandedTickets[
//                         `${ownerData.owner_name}-${ticket.ticket_id}`
//                       ] && (
//                         <tr className="bg-gray-900">
//                           <td colSpan="7" className="p-4">
//                             <div className="space-y-4">
//                               {ticket.ticket_chat.map((chat) => (
//                                 <div
//                                   key={chat._id}
//                                   className="border-l-2 border-gray-400 pl-4"
//                                 >
//                                   <div className="flex justify-between text-sm text-gray-400">
//                                     <span>
//                                       {chat.user_name} ({chat.Updated_By})
//                                     </span>
//                                     <span>{formatDate(chat.date)}</span>
//                                   </div>
//                                   <p className="mt-1 text-gray-400">
//                                     {chat.text}
//                                   </p>
//                                 </div>
//                               ))}
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ))}

//         <div className="overflow-x-auto rounded-lg border border-gray-700">
//           <table className="min-w-full divide-y divide-gray-700">
//             <thead className="bg-gray-800">
//               <tr className="divide-x divide-gray-700">
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Reference Id
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Sub-Order ID
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Subject
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Created At
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Last Updated At
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Last Updated By
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700 bg-gray-900">
//               {Array.isArray(data?.data) &&
//                 data?.data?.map((ticket) => {
//                   const chat = ticket?.chat?.[0] ?? {};
//                   return (
//                     <motion.tr
//                       key={ticket.reference_number}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.3 }}
//                       className="hover:bg-gray-800 divide-x divide-gray-700"
//                     >
//                       <td className="px-4 py-4 whitespace-nowrap text-blue-400 hover:text-blue-300 cursor-pointer">
//                         {ticket?.reference_number ?? ""}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-gray-400">
//                         {ticket?.sub_orderId ?? ""}
//                       </td>
//                       <td className="px-4 py-4 text-gray-400">
//                         {ticket?.query ?? ""}{" "}
//                         {ticket?.subquery && `> ${ticket?.subquery}`}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             ticket.status === "Closed"
//                               ? "bg-green-900 text-green-200"
//                               : "bg-yellow-900 text-yellow-200"
//                           }`}
//                         >
//                           {ticket?.status ?? "open"}
//                         </span>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-gray-400">
//                         {ticket?.createdAt
//                           ? format(new Date(ticket?.createdAt), "yyyy-MM-dd")
//                           : ""}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-gray-400">
//                         {chat?.date
//                           ? format(new Date(chat?.date), "yyyy-MM-dd")
//                           : ""}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-gray-400">
//                         {chat?.Updated_By ?? ""}
//                       </td>
//                     </motion.tr>
//                   );
//                 })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </OwnerHeader>
//   );
// };

// export default OwnerTickets;

import { useEffect, useState } from "react";
import { useGetTicketOfVendorQuery } from "../../../redux/apiSlices/owner/tickets";
import OwnerHeader from "../../../molecules/header/OwnerHeader";
import Select from "react-select"; // For react-select dropdown
import DatePicker from "react-datepicker"; // For date range picker
import "react-datepicker/dist/react-datepicker.css"; // Date picker styling
import ModalWrapper from "../../../molecules/wrappers/ModalWrapper";
import TicketDetailsModal from "../../admin/order/modal/TicketDetailModal";




const OwnerTickets = ({ tickets, onSearch }) => {
  const [filteredTickets, setFilteredTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null); // Start of the date range
  const [endDate, setEndDate] = useState(null); // End of the date range
  const [status, setStatus] = useState(""); // Status filter
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { data:ticketData, isLoading } = useGetTicketOfVendorQuery();
  console.log('data: ', ticketData);
  const data = {
    data: [
      {
        tickets: [
          {
            ticket_id: "TCKT-001",
            ticket_subOrderId: "SUB-101",
            ticket_date: "2024-10-24T14:48:00.000Z",
            ticket_query: "Payment Issue",
            ticket_subquery: "Refund Pending",
            vendor_name: "Vendor A",
            ticket_status: "open",
          },
          {
            ticket_id: "TCKT-002",
            ticket_subOrderId: "SUB-102",
            ticket_date: "2024-10-23T11:20:00.000Z",
            ticket_query: "Delivery Issue",
            ticket_subquery: "Package Damaged",
            vendor_name: "Vendor B",
            ticket_status: "closed",
          },
          {
            ticket_id: "TCKT-003",
            ticket_subOrderId: "SUB-103",
            ticket_date: "2024-10-22T09:10:00.000Z",
            ticket_query: "Technical Issue",
            ticket_subquery: "App Crash",
            vendor_name: "Vendor C",
            ticket_status: "pending",
          },
        ],
      },
    ],
  };
 
  const statusOptions = [
    { value: undefined, label: "All" },
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
    { value: "pending", label: "Pending" },
  ];
console.log(filteredTickets, selectedTicket);
  // Function to filter tickets based on search term, status, and date range
  const filterTickets = () => {
    const tickets = ticketData?.data
    return tickets.filter((ticket) => {
      const matchesSearchTerm = ticket.ticket_query?.toLowerCase()
        .includes(searchTerm?.toLowerCase() ?? "");

      const matchesStatus = status.value ? ticket.ticket_status === status.value : true;

      const ticketDate = new Date(ticket.ticket_date);
      const matchesDateRange =
        (!startDate || ticketDate >= startDate) &&
        (!endDate || ticketDate <= endDate);

      return matchesSearchTerm && matchesStatus && matchesDateRange;
    });
  };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleTicketClick = (i) => setSelectedTicket(i)


  useEffect(() => {
    if(ticketData) {
      console.log('ticketData?.data: ', ticketData?.data);
      setFilteredTickets(ticketData?.data?.[0]?.tickets ?? [])
    }
  },[ticketData])
  return (
    <>

      <OwnerHeader isActive={"Tickets"}>
        <div className="w-full bg-black text-gray-300 p-4 rounded-lg">
          {/* Header Controls */}
          <div className="flex flex-wrap gap-3 mb-6">
            {/* Search Input */}

            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-8 py-1.5 bg-[#161b22] border border-gray-800 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-300"
              />

            </div>

            {/* Date Range Picker */}
            <div className="flex items-center gap-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="w-full bg-[#161b22] text-gray-300 border border-gray-800 rounded-md py-1.5 px-2 text-sm"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="w-full bg-[#161b22] text-gray-300 border border-gray-800 rounded-md py-1.5 px-2 text-sm"
              />
            </div>

            {/* Status Filter Dropdown */}
            <Select
              options={statusOptions}
              value={status}
              onChange={(selectedOption) => setStatus(selectedOption)}
              placeholder="Select Status"
              className="w-full max-w-xs"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#161b22",
                  borderColor: "#161b22",
                  color: "white",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "#161b22",
                  color: "white",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#1a1f25" : "#161b22",
                  color: "white",
                  cursor: "pointer",
                }),
              }}
            />
          </div>
          {/* </div> */}

          {/* Table/List */}
          <ul  className="space-y-1">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, index) => {                
                return (
                <li
                onClick={() => handleTicketClick(index)}
                  key={ticket.ticket_id}
                  data-index={index}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[25%,20%,20%,15%,10%,3%] cursor-pointer gap-4 p-4 bg-[#1a1f25] border border-gray-800 rounded-lg group hover:bg-[#22272e] transition-all duration-200 ease-in-out"
                >
                  {/* Ticket ID and SubOrder ID */}
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <div>
                      <div className="font-mono text-sm text-white">
                        {ticket.ticket_id}
                      </div>
                      <div className="text-xs text-gray-400">
                        SubOrder: {ticket.sub_orderId}
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-400">
                    <span className="md:hidden font-semibold text-white mr-2">Date:</span>
                    {formatDate(ticket.ticket_date)}
                  </div>

                  {/* Ticket Query */}
                  <div className="flex items-center text-sm text-gray-400">
                    <span className="md:hidden font-semibold text-white mr-2">Query:</span>
                    {ticket.query} • {ticket.subquery}
                  </div>

                  {/* Vendor */}
                  <div className="flex items-center text-sm text-gray-400 capitalize">
                    <span className="md:hidden font-semibold text-white mr-2 capitalize">Vendor:</span>
                    {ticket.vendor_name}
                  </div>

                  {/* Status and Actions container for mobile */}
                  <div className="flex justify-between items-center md:contents">
                    {/* Ticket Status with color-coding */}
                    <div className="flex items-center text-sm uppercase font-semibold">
                      <span
                        className={`px-2 py-1 rounded-full ${ticket.status === "open"
                          ? "bg-green-400 text-white"
                          : ticket.status === "closed"
                            ? "bg-red-400 text-white"
                            : "bg-yellow-400 text-black"
                          }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    {/* More actions button */}
                    <button className="p-1 hover:bg-gray-800 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                      </svg>
                    </button>
                  </div>
                </li>
              )})
            ) : (
              <div className="text-center text-gray-400">No tickets found</div>
            )}
          </ul>
        </div>
      </OwnerHeader>

      <ModalWrapper
        isOpen={selectedTicket !== null}
        onClose={() => setSelectedTicket(null)}
        height={"90vh"}
        backgroundColor={'#1a1f25'}
      >
        <TicketDetailsModal isOwner ticket={filteredTickets?.[selectedTicket] ?? {}} onClose={() => setSelectedTicket(null)} darkMode/>
      </ModalWrapper>
    </>
  );
};

// export default OwnerTickets;


export default OwnerTickets;
