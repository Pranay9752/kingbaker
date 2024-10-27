// import React, { useState } from 'react'
// import TextTitleComponent from '../../home/TextTitleComponent';
// import CategoriesCard from '../../home/CategoriesCard';
// import CardCarousel from '../../home/CardCarousel';
// import Carousel from '../../home/CarouselSlider';
// import { twMerge } from 'tailwind-merge';
// import CustomGrid from '../../home/CustomGrid';

// function Landing() {
//     const VIRTUAL_VIEWPORT_WIDTH = 1920;

//     const [struct, setStruct] = useState([{
//         item_ranked: 1,
//         title: "",
//         type: "customGrid",
//         containerStyle: {},
//         innerContainerStyle: {
//             display: "grid",
//             gridTemplateColumns: "repeat(5, 1fr)",
//         },
//         boxStyle: {
//             backgroundColor: "white",
//             borderRadius: "10px",
//         },
//         items: [
//             {
//                 image:
//                     "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//                 type: "card3",
//                 route: "chocolate",
//                 text: "Bouquet Of 8 Royal Red Roses",
//                 cardStyle: {
//                     borderRadius: "30px",
//                 },
//             },
//             {
//                 image:
//                     "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//                 type: "card3",
//                 route: "chocolate",
//                 text: "Bouquet Of 8 Royal Red Roses",
//                 cardStyle: {
//                     borderRadius: "30px",
//                 },
//             },
//             {
//                 image:
//                     "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//                 type: "card3",
//                 route: "chocolate",
//                 text: "Bouquet Of 8 Royal Red Roses",
//                 cardStyle: {
//                     borderRadius: "30px",
//                 },
//             },
//             {
//                 image:
//                     "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//                 type: "card3",
//                 route: "chocolate",
//                 text: "Bouquet Of 8 Royal Red Roses",
//                 cardStyle: {
//                     borderRadius: "30px",
//                 },
//             },
//             {
//                 image:
//                     "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//                 type: "card3",
//                 route: "chocolate",
//                 text: "Bouquet Of 8 Royal Red Roses",
//                 cardStyle: {
//                     borderRadius: "30px",
//                 },
//             },
            
//         ],
//     }])

//     const addSection = () => {
//         setStruct((prev) => [...prev, {
//             item_ranked: prev.length + 1,
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
//                     image:
//                         "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//                     type: "card3",
//                     route: "chocolate",
//                     text: "Bouquet Of 8 Royal Red Roses",
//                     cardStyle: {
//                         borderRadius: "30px",
//                     },
//                 },
//                 ,
//             ],
//         },])
//     }

//     const GetComponents = ({ data }) => {
//         const components = {
//             carusel_full: (
//                 <div>
//                     <Carousel slides={data.items} data={data} />
//                 </div>
//             ),
//             carousel: (
//                 <div>
//                     <CardCarousel cards={data} />
//                 </div>
//             ),
//             grid: (
//                 <div>
//                     <CategoriesCard data={data.items} />
//                 </div>
//             ),
//             text: (
//                 <div>
//                     <TextTitleComponent
//                         title={data?.title ?? ""}
//                         description={data?.description ?? ""}
//                     />
//                 </div>
//             ),
//             customGrid: <CustomGrid cards={data} />,
//         };
//         return components[data.type] || "hiiiii";
//     };

//     return (
//         <div className="grid grid-cols-[25%,50%,25%]    absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
//             <div className=' p-5'>
//                 <div className='bg-white w-full h-full border rounded-2xl p-3'>

//                 </div>
//             </div>
//             {/* <div className='p-5'>
//                 <div className='bg-white w-full h-full border rounded-2xl p-3 overflow-y-auto flex flex-col '>
//                     {
//                         struct?.map((section, index) => <section key={index} style={section.containerStyle} className={twMerge(index > 0 && "p-0 mx-auto max-w-[1600px] w-full")}>
//                             <GetComponents data={section} />
//                         </section>)
//                     }
//                     <button type='button' onClick={addSection} className='border-2 w-full border-dashed h-32 rounded-xl flex justify-center items-center hover:bg-slate-100 mt-4'>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                         </svg>

//                     </button>
//                 </div>
//             </div> */}
//               {/* Preview Container */}
//               <div className='p-5 flex justify-center'>
//                 <div className='bg-white border rounded-2xl p-3 overflow-hidden w-full'>
//                     {/* Scaling Container */}
//                     <div className="relative w-full h-full overflow-y-auto">
//                         {/* Virtual Viewport */}
//                         <div 
//                             className="origin-top"
//                             style={{
//                                 width: VIRTUAL_VIEWPORT_WIDTH,
//                                 transform: `scale(${window.innerWidth * 0.5 / VIRTUAL_VIEWPORT_WIDTH})`,
//                                 transformOrigin: 'top left',
//                             }}
//                         >
//                             <div className="min-h-screen bg-white">
//                                 {struct?.map((section, index) => (
//                                     <section 
//                                         key={index} 
//                                         style={section.containerStyle} 
//                                         className={twMerge(
//                                             index > 0 && "p-0 mx-auto max-w-[1600px] w-full"
//                                         )}
//                                     >
//                                         <GetComponents data={section} />
//                                     </section>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
                    
//                     {/* Add Section Button - Outside the scaled container */}
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
            
//             <div className='p-5'>
//                 <div className='bg-white w-full h-full border rounded-2xl p-3'>

//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Landing


import React, { useState, useRef, useEffect } from 'react';
import IframeResizer from 'iframe-resizer-react';
import TextTitleComponent from '../../home/TextTitleComponent';
import CategoriesCard from '../../home/CategoriesCard';
import CardCarousel from '../../home/CardCarousel';
import Carousel from '../../home/CarouselSlider';
import { twMerge } from 'tailwind-merge';
import CustomGrid from '../../home/CustomGrid';

function Landing() {
    const [struct, setStruct] = useState([]);
    const [deviceWidth, setDeviceWidth] = useState('100%');
    const iframeRef = useRef(null);

    const addSection = () => {
        const newSection = {
            item_ranked: struct.length + 1,
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
                    image: "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
                    type: "card3",
                    route: "chocolate",
                    text: "Bouquet Of 8 Royal Red Roses",
                    cardStyle: {
                        borderRadius: "30px",
                    },
                },
            ],
        };

        setStruct(prev => [...prev, newSection]);

        // Send message to iframe to update content
        if (iframeRef.current?.iframeRef?.current) {
            iframeRef.current.iframeRef.current.contentWindow.postMessage({
                type: 'UPDATE_CONTENT',
                content: [...struct, newSection]
            }, '*');
        }
    };

    // Generate the preview HTML with necessary scripts and styles
    const generatePreviewContent = () => `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js"></script>
                <script src="https://cdn.tailwindcss.com"></script>
                ${/* Add any other required CSS/JS resources */ ''}
                <style>
                    body { margin: 0; }
                    .preview-content { width: 100%; min-height: 100vh; }
                </style>
                <script>
                    // Handle messages from parent window
                    window.addEventListener('message', function(event) {
                        if (event.data.type === 'UPDATE_CONTENT') {
                            renderContent(event.data.content);
                        }
                    });

                    // Function to render components
                    function renderContent(sections) {
                        const root = document.getElementById('preview-root');
                        root.innerHTML = sections.map((section, index) => {
                            return generateSectionHTML(section, index);
                        }).join('');
                    }

                    // Generate HTML for different component types
                    function generateSectionHTML(section, index) {
                        let html = '';
                        switch(section.type) {
                            case 'customGrid':
                                html = \`
                                    <div class="grid grid-cols-5 gap-4 p-4">
                                        \${section.items.map(item => \`
                                            <div class="bg-white rounded-lg shadow-md p-4">
                                                <img src="\${item.image}" alt="\${item.text}" class="w-full h-auto rounded-lg">
                                                <p class="mt-2 text-center">\${item.text}</p>
                                            </div>
                                        \`).join('')}
                                    </div>
                                \`;
                                break;
                            case 'text':
                                html = \`
                                    <div class="p-4">
                                        <h2 class="text-2xl font-bold">\${section.title}</h2>
                                        <p class="mt-2">\${section.description}</p>
                                    </div>
                                \`;
                                break;
                            // Add other component types as needed
                        }
                        return \`<section class="mb-8" style="\${generateStyles(section.containerStyle)}">\${html}</section>\`;
                    }

                    function generateStyles(styles) {
                        return Object.entries(styles || {})
                            .map(([key, value]) => \`\${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: \${value}\`)
                            .join(';');
                    }
                </script>
            </head>
            <body>
                <div id="preview-root" class="preview-content"></div>
            </body>
        </html>
    `;

    const devicePresets = [
        { name: 'Mobile', width: '375px' },
        { name: 'Tablet', width: '768px' },
        { name: 'Desktop', width: '100%' },
    ];

    // Initial content setup
    useEffect(() => {
        const timer = setTimeout(() => {
            if (iframeRef.current?.iframeRef?.current) {
                iframeRef.current.iframeRef.current.contentWindow.postMessage({
                    type: 'UPDATE_CONTENT',
                    content: struct
                }, '*');
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []); // Run once on mount

    return (
        <div className="grid grid-cols-[25%,50%,25%] absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            {/* Left Sidebar */}
            <div className='p-5'>
                <div className='bg-white w-full h-full border rounded-2xl p-3'>
                    {/* Sidebar controls */}
                </div>
            </div>

            {/* Preview Section */}
            <div className='p-5'>
                <div className='bg-white w-full h-full border rounded-2xl p-3 flex flex-col'>
                    {/* Device Selection */}
                    <div className="flex gap-4 mb-4 p-2 border-b">
                        {devicePresets.map((device) => (
                            <button
                                key={device.name}
                                onClick={() => setDeviceWidth(device.width)}
                                className={`px-4 py-2 rounded ${
                                    deviceWidth === device.width 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100'
                                }`}
                            >
                                {device.name}
                            </button>
                        ))}
                    </div>

                    {/* Preview Container */}
                    <div className="flex-1 overflow-hidden flex justify-center bg-gray-100">
                        <div 
                            style={{ 
                                width: deviceWidth,
                                transition: 'width 0.3s ease'
                            }}
                            className="bg-white h-full shadow-lg"
                        >
                            <IframeResizer
                                ref={iframeRef}
                                srcDoc={generatePreviewContent()}
                                style={{ 
                                    width: '1px',
                                    minWidth: '100%',
                                    height: '100%',
                                    border: 'none'
                                }}
                                heightCalculationMethod="lowestElement"
                                inPageLinks
                                checkOrigin={false}
                                scrolling="auto"
                            />
                        </div>
                    </div>

                    {/* Add Section Button */}
                    <button 
                        type='button' 
                        onClick={addSection} 
                        className='border-2 w-full border-dashed h-32 rounded-xl flex justify-center items-center hover:bg-slate-100 mt-4'
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
            <div className='p-5'>
                <div className='bg-white w-full h-full border rounded-2xl p-3'>
                    {/* Configuration controls could go here */}
                </div>
            </div>
        </div>
    );
}

export default Landing;