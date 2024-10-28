import React, { useCallback, useEffect, useMemo, useState } from "react";
import TextTitleComponent from "../../home/TextTitleComponent";
import CategoriesCard from "../../home/CategoriesCard";
import CardCarousel from "../../home/CardCarousel";
import Carousel from "../../home/CarouselSlider";
import { twMerge } from "tailwind-merge";
import CustomGrid from "../../home/CustomGrid";

// const PaddingControl = ({ updatePadding }) => {
//   const [isUniform, setIsUniform] = useState(true);
//   const [padding, setPadding] = useState({
//     top: 16,
//     right: 16,
//     bottom: 16,
//     left: 16,
//   });

//   useEffect(() => {
//     updatePadding(padding);
//   }, [padding, updatePadding]);

//   const handleUniformToggle = () => {
//     setIsUniform(!isUniform);
//     if (!isUniform) {
//       setPadding({
//         top: padding.top,
//         right: padding.top,
//         bottom: padding.top,
//         left: padding.top,
//       });
//     }
//   };

//   const handlePaddingChange = (e, side) => {
//     const value = parseInt(e.target.value, 10) || 0;
//     if (isUniform) {
//       setPadding({ top: value, right: value, bottom: value, left: value });
//     } else {
//       setPadding({ ...padding, [side]: value });
//     }
//   };

//   return (
//     <div className="bg-white p-4 border rounded-2xl shadow-md">
//       <label className="text-sm font-medium text-slate-800">Padding</label>
//       <div className="flex items-center space-x-2 mt-2">
//         {isUniform ? (
//           <>
//             <input
//               type="number"
//               value={padding.top}
//               onChange={(e) => handlePaddingChange(e, "top")}
//               className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
//               placeholder="All"
//             />
//           </>
//         ) : (
//           <div className="grid grid-cols-2 gap-2">
//             <input
//               type="number"
//               value={padding.top}
//               onChange={(e) => handlePaddingChange(e, "top")}
//               className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
//               placeholder="Top"
//             />
//             <input
//               type="number"
//               value={padding.right}
//               onChange={(e) => handlePaddingChange(e, "right")}
//               className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
//               placeholder="Right"
//             />
//             <input
//               type="number"
//               value={padding.bottom}
//               onChange={(e) => handlePaddingChange(e, "bottom")}
//               className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
//               placeholder="Bottom"
//             />
//             <input
//               type="number"
//               value={padding.left}
//               onChange={(e) => handlePaddingChange(e, "left")}
//               className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
//               placeholder="Left"
//             />
//           </div>
//         )}
//         <button
//           onClick={handleUniformToggle}
//           className={`p-2 rounded-lg border transition-all ${
//             isUniform
//               ? "bg-slate-100 text-slate-500"
//               : "bg-slate-300 text-slate-700"
//           } focus:outline-none`}
//           title="Toggle Uniform Padding"
//         >
//           {isUniform ? "🔒" : "🔓"}
//         </button>
//       </div>
//     </div>
//   );
// };

// function Landing() {
//   const VIRTUAL_VIEWPORT_WIDTH = 1920;

//   const [selectedSection, setSelectedSection] = useState(0);
//   const [selectedKey, setSelectedKey] = useState("containerStyle");

//   const [struct, setStruct] = useState([
//     {
//       item_ranked: 1,
//       title: "",
//       type: "customGrid",
//       containerStyle: {},
//       innerContainerStyle: {
//         display: "grid",
//         gridTemplateColumns: "repeat(5, 1fr)",
//       },
//       boxStyle: {
//         backgroundColor: "white",
//         borderRadius: "10px",
//       },
//       items: [
//         {
//           image:
//             "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//           type: "card3",
//           route: "chocolate",
//           text: "Bouquet Of 8 Royal Red Roses",
//           cardStyle: {
//             borderRadius: "30px",
//           },
//         },
//         {
//           image:
//             "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//           type: "card3",
//           route: "chocolate",
//           text: "Bouquet Of 8 Royal Red Roses",
//           cardStyle: {
//             borderRadius: "30px",
//           },
//         },
//         {
//           image:
//             "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//           type: "card3",
//           route: "chocolate",
//           text: "Bouquet Of 8 Royal Red Roses",
//           cardStyle: {
//             borderRadius: "30px",
//           },
//         },
//         {
//           image:
//             "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//           type: "card3",
//           route: "chocolate",
//           text: "Bouquet Of 8 Royal Red Roses",
//           cardStyle: {
//             borderRadius: "30px",
//           },
//         },
//         {
//           image:
//             "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//           type: "card3",
//           route: "chocolate",
//           text: "Bouquet Of 8 Royal Red Roses",
//           cardStyle: {
//             borderRadius: "30px",
//           },
//         },
//       ],
//     },
//   ]);

//   const addSection = () => {
//     setStruct((prev) => [
//       ...prev,
//       {
//         item_ranked: prev.length + 1,
//         title: "",
//         type: "customGrid",
//         containerStyle: {},
//         innerContainerStyle: {
//           display: "grid",
//           gridTemplateColumns: "repeat(5, 1fr)",
//         },
//         boxStyle: {
//           backgroundColor: "white",
//           borderRadius: "10px",
//         },
//         items: [
//           {
//             image:
//               "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//             type: "card3",
//             route: "chocolate",
//             text: "Bouquet Of 8 Royal Red Roses",
//             cardStyle: {
//               borderRadius: "30px",
//             },
//           },
//           ,
//         ],
//       },
//     ]);
//   };

//   const handleUpdatePadding = (padding) => {
//     setStruct((prevStruct) =>
//       prevStruct.map((section, index) => {
//         if (index === selectedSection) {
//           // Assuming you're updating the first item in the struct array
//           return {
//             ...section,
//             containerStyle: {
//               ...section.containerStyle,
//               paddingTop: `${padding.top}px`,
//               paddingRight: `${padding.right}px`,
//               paddingBottom: `${padding.bottom}px`,
//               paddingLeft: `${padding.left}px`,
//             },
//           };
//         }
//         return section;
//       })
//     );
//   };

//   const handleSetSelectedSection = (e) => {
//     const index = e.target.closest("[data-index]")?.getAttribute("data-index");
//     if (index !== null) {
//       setSelectedSection(Number(index));
//     }
//   };

//   const toggleStyleTag = (styles) => {
//     setSelectedKey((prev) => (prev === styles ? null : styles));
//   };

//   const GetComponents = ({ data }) => {
//     const components = {
//       carusel_full: (
//         <div>
//           <Carousel slides={data.items} data={data} />
//         </div>
//       ),
//       carousel: (
//         <div>
//           <CardCarousel cards={data} />
//         </div>
//       ),
//       grid: (
//         <div>
//           <CategoriesCard data={data.items} />
//         </div>
//       ),
//       text: (
//         <div>
//           <TextTitleComponent
//             title={data?.title ?? ""}
//             description={data?.description ?? ""}
//           />
//         </div>
//       ),
//       customGrid: <CustomGrid cards={data} />,
//     };
//     return components[data.type] || "hiiiii";
//   };

//   return (
//     <div className="grid grid-cols-[15%,60%,25%]    absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
//       <div className=" p-5">
//         <div
//           onClick={handleSetSelectedSection}
//           className="bg-white w-full h-full border rounded-2xl p-3"
//         >
//           {struct?.map((section, index) => (
//             <div
//               key={index}
//               role="button"
//               data-index={index}
//               className={twMerge(
//                 "text-slate-800 flex w-full items-center p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 text-sm font-medium hover:translate-x-2 rounded-lg",
//                 selectedSection === index && "border border-slate-500"
//               )}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="w-5 h-5 mr-2"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M9.493 2.852a.75.75 0 0 0-1.486-.204L7.545 6H4.198a.75.75 0 0 0 0 1.5h3.14l-.69 5H3.302a.75.75 0 0 0 0 1.5h3.14l-.435 3.148a.75.75 0 0 0 1.486.204L7.955 14h2.986l-.434 3.148a.75.75 0 0 0 1.486.204L12.456 14h3.346a.75.75 0 0 0 0-1.5h-3.14l.69-5h3.346a.75.75 0 0 0 0-1.5h-3.14l.435-3.148a.75.75 0 0 0-1.486-.204L12.045 6H9.059l.434-3.148ZM8.852 7.5l-.69 5h2.986l.69-5H8.852Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               {section?.title || `Section ${index + 1}`}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="size-5 ml-auto hidden hover:visible "
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="p-5">
//         <div className="bg-white w-full h-[95svh] border rounded-2xl p-3  flex flex-col overflow-y-auto">
//           {struct?.map((section, index) => (
//             <section
//               key={index}
//               style={section.containerStyle}
//               className={twMerge(
//                 index > 0 && "p-0 mx-auto max-w-[1600px] w-full"
//               )}
//             >
//               <GetComponents data={section} />
//             </section>
//           ))}
//           <button
//             type="button"
//             onClick={addSection}
//             className="border-2 w-full border-dashed min-h-32 h-32 rounded-xl flex justify-center items-center hover:bg-slate-100 mt-4"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 4.5v15m7.5-7.5h-15"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       <div className="p-5">
//         <div className="bg-white w-full h-full border rounded-2xl p-3">
//           {["containerStyle", "innerContainerStyle", "boxStyle"].map(
//             (styleTag, index) => (
//               <div key={index}>
//                 {/* Section header */}
//                 <div
//                   role="button"
//                   data-index={styleTag}
//                   onClick={() => toggleStyleTag(styleTag)}
//                   className="text-slate-800 flex justify-between w-full items-center p-3 transition-all hover:bg-slate-100 text-sm font-medium rounded-lg cursor-pointer"
//                 >
//                   <span>{styleTag}</span>
//                   <span>{selectedKey === styleTag ? "▲" : "▼"}</span>
//                 </div>

//                 {/* Expandable content */}
//                 {selectedKey === "containerStyle" ? (
//                   <div className="p-3 bg-slate-50 rounded-lg mt-2">
//                     <PaddingControl updatePadding={handleUpdatePadding} />
//                   </div>
//                 ) : (
//                   <></>
//                 )}
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Landing;

// import React, { useState, useRef, useEffect } from 'react';
// import IframeResizer from 'iframe-resizer-react';
// import TextTitleComponent from '../../home/TextTitleComponent';
// import CategoriesCard from '../../home/CategoriesCard';
// import CardCarousel from '../../home/CardCarousel';
// import Carousel from '../../home/CarouselSlider';
// import { twMerge } from 'tailwind-merge';
// import CustomGrid from '../../home/CustomGrid';

// function Landing() {
//     const [struct, setStruct] = useState([]);
//     const [deviceWidth, setDeviceWidth] = useState('100%');
//     const iframeRef = useRef(null);

//     const addSection = () => {
//         const newSection = {
//             item_ranked: struct.length + 1,
//             title: "",
//             type: "customGrid",
//             containerStyle: {},
//             innerContainerStyle: {
//                 display: "grid",
//                 gridTemplateColumns: "repeat(5, 1fr)",
//             },
//             boxStyle: {
//                 backgroundColor: "white",
//                 borderRadius: "10px",
//             },
//             items: [
//                 {
//                     image: "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//                     type: "card3",
//                     route: "chocolate",
//                     text: "Bouquet Of 8 Royal Red Roses",
//                     cardStyle: {
//                         borderRadius: "30px",
//                     },
//                 },
//             ],
//         };

//         setStruct(prev => [...prev, newSection]);

//         // Send message to iframe to update content
//         if (iframeRef.current?.iframeRef?.current) {
//             iframeRef.current.iframeRef.current.contentWindow.postMessage({
//                 type: 'UPDATE_CONTENT',
//                 content: [...struct, newSection]
//             }, '*');
//         }
//     };

//     // Generate the preview HTML with necessary scripts and styles
//     const generatePreviewContent = () => `
//         <!DOCTYPE html>
//         <html>
//             <head>
//                 <meta charset="utf-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1">
//                 <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js"></script>
//                 <script src="https://cdn.tailwindcss.com"></script>
//                 ${/* Add any other required CSS/JS resources */ ''}
//                 <style>
//                     body { margin: 0; }
//                     .preview-content { width: 100%; min-height: 100vh; }
//                 </style>
//                 <script>
//                     // Handle messages from parent window
//                     window.addEventListener('message', function(event) {
//                         if (event.data.type === 'UPDATE_CONTENT') {
//                             renderContent(event.data.content);
//                         }
//                     });

//                     // Function to render components
//                     function renderContent(sections) {
//                         const root = document.getElementById('preview-root');
//                         root.innerHTML = sections.map((section, index) => {
//                             return generateSectionHTML(section, index);
//                         }).join('');
//                     }

//                     // Generate HTML for different component types
//                     function generateSectionHTML(section, index) {
//                         let html = '';
//                         switch(section.type) {
//                             case 'customGrid':
//                                 html = \`
//                                     <div class="grid grid-cols-5 gap-4 p-4">
//                                         \${section.items.map(item => \`
//                                             <div class="bg-white rounded-lg shadow-md p-4">
//                                                 <img src="\${item.image}" alt="\${item.text}" class="w-full h-auto rounded-lg">
//                                                 <p class="mt-2 text-center">\${item.text}</p>
//                                             </div>
//                                         \`).join('')}
//                                     </div>
//                                 \`;
//                                 break;
//                             case 'text':
//                                 html = \`
//                                     <div class="p-4">
//                                         <h2 class="text-2xl font-bold">\${section.title}</h2>
//                                         <p class="mt-2">\${section.description}</p>
//                                     </div>
//                                 \`;
//                                 break;
//                             // Add other component types as needed
//                         }
//                         return \`<section class="mb-8" style="\${generateStyles(section.containerStyle)}">\${html}</section>\`;
//                     }

//                     function generateStyles(styles) {
//                         return Object.entries(styles || {})
//                             .map(([key, value]) => \`\${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: \${value}\`)
//                             .join(';');
//                     }
//                 </script>
//             </head>
//             <body>
//                 <div id="preview-root" class="preview-content"></div>
//             </body>
//         </html>
//     `;

//     const devicePresets = [
//         { name: 'Mobile', width: '375px' },
//         { name: 'Tablet', width: '768px' },
//         { name: 'Desktop', width: '100%' },
//     ];

//     // Initial content setup
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             if (iframeRef.current?.iframeRef?.current) {
//                 iframeRef.current.iframeRef.current.contentWindow.postMessage({
//                     type: 'UPDATE_CONTENT',
//                     content: struct
//                 }, '*');
//             }
//         }, 100);

//         return () => clearTimeout(timer);
//     }, []); // Run once on mount

//     return (
//         <div className="grid grid-cols-[25%,50%,25%] absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
//             {/* Left Sidebar */}
//             <div className='p-5'>
//                 <div className='bg-white w-full h-full border rounded-2xl p-3'>
//                     {/* Sidebar controls */}
//                 </div>
//             </div>

//             {/* Preview Section */}
//             <div className='p-5'>
//                 <div className='bg-white w-full h-full border rounded-2xl p-3 flex flex-col'>
//                     {/* Device Selection */}
//                     <div className="flex gap-4 mb-4 p-2 border-b">
//                         {devicePresets.map((device) => (
//                             <button
//                                 key={device.name}
//                                 onClick={() => setDeviceWidth(device.width)}
//                                 className={`px-4 py-2 rounded ${
//                                     deviceWidth === device.width
//                                     ? 'bg-blue-500 text-white'
//                                     : 'bg-gray-100'
//                                 }`}
//                             >
//                                 {device.name}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Preview Container */}
//                     <div className="flex-1 overflow-hidden flex justify-center bg-gray-100">
//                         <div
//                             style={{
//                                 width: deviceWidth,
//                                 transition: 'width 0.3s ease'
//                             }}
//                             className="bg-white h-full shadow-lg"
//                         >
//                             <IframeResizer
//                                 ref={iframeRef}
//                                 srcDoc={generatePreviewContent()}
//                                 style={{
//                                     width: '1px',
//                                     minWidth: '100%',
//                                     height: '100%',
//                                     border: 'none'
//                                 }}
//                                 heightCalculationMethod="lowestElement"
//                                 inPageLinks
//                                 checkOrigin={false}
//                                 scrolling="auto"
//                             />
//                         </div>
//                     </div>

//                     {/* Add Section Button */}
//                     <button
//                         type='button'
//                         onClick={addSection}
//                         className='border-2 w-full border-dashed h-32 rounded-xl flex justify-center items-center hover:bg-slate-100 mt-4'
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth={1.5}
//                             stroke="currentColor"
//                             className="size-6"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M12 4.5v15m7.5-7.5h-15"
//                             />
//                         </svg>
//                     </button>
//                 </div>
//             </div>

//             {/* Right Sidebar */}
//             <div className='p-5'>
//                 <div className='bg-white w-full h-full border rounded-2xl p-3'>
//                     {/* Configuration controls could go here */}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Landing;

// Extracted to a separate component for better organization
const SectionButton = ({ index, title, isSelected, onSelect }) => (
  <button
    data-index={index}
    onClick={() => onSelect(index)}
    className={twMerge(
      "text-slate-800 flex w-full items-center p-3 transition-all hover:bg-slate-100 text-sm font-medium hover:translate-x-2 rounded-lg",
      isSelected && "border border-slate-500"
    )}
  >
    <HashtagIcon className="w-5 h-5 mr-2" />
    <span>{title || `Section ${index + 1}`}</span>
    <DeleteIcon className="size-5 ml-auto opacity-0 hover:opacity-100" />
  </button>
);

// Separated icons for better reusability
const HashtagIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.493 2.852a.75.75 0 0 0-1.486-.204L7.545 6H4.198a.75.75 0 0 0 0 1.5h3.14l-.69 5H3.302a.75.75 0 0 0 0 1.5h3.14l-.435 3.148a.75.75 0 0 0 1.486.204L7.955 14h2.986l-.434 3.148a.75.75 0 0 0 1.486.204L12.456 14h3.346a.75.75 0 0 0 0-1.5h-3.14l.69-5h3.346a.75.75 0 0 0 0-1.5h-3.14l.435-3.148a.75.75 0 0 0-1.486-.204L12.045 6H9.059l.434-3.148ZM8.852 7.5l-.69 5h2.986l.69-5H8.852Z"
      clipRule="evenodd"
    />
  </svg>
);

const DeleteIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
      clipRule="evenodd"
    />
  </svg>
);

// Separated padding control into its own component file
const PaddingControl = ({ updatePadding, initialPadding }) => {
  const [isUniform, setIsUniform] = useState(true);
  const [padding, setPadding] = useState(
    initialPadding || {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }
  );

  const handleUniformToggle = useCallback(() => {
    setIsUniform((prev) => {
      if (!prev) {
        setPadding((current) => ({
          top: current.top,
          right: current.top,
          bottom: current.top,
          left: current.top,
        }));
      }
      return !prev;
    });
  }, []);

  const handlePaddingChange = useCallback(
    (e, side) => {
      const value = parseInt(e.target.value, 10) || 0;
      setPadding((prev) => {
        const newPadding = isUniform
          ? { top: value, right: value, bottom: value, left: value }
          : { ...prev, [side]: value };
        updatePadding(newPadding);
        return newPadding;
      });
    },
    [isUniform, updatePadding]
  );

  return (
    <div className=" px-4 py-2">
      <label className="text-sm font-medium text-slate-800">Padding</label>
      <div className="flex items-center space-x-2 mt-2">
        {isUniform ? (
          <input
            type="number"
            value={padding.top}
            onChange={(e) => handlePaddingChange(e, "top")}
            className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
            placeholder="All"
          />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(padding).map(([side, value]) => (
              <input
                key={side}
                type="number"
                value={value}
                onChange={(e) => handlePaddingChange(e, side)}
                className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
                placeholder={side.charAt(0).toUpperCase() + side.slice(1)}
              />
            ))}
          </div>
        )}
        <button
          onClick={handleUniformToggle}
          className={`p-2 rounded-lg border transition-all ${
            isUniform
              ? "bg-slate-100 text-slate-500"
              : "bg-slate-300 text-slate-700"
          } focus:outline-none`}
          title="Toggle Uniform Padding"
        >
          {isUniform ? "🔒" : "🔓"}
        </button>
      </div>
    </div>
  );
};
const GapControl = ({ updateGap, initialGap }) => {
  const [gap, setGap] = useState(initialGap || 0);

  const handleGapChange = useCallback(
    (e, side) => {
      const value = parseInt(e.target.value, 10) || 0;
      setGap((prev) => {
        updateGap(value);
        return value;
      });
    },
    [updateGap]
  );

  return (
    <div className=" py-2 px-4 ">
      <label className="text-sm font-medium text-slate-800">Gap</label>
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="number"
          value={gap || 0}
          onChange={handleGapChange}
          className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
          placeholder="All"
        />
      </div>
    </div>
  );
};

const RangeSlider = ({ min = 1, max = 10, initial = 5, onChange }) => {
  const [value, setValue] = useState(initial);

  const handleSliderChange = useCallback(
    (e) => {
      const newValue = parseInt(e.target.value, 10);
      setValue(newValue);
      if (onChange) onChange(newValue);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e) => {
      let newValue = parseInt(e.target.value, 10);
      if (isNaN(newValue)) newValue = min;
      newValue = Math.max(min, Math.min(newValue, max)); // Clamp within range
      setValue(newValue);
      if (onChange) onChange(newValue);
    },
    [min, max, onChange]
  );

  return (
    <div className="flex items-center space-x-4 py-2 px-4 ">
      <label className="text-sm font-medium text-slate-800">Value:</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring focus:ring-slate-300"
      />
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
      />
    </div>
  );
};

// Main component
const Landing = () => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [selectedKey, setSelectedKey] = useState("containerStyle");
  const [struct, setStruct] = useState([
    {
      item_ranked: 1,
      title: "",
      type: "customGrid",
      containerStyle: {},
      innerContainerStyle: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
      },
      boxStyle: {
        backgroundColor: "white",
        borderRadius: "10px",
      },
      items: Array(5).fill({
        image:
          "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
        type: "card3",
        route: "chocolate",
        text: "Bouquet Of 8 Royal Red Roses",
        cardStyle: {
          borderRadius: "30px",
        },
      }),
    },
  ]);

  console.log("struct: ", struct);
  const addSection = useCallback(() => {
    setStruct((prev) => [
      ...prev,
      {
        item_ranked: prev.length + 1,
        title: "",
        type: "customGrid",
        containerStyle: {},
        innerContainerStyle: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
        },
        boxStyle: {
          backgroundColor: "white",
          borderRadius: "10px",
        },
        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "chocolate",
            text: "Bouquet Of 8 Royal Red Roses",
            cardStyle: {
              borderRadius: "30px",
            },
          },
        ],
      },
    ]);
  }, []);

  const handleUpdatePadding = useCallback(
    (padding) => {
      setStruct((prev) => {
        return prev.map((section, index) => {
          if (index === selectedSection) {
            return {
              ...section,
              [selectedKey]: {
                ...section[selectedKey],
                paddingTop: `${padding.top}px`,
                paddingRight: `${padding.right}px`,
                paddingBottom: `${padding.bottom}px`,
                paddingLeft: `${padding.left}px`,
              },
            };
          }
          return section;
        });
      });
    },
    [selectedSection, selectedKey] // Add selectedKey to dependencies
  );

  const handleUpdate = useCallback(({ label, value, keySelected }) => {
    console.log("label, value, sectionSelected: ", label, value, keySelected);
    setStruct((prev) => {
      return prev.map((section, index) => {
        if (index === selectedSection) {
          return {
            ...section,
            [keySelected || selectedKey]: {
              ...section[keySelected || selectedKey],
              [label]: value,
            },
          };
        }
        return section;
      });
    });
  });

  const handleItemCount = (value) => {
    // handleUpdate({
    //   label: "gridTemplateColumns",
    //   value: `repeat(${value}, 1fr)`,
    //   keySelected: "innerContainerStyle",
    // });
    setStruct((prev) => {
      return prev.map((section, index) => {
        if (index === selectedSection) {
          return {
            ...section,
            items: Array(value).fill({
              image:
                "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
              type: "card3",
              route: "chocolate",
              text: "Bouquet Of 8 Royal Red Roses",
              cardStyle: {
                borderRadius: "30px",
              },
            }),
          };
        }
        return section;
      });
    });
  };

  const toggleStyleTag = useCallback((styles) => {
    setSelectedKey((prev) => (prev === styles ? null : styles));
  }, []);

  const components = useMemo(
    () => ({
      carusel_full: ({ data }) => (
        <div>
          <Carousel slides={data.items} data={data} />
        </div>
      ),
      carousel: ({ data }) => (
        <div>
          <CardCarousel cards={data} />
        </div>
      ),
      grid: ({ data }) => (
        <div>
          <CategoriesCard data={data.items} />
        </div>
      ),
      text: ({ data }) => (
        <div>
          <TextTitleComponent
            title={data?.title ?? ""}
            description={data?.description ?? ""}
          />
        </div>
      ),
      customGrid: ({ data }) => <CustomGrid cards={data} />,
    }),
    []
  );

  const GetComponents = useCallback(
    ({ data }) => {
      const Component = components[data.type];
      return Component ? (
        <Component data={data} />
      ) : (
        <div>Component not found</div>
      );
    },
    [components]
  );

  return (
    <div className="grid grid-cols-[15%,60%,25%] absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      {/* Sidebar */}
      <div className="p-5">
        <div className="bg-white w-full h-full border rounded-2xl p-3">
          {struct?.map((section, index) => (
            <SectionButton
              key={index}
              index={index}
              title={section.title}
              isSelected={selectedSection === index}
              onSelect={setSelectedSection}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        <div className="bg-white w-full h-[95svh] border rounded-2xl p-3 flex flex-col overflow-y-auto">
          {struct?.map((section, index) => (
            <section
              key={index}
              style={section.containerStyle}
              className={twMerge(
                index > 0 && "p-0 mx-auto max-w-[1600px] w-full"
              )}
            >
              <GetComponents data={section} />
            </section>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="border-2 w-full border-dashed min-h-32 h-32 rounded-xl flex justify-center items-center hover:bg-slate-100 mt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="p-5">
        <div className="bg-white w-full h-full border rounded-2xl p-3">
          {["containerStyle", "boxStyle", "innerContainerStyle"].map(
            (styleTag) => (
              <div
                key={styleTag}
                className={
                  selectedKey === styleTag && " bg-slate-50 rounded-lg"
                }
              >
                <div
                  role="button"
                  onClick={() => toggleStyleTag(styleTag)}
                  className="text-slate-800 flex justify-between w-full items-center p-3 transition-all hover:bg-slate-100 text-sm font-medium rounded-lg cursor-pointer"
                >
                  <span>{styleTag}</span>
                  <span>{selectedKey === styleTag ? "▲" : "▼"}</span>
                </div>

                {selectedKey === styleTag && (
                  <div className="p-3 ">
                    <div className="bg-white  border rounded-2xl shadow-md divide-y">
                      <>
                        <PaddingControl
                          updatePadding={handleUpdatePadding}
                          initialPadding={{
                            top:
                              parseInt(
                                struct[selectedSection]?.[styleTag]?.paddingTop
                              ) || 0,
                            right:
                              parseInt(
                                struct[selectedSection]?.[styleTag]
                                  ?.paddingRight
                              ) || 0,
                            bottom:
                              parseInt(
                                struct[selectedSection]?.[styleTag]
                                  ?.paddingBottom
                              ) || 0,
                            left:
                              parseInt(
                                struct[selectedSection]?.[styleTag]?.paddingLeft
                              ) || 0,
                          }}
                        />
                        {styleTag === "innerContainerStyle" && (
                          <>
                            <GapControl
                              updateGap={(value) =>
                                handleUpdate({
                                  label: "gap",
                                  value: `${value}px`,
                                })
                              }
                              initial={
                                parseInt(
                                  struct[selectedSection]?.[styleTag]?.gap
                                ) || 0
                              }
                            />
                            <RangeSlider
                              initial={
                                struct[selectedSection]?.items?.length ?? 0
                              }
                              onChange={(value) =>
                                handleUpdate({
                                  label: "gridTemplateColumns",
                                  value: `repeat(${value}, 1fr)`,
                                })
                              }
                            />
                          </>
                        )}
                      </>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
          <div key={"items"}>
            <div
              role="button"
              onClick={() => toggleStyleTag("items")}
              className="text-slate-800 flex justify-between w-full items-center p-3 transition-all hover:bg-slate-100 text-sm font-medium rounded-lg cursor-pointer"
            >
              <span>{"items"}</span>
              <span>{selectedKey === "items" ? "▲" : "▼"}</span>
            </div>

            {selectedKey === "items" && (
              <div className="p-3 bg-slate-50 rounded-lg mt-2">
                <div className="bg-white  border rounded-2xl shadow-md divide-y">
                  <>
                    <RangeSlider
                      initial={struct[selectedSection]?.items?.length ?? 0}
                      onChange={handleItemCount}
                    />
                  </>
                {struct[selectedSection]?.items?.map((item, index) => (
                  <div className="flex items-center space-x-4 py-2 px-4 ">item {index + 1}</div>
                ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
