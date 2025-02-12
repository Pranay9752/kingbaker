
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
