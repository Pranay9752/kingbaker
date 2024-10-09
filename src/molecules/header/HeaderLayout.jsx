import { useState } from "react";
import MenuNavbar from "../../atom/nav/MenuSidebar";
import NavSidebar from "../../atom/nav/sidebar";

export default function HeaderLayout({
  id,
  logoSrc,
  logoAlt,
  title,
  children,
}) {
  const userProfile = {
    image: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    name: "Neil Sims",
    email: "neil.sims@flowbite.com",
    menuItems: [
      { link: "/admin/delivery-boy", label: "Delivery Boy" },
      // { link: "/settings", label: "Settings" },
      // { link: "/earnings", label: "Earnings" },
      { link: "/logout", label: "Sign out" },
    ],
  };

  const sidebarItems = [
    {
      id: 1,
      link: "/admin/dashboard",
      label: "Home",
      iconPath: (
        <path
          fillRule="evenodd"
          d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
          clipRule="evenodd"
        />
      ),
    },
    {
      id: 2,
      link: "/admin/sales",
      label: "Sales",
      iconPath: (
        <path
          fillRule="evenodd"
          d="M1 2.75A.75.75 0 0 1 1.75 2h16.5a.75.75 0 0 1 0 1.5H18v8.75A2.75 2.75 0 0 1 15.25 15h-1.072l.798 3.06a.75.75 0 0 1-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 0 1-1.452-.38L5.823 15H4.75A2.75 2.75 0 0 1 2 12.25V3.5h-.25A.75.75 0 0 1 1 2.75ZM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373Zm7.49-8.931a.75.75 0 0 1-.175 1.046 19.326 19.326 0 0 0-3.398 3.098.75.75 0 0 1-1.097.04L8.5 8.561l-2.22 2.22A.75.75 0 1 1 5.22 9.72l2.75-2.75a.75.75 0 0 1 1.06 0l1.664 1.663a20.786 20.786 0 0 1 3.122-2.74.75.75 0 0 1 1.046.176Z"
          clipRule="evenodd"
        />
      ),
    },
    {
      id: 3,
      link: "/admin/dashboard",
      label: "Orders",
      iconPath: (
        <>
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
            <path
              d="M21 7.5L17 9.5M12 12L3 7.5M12 12V21.5M12 12C12 12 14.7426 10.6287 16.5 9.75C16.6953 9.65237 17 9.5 17 9.5M17 9.5V13M17 9.5L7.5 4.5"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </g>
        </>
      ),
    },
    {
      id: 5,
      link: "/admin/my-ticket",
      label: "My Ticket",
      iconPath: (
        <>
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M6,23H18a3,3,0,0,0,3-3V4a3,3,0,0,0-3-3H15a1,1,0,0,0-1,1,2,2,0,0,1-4,0A1,1,0,0,0,9,1H6A3,3,0,0,0,3,4V20A3,3,0,0,0,6,23ZM5,10h.882a1,1,0,0,0,0-2H5V4A1,1,0,0,1,6,3H8.126a4,4,0,0,0,7.748,0H18a1,1,0,0,1,1,1V8h-.882a1,1,0,0,0,0,2H19V20a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1ZM7.706,9a1,1,0,0,1,1-1h1.882a1,1,0,1,1,0,2H8.706A1,1,0,0,1,7.706,9Zm4.706,0a1,1,0,0,1,1-1h1.882a1,1,0,0,1,0,2H13.412A1,1,0,0,1,12.412,9Z"></path>
          </g>
        </>
      ),
    },
    {
      id: 6,
      link: "/admin/dashboard",
      label: "Place Order",
      iconPath: (
        <>
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
              strokeWidth="1.5"
            ></path>
            <path
              d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
              strokeWidth="1.5"
            ></path>
            <path
              d="M11 10.8L12.1429 12L15 9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </g>
        </>
      ),
    },
    {
      id: 7,
      link: "/admin/dashboard",
      label: "SLA",
      iconPath: (
        <>
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M3 7.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V7.4C10 7.73137 9.73137 8 9.4 8H3.6C3.26863 8 3 7.73137 3 7.4Z"
              strokeWidth="1.5"
            ></path>
            <path
              d="M14 20.4V16.6C14 16.2686 14.2686 16 14.6 16H20.4C20.7314 16 21 16.2686 21 16.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z"
              strokeWidth="1.5"
            ></path>
            <path
              d="M14 12.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V12.4C21 12.7314 20.7314 13 20.4 13H14.6C14.2686 13 14 12.7314 14 12.4Z"
              strokeWidth="1.5"
            ></path>
            <path
              d="M3 20.4V11.6C3 11.2686 3.26863 11 3.6 11H9.4C9.73137 11 10 11.2686 10 11.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z"
              strokeWidth="1.5"
            ></path>
          </g>
        </>
      ),
    },
    {
      id: 8,
      link: "/admin/dashboard",
      label: "Fulfiled Report",
      iconPath: (
        <>
          <path
            fillRule="evenodd"
            d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </>
      ),
    },
    {
      id: 9,
      link: "/users",
      label: "Performance Report",
      iconPath: (
        <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" />
      ),
    },
    {
      id: 10,
      link: "/admin/dashboard",
      label: "My Inventory",
      iconPath: (
        <>
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g clipPath="url(#clip0_525_127)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 0C1.55228 0 2 0.447715 2 1V8H5C4.44772 8 4 7.55228 4 7V5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V7C10 7.55228 9.55228 8 9 8H13C12.4477 8 12 7.55228 12 7V3C12 2.44772 12.4477 2 13 2H19C19.5523 2 20 2.44772 20 3V7C20 7.55228 19.5523 8 19 8H22V1C22 0.447715 22.4477 0 23 0C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24C22.4477 24 22 23.5523 22 23V22H2V23C2 23.5523 1.55228 24 1 24C0.447715 24 0 23.5523 0 23V1C0 0.447715 0.447715 0 1 0ZM22 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14H14C13.4477 14 13 14.4477 13 15V19C13 19.5523 13.4477 20 14 20H10C10.5523 20 11 19.5523 11 19V13C11 12.4477 10.5523 12 10 12H5C4.44772 12 4 12.4477 4 13V19C4 19.5523 4.44772 20 5 20H2V10H22V20Z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_525_127">
                <rect width="24" height="24" fill="white"></rect>
              </clipPath>
            </defs>
          </g>
        </>
      ),
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = (value) => setIsOpen((prev) => value ?? !prev);

  return (
    <>
      <MenuNavbar
        logoSrc={logoSrc}
        logoAlt={logoAlt}
        title={title}
        userProfile={userProfile}
        toggleSidebar={toggleIsOpen}
      />
      <NavSidebar isOpen={isOpen} id={id} menuItems={sidebarItems} />
      <div class="p-4 sm:ml-64">
        <div class=" mt-14  hide-scrollbar">{children}</div>
      </div>
    </>
  );
}