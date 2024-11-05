import { useMemo, useState } from "react";
import OwnerHeader from "../../../molecules/header/OwnerHeader";
import { useGetAllVendorQuery } from "../../../redux/apiSlices/owner/vendor";
import BasicButton from "../../../atom/button/BasicButton";
import ModalWrapper from "../../../molecules/wrappers/ModalWrapper";
import AddVendorModal from "./addVendor";

const OwnerVendors = ({ }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const { data, error, isLoading, refetch } = useGetAllVendorQuery();

  // Filter vendors based on search, date range, and status
  const filteredVendors = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((vendor) => {
      const nameMatch = vendor.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const dateMatch =
        (!startDate || new Date(vendor.createdAt) >= startDate) &&
        (!endDate || new Date(vendor.createdAt) <= endDate);
      const statusMatch =
        !selectedStatus || vendor.status === selectedStatus.value;
      return nameMatch && dateMatch && statusMatch;
    });
  }, [data, searchTerm, startDate, endDate, selectedStatus]);

  const handleVendorClick = (index) => {
    if (filteredVendors[index]) {
      console.log("Clicked vendor:", filteredVendors[index]);
      setSelectedVendor(index)
    } else {
      console.error("Vendor not found");
    }
  };

  const handleClose = () => setSelectedVendor(null)
  const handleSubmit = (data) => {
    refetch()
    handleClose()
  }

  return (
    <>
      <OwnerHeader isActive={"Vendors"}>
        <div className="w-full bg-black text-gray-300 p-4 rounded-lg">
          <div className="flex justify-between items-center gap-3 mb-6">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-8 py-1.5 bg-[#161b22] border border-gray-800 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-300"
              />
            </div>
            <BasicButton onClick={() => setSelectedVendor(-1)} className={`text-xs md:text-base border-2 rounded-xl px-2 py-2 whitespace-nowrap border-[#1a1f25] focus:scale-95 hover:bg-[#1a1f25]`}>
              Add Vendor
            </BasicButton>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-1">
              <thead>
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-400 bg-[#1a1f25] rounded-l-lg">
                    Vendor Details
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400 bg-[#1a1f25] hidden md:table-cell">
                    Address
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400 bg-[#1a1f25] hidden lg:table-cell">
                    Email
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400 bg-[#1a1f25] hidden lg:table-cell">
                    Phone
                  </th>
                  <th className="w-16 p-4 text-sm font-medium text-gray-400 bg-[#1a1f25] rounded-r-lg"></th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.length > 0
                  ? filteredVendors.map((vendor, index) => (
                    <tr
                      key={vendor._id}
                      onClick={() => handleVendorClick(index)}
                      className="group cursor-pointer"
                    >
                      <td className="p-4 bg-[#1a1f25] border border-gray-800 group-hover:bg-[#22272e] transition-all duration-200 rounded-l-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          <div>
                            <div className="font-mono text-sm text-white">
                              {vendor.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              ID: {vendor._id}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 bg-[#1a1f25] border border-gray-800 group-hover:bg-[#22272e] transition-all duration-200 hidden md:table-cell">
                        <div className="text-sm text-gray-400">
                          {vendor.address.street}, {vendor.address.city},{" "}
                          {vendor.address.state}
                        </div>
                      </td>

                      <td className="p-4 bg-[#1a1f25] border border-gray-800 group-hover:bg-[#22272e] transition-all duration-200 hidden lg:table-cell">
                        <div className="text-sm text-gray-400">
                          {vendor.email}
                        </div>
                      </td>

                      <td className="p-4 bg-[#1a1f25] border border-gray-800 group-hover:bg-[#22272e] transition-all duration-200 hidden lg:table-cell">
                        <div className="text-sm text-gray-400">
                          {vendor.phone}
                        </div>
                      </td>

                      <td className="p-4 bg-[#1a1f25] border border-gray-800 group-hover:bg-[#22272e] transition-all duration-200 rounded-r-lg">
                        <button
                          className="p-1 hover:bg-gray-800 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle action button click
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                          >
                            <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                  : !isLoading && (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center p-4 text-gray-400 bg-[#1a1f25] rounded-lg"
                      >
                        No vendors found
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
          {isLoading && (
            <div className="text-center text-gray-400">Loading vendors...</div>
          )}
          {error && (
            <div className="text-center text-red-500">
              Failed to load vendors. Please try again later.
            </div>
          )}
        </div>
      </OwnerHeader>
      <ModalWrapper maxHeight={"92vh"}
        className={`p-3 text-gray-300 `} backgroundColor={'#1a1f25'} isOpen={selectedVendor != null} onClose={handleClose}>
        <AddVendorModal initialData={selectedVendor === -1 ? null : filteredVendors[selectedVendor]}
          onSubmit={handleSubmit}
          onClose={handleClose} />
      </ModalWrapper>
    </>
  );
};

export default OwnerVendors;
