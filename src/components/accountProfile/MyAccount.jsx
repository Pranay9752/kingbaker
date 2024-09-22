/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Edit2,
  Package,
  Bell,
  MapPin,
  Key,
  LogOut,
  User,
  DollarSign,
  Home,
  Search,
  MessageCircle,
  Gift,
} from "lucide-react";

const Card = ({ Icon, title, description, onClick }) => (
  <div
    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-64 m-2 cursor-pointer h-32 flex flex-col justify-center"
    onClick={onClick}
  >
    <div className="flex flex-col gap-2 items-center justify-center mb-2">
      <Icon className="w-8 h-8 text-gray-500" />
      <h3 className="text-lg font-bold ml-2">{title}</h3>
    </div>
    <p className="text-xs text-gray-600 truncate">{description}</p>
  </div>
);

const SecondComponent = ({ selectedPage, setCurrentPage }) => {
  const accountOptions = [
    { Icon: Package, title: "My Orders", page: "orders" },
    { Icon: DollarSign, title: "fnpCash", page: "fnpCash" },
    { Icon: User, title: "My Profile", page: "profile" },
    { Icon: Bell, title: "My Reminders", page: "reminders" },
    { Icon: MapPin, title: "Saved Addresses", page: "addresses" },
    { Icon: Key, title: "Change Password", page: "password" },
    { Icon: LogOut, title: "Logout", page: "logout" },
  ];

  const renderContent = () => {
    switch (selectedPage) {
      case "fnpCash":
        return <div>fnpCash data</div>;
      case "profile":
        return <div>Profile data</div>;
      case "orders":
        return <div>Orders data</div>;
      default:
        return <div className="p-6">Content for {selectedPage}</div>;
    }
  };

  return (
    <div className="flex bg-gray-100 p-4">
      <div className="w-64 bg-white shadow-md rounded-xl overflow-hidden h-[80vh] md:block hidden">
        <div className="bg-[#3d3d3d] text-white p-4 flex gap-2 items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              className="object-cover"
              src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            />
          </div>
          <h2 className="text-sm font-semibold">Hi, Vaibhav Thakre</h2>
        </div>
        <nav className="overflow-scroll scrollbar-hide">
          {accountOptions.map((option) => (
            <div
              key={option.title}
              className={`flex items-center justify-between py-4 px-4 cursor-pointer ${
                selectedPage === option.page ? "bg-gray-200" : ""
              }`}
              onClick={() => setCurrentPage(option.page)}
            >
              <div className="flex items-center">
                <option.Icon className="w-5 h-5 mr-3 text-gray-500" />
                <h3 className="text-sm font-semibold">{option.title}</h3>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-grow md:p-6 bg-white md:ml-4 rounded-xl min-h-fit h-[80vh] overflow-y-scroll scrollbar-thin">
        <div className="mb-4 flex items-center">
          <button onClick={() => setCurrentPage("main")} className="mr-2">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">
            {selectedPage === "main"
              ? "My Account"
              : accountOptions.find((o) => o.page === selectedPage)?.title}
          </h1>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

const MainComponent = () => {
  const [currentPage, setCurrentPage] = useState("main");

  const accountOptions = [
    {
      Icon: Package,
      title: "My Orders",
      description: "View Order Status, Track Order & Download Invoice",
      page: "orders",
    },
    {
      Icon: DollarSign,
      title: "fnpCash",
      description: "Quick Checkout, Easy Refund",
      page: "fnpCash",
    },
    {
      Icon: User,
      title: "My Profile",
      description: "View and edit your profile",
      page: "profile",
    },
    {
      Icon: Bell,
      title: "My Reminders",
      description: "Manage your reminders & add a new reminder",
      page: "reminders",
    },
    {
      Icon: MapPin,
      title: "Saved Addresses",
      description: "Save address for a hassle-free checkout",
      page: "addresses",
    },
    {
      Icon: Key,
      title: "Change Password",
      description: "Stay logged in for faster checkout",
      page: "password",
    },
    {
      Icon: LogOut,
      title: "Logout",
      description: "",
      page: "logout",
    },
  ];

  if (currentPage !== "main") {
    return (
      <SecondComponent
        selectedPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    );
  }

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden bg-white min-h-screen">
        <div className="flex flex-col gap-4 bg-[#f2f2f2]">
          <div className="flex items-center justify-between p-4 bg-white">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold mr-3">
                V
              </div>
              <h2 className="font-semibold">Vaibhav Thakre</h2>
            </div>
            <div className="flex items-center">
              <button className="">
                <Edit2 size={18} />
              </button>
            </div>
          </div>

          <div className="px-4 bg-white">
            {accountOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => setCurrentPage(option.page)}
                className="flex items-center justify-between py-3 border-b border-gray-200"
              >
                <div className="flex items-center">
                  <option.Icon className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <h3 className="text-sm font-semibold text-start">
                      {option.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 flex justify-around py-2">
          <button className="text-center">
            <Home className="mx-auto mb-1 text-gray-500" size={20} />
            <span className="text-xs">Home</span>
          </button>
          <button className="text-center">
            <Search className="mx-auto mb-1 text-gray-500" size={20} />
            <span className="text-xs">Same Day</span>
          </button>
          <button className="text-center">
            <MessageCircle className="mx-auto mb-1 text-gray-500" size={20} />
            <span className="text-xs">Chat with us</span>
          </button>
          <button className="text-center">
            <Gift className="mx-auto mb-1 text-gray-500" size={20} />
            <span className="text-xs">Offers</span>
          </button>
          <button className="text-center">
            <User className="mx-auto mb-1 text-gray-500" size={20} />
            <span className="text-xs">Account</span>
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block container mx-auto p-4 bg-[#f2f2f2] min-h-screen">
        <h2 className="text-lg text-center font-bold mb-4">MY ACCOUNT</h2>
        <div className="flex flex-wrap gap-0 justify-center mx-auto w-3/4 items-center mt-4">
          {accountOptions.map((option, index) => (
            <Card
              key={index}
              Icon={option.Icon}
              title={option.title}
              description={option.description}
              onClick={() => setCurrentPage(option.page)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainComponent;
