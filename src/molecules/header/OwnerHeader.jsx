// import React, { useState } from 'react';

// const OwnerHeader = () => {
//   const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

//   const navItems = [
//     { label: 'Overview', isActive: true },
//     { label: 'Integrations', isActive: false },
//     { label: 'Activity', isActive: false },
//     { label: 'Domains', isActive: false },
//     { label: 'Usage', isActive: false },
//     { label: 'Monitoring', isActive: false },
//     { label: 'Storage', isActive: false },
//     { label: 'AI', isActive: false },
//     { label: 'Support', isActive: false },
//     { label: 'Settings', isActive: false },
//   ];

//   return (
//     <div className="bg-black min-h-screen">
//       <nav className="border-b bg-[#0a0a0a] border-gray-800">
//         {/* Top Navigation */}
//         <div className="px-6 h-14 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             {/* Logo */}
//             <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l9 21H3L12 2z" />
//             </svg>

//             {/* Project Selector */}
//             <div className="flex items-center space-x-2">
//               <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-300">
//                 <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
//                   <span className="text-xs text-white">P</span>
//                 </div>
//                 <span className="text-sm text-white">pranay9752's projects</span>
//               </button>
//               <span className="text-gray-600">/</span>
//               <div className="relative">
//                 <button
//                 type='button'
//                   onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
//                   className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-800"
//                 >
//                   <span className="text-sm text-white">Hobby</span>
//                   <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Side Navigation */}
//           <div className="flex items-center space-x-4">
//             <button className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
//               Feedback
//             </button>
//             <button className="flex items-center px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
//               <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
//               </svg>
//               Changelog
//             </button>
//             <button className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
//               <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-7.071 7.071a1.414 1.414 0 01-2 0L5.636 10a1.414 1.414 0 000-2l7.071-7.071a1.414 1.414 0 012 0l3.657 3.657a1.414 1.414 0 010 2zM5.636 13.364l7.071-7.071M5.636 10.5l7.071 7.071a1.414 1.414 0 002 0L18.364 12a1.414 1.414 0 000-2" />
//               </svg>
//             </button>
//             <button className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
//               <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm0 0l8 8 8-8" />
//               </svg>
//             </button>
//             <button className="relative px-3 py-1 text-gray-400 hover:text-gray-300">
//               <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18m-9 5h9" />
//               </svg>
//               <span className="absolute top-0 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
//             </button>
//             <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
//               <span className="text-sm text-white">P</span>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="px-6">
//           <div className="flex space-x-4">
//             {navItems.map((item, index) => (
//               <button
//                 key={index}
//                 className={`px-3 py-4 text-sm font-medium border-b-2 ${
//                   item.isActive
//                     ? 'border-white text-white'
//                     : 'border-transparent text-gray-400 hover:text-gray-300'
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default OwnerHeader;

// import React, { useState } from "react";

// const OwnerHeader = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

//   const navItems = [
//     { label: "Overview", id: 1 },
//     { label: "Integrations", id: 2 },
//     { label: "Activity", id: 3 },
//     { label: "Domains", id: 4 },
//     { label: "Usage", id: 5 },
//     { label: "Monitoring", id: 6 },
//     { label: "Storage", id: 7 },
//     { label: "AI", id: 8 },
//     { label: "Support", id: 9 },
//     { label: "Settings", id: 10 },
//   ];

//   return (
//     <>
//     <div className="bg-black min-h-screen flex">
//       {/* Sidebar for mobile */}
//       <div
//         className={`fixed inset-y-0 left-0 transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out bg-[#0a0a0a] w-64 md:hidden`}
//       >
//         <div className="px-4 py-6">
//           <h2 className="text-white text-lg font-semibold mb-4">Navigation</h2>
//           <nav className="flex flex-col space-y-2">
//             {navItems.map((item, index) => (
//               <button
//                 key={index}
//                 className={`text-sm text-left px-3 py-2 rounded-md ${
//                   item.isActive
//                     ? "bg-gray-800 text-white"
//                     : "text-gray-400 hover:bg-gray-700"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {/* {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={() => setIsSidebarOpen(false)}></div>} */}

//       <div className="flex-1 flex flex-col ">
//         <nav className="border-b bg-[#0a0a0a] border-gray-800 md:border-transparent">
//           {/* Top Navigation */}
//           <div className="px-6 h-14 flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               {/* Logo */}
//               <svg
//                 className="h-5 w-5 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 2l9 21H3L12 2z"
//                 />
//               </svg>

//               {/* Project Selector */}
//               <div className="flex items-center space-x-2">
//                 <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-300">
//                   <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
//                     <span className="text-xs text-white">P</span>
//                   </div>
//                   <span className="text-sm text-white">
//                     pranay9752's projects
//                   </span>
//                 </button>
//                 {/* <span className="text-gray-600">/</span>
//                 <div className="relative">
//                   <button
//                     type='button'
//                     onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
//                     className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-800"
//                   >
//                     <span className="text-sm text-white">Hobby</span>
//                     <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>
//                 </div> */}
//               </div>
//             </div>

//             {/* Right Side Navigation */}
//             <div className="flex items-center space-x-4">
//               {/* <button className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
//                 Feedback
//               </button>
//               <button className="flex items-center px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
//                 <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
//                 </svg>
//                 Changelog
//               </button>
//               <button className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
//                 <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-7.071 7.071a1.414 1.414 0 01-2 0L5.636 10a1.414 1.414 0 000-2l7.071-7.071a1.414 1.414 0 012 0l3.657 3.657a1.414 1.414 0 010 2zM5.636 13.364l7.071-7.071M5.636 10.5l7.071 7.071a1.414 1.414 0 002 0L18.364 12a1.414 1.414 0 000-2" />
//                 </svg>
//               </button>
//               <button className="relative px-3 py-1 text-gray-400 hover:text-gray-300">
//                 <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18m-9 5h9" />
//                 </svg>
//                 <span className="absolute top-0 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
//               </button> */}
//               <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
//                 <span className="text-sm text-white">P</span>
//               </div>

//               {/* Mobile Sidebar Toggle */}
//               <button
//                 className="md:hidden text-white"
//                 onClick={() => setIsSidebarOpen(true)}
//               >
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* Bottom Navigation (hidden on mobile) */}
//         <div className="hidden md:block px-6 border-b bg-[#0a0a0a] border-gray-800">
//           <div className="flex space-x-4">
//             {navItems.map((item, index) => (
//               <button
//                 key={index}
//                 className={`px-3 py-4 text-sm font-medium border-b-2 ${
//                   item.isActive
//                     ? "border-white text-white"
//                     : "border-transparent text-gray-400 hover:text-gray-300"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//     {children}
//     </>
//   );
// };

// export default OwnerHeader;

import React, { useState } from "react";

const OwnerHeader = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle
  const [activeItem, setActiveItem] = useState("Overview");
  const navItems = [
    { label: "Vendors" },
    { label: "Tickets" },
    { label: "Orders" },
    // { label: "Domains" },
    // { label: "Usage" },
    // { label: "Monitoring" },
    // { label: "Storage" },
    // { label: "AI" },
    // { label: "Support" },
    // { label: "Settings" },
  ];
  const onNavItemClick = (label) => setActiveItem(label);

  return (
    <div className="bg-black min-h-screen flex">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-[#0a0a0a] z-50 w-64 md:hidden`}
      >
        <div className="px-4 py-6">
          <h2 className="text-white text-lg font-semibold mb-4">Navigation</h2>
          <nav className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`text-sm text-left px-3 py-2 rounded-md ${
                  activeItem === item.label
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-700"
                }`}
                onClick={() => onNavItemClick(item.label)}
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
                  <span className="text-sm text-white">
                    pranay9752's projects
                  </span>
                </button>
                {/* <span className="text-gray-600">/</span>
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-800"
                  >
                    <span className="text-sm text-white">Hobby</span>
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div> */}
              </div>
            </div>

            {/* Right Side Navigation */}
            <div className="flex items-center space-x-4">
              {/* <button className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
                Feedback
              </button>
              <button className="flex items-center px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
                Changelog
              </button>
              <button className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
                <svg
                  className="h-4 w-4"
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
              </button>
              <button className="relative px-3 py-1 text-gray-400 hover:text-gray-300">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7h18M3 12h18m-9 5h9"
                  />
                </svg>
                <span className="absolute top-0 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button> */}
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
                onClick={() => onNavItemClick(item.label)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
};

export default OwnerHeader;
