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

import React, { useState } from "react";
import { useGetTicketOfVendorQuery } from "../../../redux/apiSlices/owner/tickets";
import OwnerHeader from "../../../molecules/header/OwnerHeader";

const GitHubStyleTable = ({ tickets, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("Select Date Range");
  const [environment, setEnvironment] = useState("All Environments");
  const { data, isLoading } = useGetTicketOfVendorQuery();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <OwnerHeader>
      <div className="w-full bg-black text-gray-300 p-4 rounded-lg">
        {/* Header Controls */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
              placeholder="All Branches..."
              className="w-full pl-10 pr-8 py-1.5 bg-[#161b22] border border-gray-800 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-300"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-gray-800 rounded-md text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M10 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H10ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V12ZM11.25 10.005c0-.417.338-.755.755-.755h2a.755.755 0 1 1 0 1.51h-2a.755.755 0 0 1-.755-.755ZM6.005 11.25a.755.755 0 1 0 0 1.51h4a.755.755 0 1 0 0-1.51h-4Z" />
              <path
                fillRule="evenodd"
                d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                clipRule="evenodd"
              />
            </svg>

            <span>Select Date Range</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-gray-800 rounded-md text-sm">
            <span>All Environments</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-gray-800 rounded-md text-sm ml-auto">
            <div className="flex gap-1">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
            </div>
            <span>Status</span>
            <span className="bg-gray-800 px-2 rounded">5/6</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Table/List */}
        <div className="space-y-1">
          {Array.isArray(data?.data) &&
            data?.data?.[0]?.tickets?.map((ticket) => {
              console.log("ticket: ", ticket);

              return (
                <div
                  key={ticket.ticket_id}
                  className="grid grid-cols-[20%,15%,25%,15%,15%,5%] gap-4 p-3 bg-[#161b22] border border-gray-800  rounded-lg group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                  <div className="">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        {ticket.ticket_id}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {ticket.ticket_subOrderId}
                    </span>
                  </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="font-mono">
                      {formatDate(ticket.ticket_date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="font-mono">
                      {ticket.ticket_query} • {ticket.ticket_subquery}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400 capitalize">
                    <span className="font-mono">{ticket.vendor_name}</span>
                  </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400 uppercase">
                      <span>{ticket.ticket_status}</span>
                    </div>
                    <button className=" p-1 hover:bg-gray-800 rounded">
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
              );
            })}
        </div>
      </div>
    </OwnerHeader>
  );
};

export default GitHubStyleTable;
