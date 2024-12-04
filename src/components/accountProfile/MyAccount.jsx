/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import getCookie from "../../atom/utils/getCookies";
import { useNavigate, useParams } from "react-router-dom";
import deleteAllCookies from "../../atom/utils/deleteAllCookies";
import TopNavbar from "../../molecules/header/TopNavBar";
import NavBar from "../home/NavBar";
import { twMerge } from "tailwind-merge";
import Footer from "../../molecules/footer/footer";
import ProfileForm from "./ProfileForm";
import AddressData from "./AddressData";
const Card = ({ Icon, title, description, onClick, color }) => (
  <div
    className="bg-white p-4 text-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-1/3 m-2 cursor-pointer h-32 flex flex-col items-center   justify-center"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={twMerge(`size-12 `, color)}
    >
      {Icon}
    </svg>

    <h3 className="text-lg font-bold mt-2">{title}</h3>
    <p className="text-xs text-gray-600 truncate">{description}</p>
  </div>
);

const LogoutComp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    deleteAllCookies();
    location.href = "/";
  }, []);
  return <></>;
};

const SecondComponent = ({ selectedPage, setCurrentPage, accountOptions }) => {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    if (option.page == "logout") {
      deleteAllCookies();
      location.href = "/";
    } else {
      navigate(`/account/details/${option.page}`);
      setCurrentPage(option.page);
    }
  };

  const renderContent = () => {
    switch (selectedPage) {
      case "profile":
        return <ProfileForm />;
      case "orders":
        return <div>Orders data</div>;
      case "addresses":
        return <AddressData />;
      case "logout":
        return <LogoutComp />;
      default:
        return <div className="p-6">Loading...</div>;
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
          <h2 className="text-sm font-semibold">
            Hi, {getCookie("user") == "" ? "Guest" : getCookie("user")}
          </h2>
        </div>
        <nav className="overflow-scroll hide-scrollbar">
          {accountOptions.map((option) => (
            <div
              key={option.title}
              className={`flex items-center justify-between py-4 px-4 cursor-pointer ${
                selectedPage === option.page ? "bg-gray-200" : ""
              }`}
              onClick={() => handleOptionClick(option)}
              role="button"
              tabIndex={0} // Allow keyboard navigation
              // onKeyPress={(e) => e.key === "Enter" && handleOptionClick(option)}
            >
              <div className="flex items-center">
                {option.Icon}
                <h3 className="text-sm font-semibold">{option.title}</h3>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-[18px] text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-4 md:p-6 bg-white md:ml-4 rounded-xl min-h-fit h-[80vh] overflow-y-auto scrollbar-thin">
        <div className="mb-4 flex items-center">
          <button onClick={() => setCurrentPage("main")} className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
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

const MyAccount = () => {
  const { phase } = useParams();

  const [currentPage, setCurrentPage] = useState("main");
  const navigate = useNavigate();
  const handleOptionClick = (option) => {
    if (option.page == "logout") {
      deleteAllCookies();
      location.href = "/";
    } else {
      navigate(`/account/details/${option.page}`);
      setCurrentPage(option.page);
    }
  };

  const accountOptions = [
    // {
    //   Icon: (
    //     <>
    //       <>
    //         <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
    //         <path
    //           fillRule="evenodd"
    //           d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
    //           clipRule="evenodd"
    //         />
    //       </>
    //     </>
    //   ),
    //   color: "text-pink-600",
    //   title: "My Orders",
    //   description: "View Order Status, Track Order & Download Invoice",
    //   page: "orders",
    // },

    {
      Icon: (
        <>
          <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
        </>
      ),
      color: "text-blue-600",
      title: "My Profile",
      description: "View and edit your profile",
      page: "profile",
    },
    {
      Icon: (
        <>
          <path
            fillRule="evenodd"
            d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
            clipRule="evenodd"
          />
        </>
      ),
      color: "text-red-600",

      title: "Saved Addresses",
      description: "Save address for a hassle-free checkout",
      page: "addresses",
    },
    // {
    //   Icon: (
    //     <>
    //       <path
    //         fillRule="evenodd"
    //         d="M8 7a5 5 0 1 1 3.61 4.804l-1.903 1.903A1 1 0 0 1 9 14H8v1a1 1 0 0 1-1 1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 .293-.707L8.196 8.39A5.002 5.002 0 0 1 8 7Zm5-3a.75.75 0 0 0 0 1.5A1.5 1.5 0 0 1 14.5 7 .75.75 0 0 0 16 7a3 3 0 0 0-3-3Z"
    //         clipRule="evenodd"
    //       />
    //     </>
    //   ),
    //   color: "text-green-600",
    //   title: "Change Password",
    //   description: "Stay logged in for faster checkout",
    //   page: "password",
    // },
    {
      Icon: (
        <>
          <path
            fillRule="evenodd"
            d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
            clipRule="evenodd"
          />
        </>
      ),
      title: "Logout",
      description: "",
      page: "logout",
      onClick: () => {
        deleteAllCookies();
        location.href = "/";
      },
    },
  ];

  useEffect(() => {
    if (phase == "logout") {
      deleteAllCookies();
      location.href = "/";
    }
    setCurrentPage(() => {
      if (accountOptions?.map((item) => item.page).includes(phase)) {
        return phase;
      } else {
        return "main";
      }
    });
    if (accountOptions?.map((item) => item.page).includes(phase))
      navigate(`/account/details/${phase}`);
  }, [phase]);

  return (
    <>
      <TopNavbar
        logo="/path/to/your/logo.png"
        title="logo"
        searchPlaceholder="Search flowers, cakes, gifts, etc."
        currencies={["INR", "USD", "EUR"]}
        deliveryLocationText="Select Delivery Location"
        franchiseEnquiriesText="Franchise Enquiries"
        corporateGiftsText="Corporate Gifts"
        moreOptions={[
          { label: "About Us", link: "/about" },
          { label: "Contact", link: "/contact" },
          { label: "FAQ", link: "/faq" },
        ]}
        userGreeting="Hi Guest"
      />
      <NavBar />
      {currentPage !== "main" ? (
        <>
          <SecondComponent
            accountOptions={accountOptions}
            selectedPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <>
          {/* Mobile View */}
          <div className="md:hidden bg-white min-h-screen">
            <div className="flex flex-col gap-4 bg-[#f2f2f2]">
              <div className="flex items-center justify-between p-4 bg-white">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold mr-3 capitalize">
                    {getCookie("user") == "" ? "G" : getCookie("user")[0]}
                  </div>
                  <h2 className="font-semibold">
                    {getCookie("user") == "" ? "Guest" : getCookie("user")}
                  </h2>
                </div>
                <div className="flex items-center">
                  <button className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-[18px]"
                    >
                      <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                    </svg>
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
                      {option.Icon}
                      <div>
                        <h3 className="text-sm font-semibold text-start">
                          {option.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-[18px] text-gray-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-gray-100 flex justify-around py-2">
              <button onClick={() => navigate("/")} className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5 mx-auto mb-1 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="text-xs">Home</span>
              </button>
              <button
                onClick={() => navigate("/search/today")}
                className="text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 mx-auto mb-1 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>

                <span className="text-xs">Search</span>
              </button>
              <button className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5 mx-auto mb-1 text-gray-500"
                >
                  <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                </svg>

                <span className="text-xs">Account</span>
              </button>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block container mx-auto p-4 bg-[#f2f2f2] min-h-screen">
            <div className="flex flex-wrap gap-0 justify-center mx-auto w-3/4 items-center mt-4">
              {accountOptions.map((option, index) => (
                <Card
                  key={index}
                  Icon={option.Icon}
                  title={option.title}
                  color={option.color}
                  description={option.description}
                  onClick={() => handleOptionClick(option)}
                />
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default MyAccount;
