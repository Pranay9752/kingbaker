import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "../wrappers/ModalWrapper";
import AddProductModal from "../../components/owner/product/addProductModal";

const OwnerHeader = ({ isActive, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle
  const [activeItem, setActiveItem] = useState("Vendors");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const navigate = useNavigate();
  const navItems = [
    { label: "Vendors", link: "/owner/vendors" },
    { label: "Tickets", link: "/owner/tickets" },
    { label: "Orders", link: "/owner/orders" },
    { label: "Products", link: "/owner/products" },
  ];
  const onNavItemClick = (item) => {
    setActiveItem(item?.label);
    navigate(item?.link);
  };

  const handleOpenNewWindow = () => {
    window.open("/owner/landing", "_blank");
    // navigate('/your-new-route', { replace: true }, newWindow);
  };

  const handleAddProduct = (value) =>
    setShowAddProductModal((prev) => value || !prev);

  useEffect(() => {
    if (isActive) {
      setActiveItem(isActive);
    }
  }, [isActive]);

  return (
    <>
      <div className="bg-black min-h-screen flex">
        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out bg-[#0a0a0a] z-50 w-64 md:hidden`}
        >
          <div className="px-4 py-6">
            <h2 className="text-white text-lg font-semibold mb-4">
              Navigation
            </h2>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className={`text-sm text-left px-3 py-2 rounded-md ${
                    activeItem === item.label
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                  onClick={() => onNavItemClick(item)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <div className="flex-1 flex flex-col">
          <nav className="border-b bg-[#0a0a0a] border-gray-800 md:border-transparent">
            {/* Top Navigation */}
            <div className="px-6 h-14 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Logo */}
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2l9 21H3L12 2z"
                  />
                </svg>

                {/* Project Selector */}
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-300">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">P</span>
                    </div>
                    {/* <span className="text-sm text-white">
                    pranay9752's projects
                  </span> */}
                  </button>
                </div>
              </div>

              {/* Right Side Navigation */}
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="flex items-center px-3 py-1 text-sm text-gray-400 hover:text-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-4 md:mr-1"
                  >
                    <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Z" />
                    <path
                      fillRule="evenodd"
                      d="M13 6H3v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6ZM8.75 7.75a.75.75 0 0 0-1.5 0v2.69L6.03 9.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06l-1.22 1.22V7.75Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className={`hidden md:block`}>Add Product</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenNewWindow}
                  className="flex items-center px-3 py-1 text-sm text-gray-400 hover:text-gray-300"
                >
                  <svg
                    className="h-4 w-4 md:mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-7.071 7.071a1.414 1.414 0 01-2 0L5.636 10a1.414 1.414 0 000-2l7.071-7.071a1.414 1.414 0 012 0l3.657 3.657a1.414 1.414 0 010 2zM5.636 13.364l7.071-7.071M5.636 10.5l7.071 7.071a1.414 1.414 0 002 0L18.364 12a1.414 1.414 0 000-2"
                    />
                  </svg>
                  <span className={`hidden md:block`}> Update Landing</span>
                </button>

                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-sm text-white">P</span>
                </div>

                {/* Mobile Sidebar Toggle */}
                <button
                  className="md:hidden text-white"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </nav>

          {/* Bottom Navigation (hidden on mobile) */}
          <div className="hidden md:block px-6 border-b bg-[#0a0a0a] border-gray-800">
            <div className="flex space-x-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className={`px-3 py-4 text-sm font-medium border-b-2 ${
                    activeItem === item.label
                      ? "border-white text-white"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => onNavItemClick(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}

          <div className="flex-1 px-0 py-3 lg:p-6">{children}</div>
        </div>
      </div>
      <ModalWrapper
        maxHeight={"101vh"}
        className={`p-0 text-gray-300 `}
        backgroundColor={"#1a1f25"}
        isOpen={showAddProductModal}
        onClose={() => {}}
      >
        <AddProductModal onClose={() => handleAddProduct(false)} />
      </ModalWrapper>
    </>
  );
};

export default OwnerHeader;
