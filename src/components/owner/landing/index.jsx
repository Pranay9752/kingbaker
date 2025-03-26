import React, { useCallback, useEffect, useMemo, useState } from "react";
import TextTitleComponent from "../../home/TextTitleComponent";
import CategoriesCard from "../../home/CategoriesCard";
import CardCarousel from "../../home/CardCarousel";
import Carousel from "../../home/CarouselSlider";
import { twMerge } from "tailwind-merge";
import CustomGrid from "../../home/CustomGrid";
import BasicButton from "../../../atom/button/BasicButton";
import { toast } from "sonner";
import useImageUpload from "../../../atom/utils/useUploadImages";
import { useUpdateCarosolMutation } from "../../../redux/apiSlices/owner/landing";
import SEO from "../../../atom/seo/SEO";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import CustomSizedGrid from "../../home/CustomSizedGrid";

const styleIcons = {
  containerStyle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  boxStyle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5"
    >
      <path
        fillRule="evenodd"
        d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Zm0 4.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5ZM10 9a.75.75 0 0 1 .75.75v2.546l.943-1.048a.75.75 0 1 1 1.114 1.004l-2.25 2.5a.75.75 0 0 1-1.114 0l-2.25-2.5a.75.75 0 1 1 1.114-1.004l.943 1.048V9.75A.75.75 0 0 1 10 9Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  innerContainerStyle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5"
    >
      <path
        fillRule="evenodd"
        d="M.99 5.24A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25l.01 9.5A2.25 2.25 0 0 1 16.76 17H3.26A2.267 2.267 0 0 1 1 14.74l-.01-9.5Zm8.26 9.52v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 0 0 .627-.74Zm1.5 0a.75.75 0 0 0 .627.74h5.373a.75.75 0 0 0 .75-.75v-.615a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75v.625Zm6.75-3.63v-.625a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 0 0 .75-.75Zm-8.25 0v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 0 0 .75-.75ZM17.5 7.5v-.625a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 0 0 .75-.75Zm-8.25 0v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 0 0 .75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  items: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5"
    >
      <path
        fillRule="evenodd"
        d="M.99 5.24A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25l.01 9.5A2.25 2.25 0 0 1 16.76 17H3.26A2.267 2.267 0 0 1 1 14.74l-.01-9.5Zm8.26 9.52v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 0 0 .627-.74Zm1.5 0a.75.75 0 0 0 .627.74h5.373a.75.75 0 0 0 .75-.75v-.615a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75v.625Zm6.75-3.63v-.625a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 0 0 .75-.75Zm-8.25 0v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 0 0 .75-.75ZM17.5 7.5v-.625a.75.75 0 0 0-.75-.75H11.5a.75.75 0 0 0-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 0 0 .75-.75Zm-8.25 0v-.625a.75.75 0 0 0-.75-.75H3.25a.75.75 0 0 0-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 0 0 .75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const SectionButton = ({ index, title, isSelected, onSelect }) => (
  <button
    data-index={index}
    onClick={() => onSelect(index)}
    className={twMerge(
      "text-slate-800 flex w-full truncate items-center p-3 transition-all hover:bg-slate-100 text-sm font-medium hover:translate-x-2 rounded-lg",
      isSelected && "border border-slate-500"
    )}
  >
    <HashtagIcon className="w-5 h-5 mr-2" />
    <span className="w-[9 0%] truncate text-left">
      {title || `Section ${index + 1}`}
    </span>
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
// const PaddingControl = ({ updatePadding, initialPadding }) => {
//   const [isUniform, setIsUniform] = useState(true);
//   const [padding, setPadding] = useState(
//     initialPadding || {
//       top: 0,
//       right: 0,
//       bottom: 0,
//       left: 0,
//     }
//   );

//   const handleUniformToggle = useCallback(() => {
//     setIsUniform((prev) => {
//       if (!prev) {
//         setPadding((current) => ({
//           top: current.top,
//           right: current.top,
//           bottom: current.top,
//           left: current.top,
//         }));
//       }
//       return !prev;
//     });
//   }, []);

//   const handlePaddingChange = useCallback(
//     (e, side) => {
//       const value = parseInt(e.target.value, 10) || 0;
//       setPadding((prev) => {
//         const newPadding = isUniform
//           ? { top: value, right: value, bottom: value, left: value }
//           : { ...prev, [side]: value };
//         updatePadding(newPadding);
//         return newPadding;
//       });
//     },
//     [isUniform, updatePadding]
//   );

//   return (
//     <div className=" px-4 py-2">
//       <label className="text-sm font-medium text-slate-800">Padding</label>
//       <div className="flex items-center space-x-2 mt-2">
//         {isUniform ? (
//           <input
//             type="number"
//             value={padding.top}
//             onChange={(e) => handlePaddingChange(e, "top")}
//             className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
//             placeholder="All"
//           />
//         ) : (
//           <div className="grid grid-cols-2 gap-2">
//             {Object.entries(padding).map(([side, value]) => (
//               <input
//                 key={side}
//                 type="number"
//                 value={value}
//                 onChange={(e) => handlePaddingChange(e, side)}
//                 className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
//                 placeholder={side.charAt(0).toUpperCase() + side.slice(1)}
//               />
//             ))}
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
const PaddingControl = ({ updatePadding, initialPadding }) => {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Padding</h3>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(initialPadding).map(([side, value]) => (
          <div key={side} className="flex items-center gap-2">
            <label className="text-sm text-gray-600 capitalize w-16">
              {side}
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={value}
              onChange={(e) => updatePadding(side, parseInt(e.target.value))}
              className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              value={value}
              onChange={(e) =>
                updatePadding(side, parseInt(e.target.value) || 0)
              }
              className="w-16 px-2 py-1 text-sm text-center border border-gray-200 rounded-md"
            />
            <span className="text-sm text-gray-500">px</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// const GapControl = ({ updateGap, initialGap }) => {
//   const [gap, setGap] = useState(initialGap || 0);

//   const handleGapChange = useCallback(
//     (e, side) => {
//       const value = parseInt(e.target.value, 10) || 0;
//       setGap((prev) => {
//         updateGap(value);
//         return value;
//       });
//     },
//     [updateGap]
//   );

//   return (
//     <div className=" py-2 px-4 ">
//       <label className="text-sm font-medium text-slate-800">Gap</label>
//       <div className="flex items-center space-x-2 mt-2">
//         <input
//           type="number"
//           value={gap || 0}
//           onChange={handleGapChange}
//           className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
//           placeholder="All"
//         />
//       </div>
//     </div>
//   );
// };
const GapControl = ({ updateGap, initial }) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Gap</h3>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="40"
            value={initial}
            onChange={(e) => updateGap(parseInt(e.target.value))}
            className="w-32 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="number"
            value={initial}
            onChange={(e) => updateGap(parseInt(e.target.value) || 0)}
            className="w-16 px-2 py-1 text-sm text-center border border-gray-200 rounded-md"
          />
          <span className="text-sm text-gray-500">px</span>
        </div>
      </div>
    </div>
  );
};

const ColorInput = ({ value, onChange, label }) => (
  <div className="flex items-center gap-2">
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-8 h-8 rounded-md cursor-pointer"
    />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-24 px-2 py-1 text-sm border border-gray-200 rounded-md"
      placeholder="#000000"
    />
  </div>
);

const InputControl = ({
  updateInput,
  initialInput,
  title,
  min = 0,
  max = 100,
  unit = "px",
}) => {
  const [inputValue, setInputValue] = useState(initialInput || 0);

  const handleInputChange = useCallback(
    (e) => {
      const value = parseInt(e.target.value, 10) || 0;
      const clampedValue = Math.min(Math.max(value, min), max);
      setInputValue(clampedValue);
      updateInput(clampedValue);
    },
    [updateInput, min, max]
  );

  return (
    <div className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg">
      <label className="text-sm font-medium text-gray-700">{title}</label>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={inputValue}
          onChange={handleInputChange}
          className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            className="w-16 px-2 py-1 text-sm text-center border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
      </div>
    </div>
  );
};

const StyleSection = ({
  title,
  children,
  isActive,
  onToggle,
  IconComponent,
}) => (
  <div
    className={`border-b last:border-b-0 ${isActive ? "bg-blue-50" : "bg-white"
      }`}
  >
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {/* <IconComponent size={18} className="text-gray-400" /> */}
          {IconComponent}
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        {isActive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
    {isActive && children}
  </div>
);

// Main component
const RangeSlider = ({ initial, onChange, max = 10, label = "Columns" }) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">{label}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange(Math.max(1, initial - 1))}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
            </svg>
          </button>
          <input
            type="range"
            min="1"
            max={max}
            value={initial}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-32 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <button
            onClick={() => onChange(Math.min(max, initial + 1))}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
          </button>
          <input
            type="number"
            value={initial}
            onChange={(e) => onChange(parseInt(e.target.value) || 1)}
            className="w-16 px-2 py-1 text-sm text-center border border-gray-200 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

const Switch = ({
  initial = false,
  onChange,
  label = "Toggle me",
  helper = "",
}) => {
  return (
    <div className="flex flex-col">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={initial}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600 "></div>
        <span className="ms-3 text-sm font-medium text-gray-700 ">{label}</span>
      </label>
      {helper && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
};

const ItemEditor = ({ item, index, selectedSection, setStruct }) => {
  const { uploadImages, loading, error } = useImageUpload();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUpdate = useCallback(
    (updateFn) => {
      setStruct((prev) => {
        const newArr = [...prev];
        newArr[selectedSection] = {
          ...newArr[selectedSection],
          items: newArr[selectedSection].items.map((itm, i) =>
            i === index ? updateFn(itm) : itm
          ),
        };
        return newArr;
      });
    },
    [setStruct, selectedSection, index]
  );

  const onDelete = () => {
    setStruct((prev) => {
      const newArr = [...prev];
      newArr[selectedSection] = {
        ...newArr[selectedSection],
        items: newArr[selectedSection].items.map((itm, i) =>
          i === index
            ? {
              image: "",
              type: "card3",
              route: "",
              text: "",
              cardStyle: {
                borderRadius: "30px",
              },
            }
            : itm
        ),
      };
      return newArr;
    });
  };

  const handleStyleUpdate = useCallback(
    (property, value) => {
      handleUpdate((item) => ({
        ...item,
        cardStyle: {
          ...item.cardStyle,
          [property]: value,
        },
      }));
    },
    [handleUpdate]
  );

  const handleImageUpload = useCallback(
    (event) => {
      const files = Array.from(event.target.files);
      if (files) {
        setIsModalVisible(true);

        uploadImages(files, (uploadedUrls) => {
          const imageUrl = uploadedUrls[0];
          handleUpdate((item) => ({ ...item, image: imageUrl }));

          setTimeout(() => setIsModalVisible(false), 2000);

        });
      }
    },
    [handleUpdate]
  );

  return (
    <>

      <div className="w-full max-w-2xl p-6 space-y-6 bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Card {index + 1}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Title Input */}
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ext-gray-400 size-5"
            >
              <polyline points="4 7 4 4 20 4 20 7" />
              <line x1="9" x2="15" y1="20" y2="20" />
              <line x1="12" x2="12" y1="4" y2="20" />
            </svg>
            <input
              value={item?.text ?? ""}
              onChange={(e) =>
                handleUpdate((item) => ({ ...item, text: e.target.value }))
              }
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter card title"
            />
          </div>

          {/* Image Upload */}
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                clipRule="evenodd"
              />
            </svg>

            <label className="flex-1 cursor-pointer">
              <div className="relative group">
                <img
                  src={item?.image}
                  onError={(e) => {
                    e.target.src =
                      "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";
                  }}
                  alt={`Card ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg bg-gray-100"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
                  <span className="text-white text-sm">
                    Click to upload image
                  </span>
                </div>
              </div>
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>

          {/* Tag Input */}
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type="text"
              value={item?.route || ""}
              onChange={(e) =>
                handleUpdate((item) => ({
                  ...item,
                  route: e.target.value?.trim(),
                }))
              }
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter tags"
            />
          </div>

          {/* Style Controls */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 text-gray-400"
              >
                <path d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
              </svg>

              <span className="text-sm font-medium text-gray-700">
                Style Controls
              </span>
            </div>

            <InputControl
              initialInput={parseInt(item?.cardStyle?.borderRadius) || 0}
              title="Border Radius"
              updateInput={(value) =>
                handleStyleUpdate("borderRadius", `${value}px`)
              }
              max={50}
            />

            <InputControl
              initialInput={parseInt(item?.cardStyle?.padding) || 0}
              title="Padding"
              updateInput={(value) => handleStyleUpdate("padding", `${value}px`)}
              max={40}
            />

            {/* <InputControl
            initialInput={parseInt(item?.cardStyle?.gap) || 0}
            title="Gap"
            updateInput={(value) => handleStyleUpdate("gap", `${value}px`)}
            max={40}
          /> */}

            {/* Shadow Control */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <label className="text-sm font-medium text-gray-700">Shadow</label>
              <select
                value={item?.cardStyle?.boxShadow || "none"}
                onChange={(e) => handleStyleUpdate("boxShadow", e.target.value)}
                className="px-3 py-1 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="none">None</option>
                <option value="0 1px 3px rgba(0,0,0,0.12)">Small</option>
                <option value="0 4px 6px rgba(0,0,0,0.1)">Medium</option>
                <option value="0 10px 15px rgba(0,0,0,0.1)">Large</option>
              </select>
            </div>

            {/* Background Color */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <label className="text-sm font-medium text-gray-700">
                Background
              </label>
              <ColorInput
                value={item?.cardStyle?.backgroundColor || "#ffffff"}
                onChange={(value) => handleStyleUpdate("backgroundColor", value)}
              />
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex flex-col items-center">
              {loading ? (
                <>
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Uploading...</h2>
                  <p className="text-gray-600">Uploading your image, please wait</p>
                </>
              ) : error ? (
                <>
                  <XCircle className="h-12 w-12 text-red-600 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Upload Failed</h2>
                  <p className="text-gray-600">{error}</p>
                </>
              ) : (
                <>
                  <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Upload Successful</h2>
                  <p className="text-gray-600">Your image has been uploaded</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Landing = () => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [selectedKey, setSelectedKey] = useState("containerStyle");
  const [selectedView, setSelectedView] = useState("homeMob");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState("idle");

  const [updateCarosol, { data, isLoading, error }] =
    useUpdateCarosolMutation();

  const [struct, setStruct] = useState([]);
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
            image: "",
            type: "card3",
            route: "",
            text: "",
            cardStyle: {
              borderRadius: "10px",
            },
          },
        ],
      },
    ]);
  }, []);

  const handleUpdatePadding = (side, value, styleTag) => {
    const paddingMap = {
      top: "paddingTop",
      right: "paddingRight",
      bottom: "paddingBottom",
      left: "paddingLeft",
    };
    handleUpdate({ label: paddingMap[side], value: `${value}px` }, styleTag);
  };

  const handleUpdate = ({ label, value }, styleTag) => {
    setStruct((prev) => {
      const newArr = [...prev];
      newArr[selectedSection] = {
        ...newArr[selectedSection],
        [styleTag]: {
          ...newArr[selectedSection][styleTag],
          [label]: value,
        },
      };
      return newArr;
    });
  };

  const handleTitleUpdate = (e) => {
    setStruct((prev) => {
      const newArr = [...prev];
      newArr[selectedSection].title = e.target.value;
      return newArr;
    });
  };
  const handleTypeUpdate = (type) => {
    setStruct((prev) => {
      const newArr = [...prev];
      const currentType = newArr[selectedSection].type;
      newArr[selectedSection].type = type ? "carousel" : "customGrid";
      return newArr;
    });
  };

  const handleItemCount = (value) => {
    setStruct((prev) => {
      const newArr = [...prev];
      const currentItems = newArr[selectedSection].items || [];
      const itemTemplate = {
        image: "",
        type: "card3",
        route: "",
        text: "",
        cardStyle: { borderRadius: "10px" },
      };

      if (value > currentItems.length) {
        newArr[selectedSection].items = [
          ...currentItems,
          ...Array(value - currentItems.length).fill(itemTemplate),
        ];
      } else {
        newArr[selectedSection].items = currentItems.slice(0, value);
      }
      return newArr;
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
      customGrid: ({ data }) => (
        <CustomGrid cards={data} isMobileView={selectedView === "homeMob"} />
      ),
      customSizedGrid: ({ data }) => (
        <CustomSizedGrid cards={data} isMobileView={selectedView === "homeMob"} />
      )
    }),
    [selectedView]
  );

  const GetComponents = useCallback(
    ({ data }) => {
      const Component = components[data.type];
      return Component ? <Component data={data} /> : <></>;
    },
    [components]
  );

  const handlePublish = async () => {
    try {
      setIsModalOpen(true);
      setModalState("loading");

      const main = JSON.parse(localStorage.getItem(selectedView));
      const newMain = {
        data: {
          data: struct,
          meta_data: main?.data.meta_data || {},
        },
      };
      localStorage.setItem(selectedView, JSON.stringify(newMain));

      await updateCarosol({
        key: selectedView,
        value: JSON.stringify(newMain),
      });

      // Set to success state
      setModalState("success");

      // Optional: Auto-close after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        setModalState("idle");
      }, 2000);
    } catch (error) {
      setModalState("error");
      console.error("Publish failed", error);
    }
    // const main = JSON.parse(localStorage.getItem(selectedView));
    // const newMain = {
    //   data: {
    //     data: struct,
    //     meta_data: main.data.meta_data,
    //   },
    // };
    // localStorage.setItem(selectedView, JSON.stringify(newMain));

    // await updateCarosol({ key: selectedView, value: JSON.stringify(newMain) });
    // toast.success("Your Page updated successfully!");
  };

  useEffect(() => {
    if (selectedView) {
      const main = JSON.parse(localStorage.getItem(selectedView));
      setStruct(main?.data?.data);
//       setStruct([
//         {
//           "item_ranked": 2,
//           "title": ``,
//           "type": "carusel_full",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             // display: "grid",
//             // gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             // gridTemplateRows: "repeat(1, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "20px",

//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/hero-banners/Dryfruit_Hampers_Mob_copy_18.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 // height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/hero-banners/Floral_Gifts_Mob-27-01-25.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 // height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/hero-banners/Dryfruit_Hampers_Mob_copy_18.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 // height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/hero-banners/Floral_Gifts_Mob-27-01-25.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 // height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/hero-banners/Dryfruit_Hampers_Mob_copy_18.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 // height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/hero-banners/Floral_Gifts_Mob-27-01-25.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 // height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },

//           ]
//         },
//         {
//           "item_ranked": 3,
//           "title": `Celebrate Occasions with India's #1
// Online Gift Store`,
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(1, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/occassion/Occasion-Banner_01.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Birthday",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/occassion/Anniversary_Banner_02_01.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Anniversary",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/occassion/best_wishes_slider_3april.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Congratulations",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//           ]
//         },
//         {
//           "item_ranked": 4,
//           "title": "Popular in Gifting",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(1, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/featured/Featured-Banner-02-31-oct-2022.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Get Today",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/featured/Featured-Banner-01-31-oct-2022.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Best Seller",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/featured/Featured-Banner-03-31-oct-2022.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "New Arrival",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//           ]
//         },
//         {
//           "item_ranked": 5,
//           "title": "Celebrations Calendar",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(1, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com//assets/images/custom/new-mobile-home/new-ui/calendar/International-day-of-happiness_Upcoming-Occasion_Mob-03-02-2025.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Diwali",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com//assets/images/custom/new-mobile-home/new-ui/calendar/Eid_Upcoming_Occasion_Mob-15-01-25.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Eid",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/calendar/Easter_Upcoming_Occasion_Mob-15-02-2025.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Easter",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//           ]
//         },

//         {
//           "item_ranked": 6,
//           "title": "Unwrap Festive Joy",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(2, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/Gift_hampers_Holi_to_ramadan_Mob_17-03-2025.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Gift Hamper",
//               cardStyle: {
//                 gridRow: "span 2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/Dryfruit_Hampers_holi_to_ramadan_Mob_17-03-2025.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Dry Fruit",
//               cardStyle: {
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/Sweets_Holi_to_ramadan_Mob_17-03-2025.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Sweets",
//               cardStyle: {
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/Fruit_hampers_Unwrap_festive_joy_Mob_17-03-2025.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Fruits",
//               cardStyle: {
//                 gridColumnStart: "2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/Chocolates_Unwpp_festive_joy_Mob_17-03-2025.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Chocolates",
//               cardStyle: {
//                 gridColumnStart: "3",
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             }
//           ]
//         },
//         {
//           "item_ranked": 7,
//           "title": "Birthday Gifts that Wow",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(2, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/birthday/2023/Flowers.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Flowers",
//               cardStyle: {
//                 gridRow: "span 2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/birthday/2023/Birthday_Mob_Cakes-27-11-24.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Cakes",
//               cardStyle: {
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/birthday/2023/combo.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Combos",
//               cardStyle: {
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/birthday/2023/Personalised.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Personalized",
//               cardStyle: {
//                 gridColumnStart: "2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/birthday/2023/experience.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Experience",
//               cardStyle: {
//                 gridColumnStart: "3",
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             }
//           ]
//         },
//         {
//           "item_ranked": 8,
//           "title": "Most Loved Gifts",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "750px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(3, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "text": "Luxe Flower",
//               "type": "sized-card",
//               "route": "chocolate",
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/explore/new/Exotic-flowers_SBB_Mob-27-11-24.jpg",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "text": "Luxe Cake",
//               "type": "sized-card",
//               "route": "chocolate",
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/explore/new/Luxe_Cakes_SBB_Mob-08-01-2025.jpg",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "text": "Luxe Plant",
//               "type": "sized-card",
//               "route": "chocolate",
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/explore/new/Luxe_Plants_SBB_Mob_18.jpg",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "text": "For Her",
//               "type": "sized-card",
//               "route": "chocolate",
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/explore/new/for_her-01-10-24.jpg",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "text": "All Gifts",
//               "type": "sized-card",
//               "route": "chocolate",
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/explore/new/All%20gifts.jpg",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "text": "For Him",
//               "type": "sized-card",
//               "route": "chocolate",
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/explore/new/for_him-01-10-24.jpeg",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "text": "Chocolate",
//               "type": "sized-card",
//               "route": "chocolate",
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/explore/new/Chocolates_SBB_Mob_copy_18-03-2025.jpg",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "text": "Send A Guitar",
//               "type": "sized-card",
//               "route": "chocolate",
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/explore/new/Guitarist_SBB_Mob_copy_18-03-2025.jpg",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/explore/new/Kids_Corner_SBB_Mob_copy_18-03-2025.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Kids",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//           ]
//         },
//         {
//           "item_ranked": 9,
//           "title": "Anniversary Gifts, Wrapped in Love",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(2, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/anniversary/Anniversary_Mob_Flowers--27-11-24.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Flowers",
//               cardStyle: {
//                 gridRow: "span 2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/anniversary/Anniversary_Mob_Premium-Gifts-27-11-24.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Luxe Gifts",
//               cardStyle: {
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/anniversary/Anniversary_Mob_Cakes-27-11-24.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Cakes",
//               cardStyle: {
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/anniversary/Anniversary_Mob_252x300_Home&living.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Home & Living",
//               cardStyle: {
//                 gridColumnStart: "2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/anniversary/Anniversary_Mob_Plants_11_02.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Plants",
//               cardStyle: {
//                 gridColumnStart: "3",
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             }
//           ]
//         },
//         {
//           "item_ranked": 10,
//           "title": "Pick Their Fav Flowers",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(2, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/flowers/2023/Flowers_Mob_Roses-530x300-27-11-24.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Flowers",
//               cardStyle: {
//                 gridColumn: "span 2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/flowers/2023/Persnaolised.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Luxe Gifts",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridColumnStart: "3",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/flowers/2023/ORCHIDS.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Cakes",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridRowStart: "2"
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/flowers/2023/Carnation.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Home & Living",
//               cardStyle: {
//                 gridColumn: "span 2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//           ]
//         },
//         {
//           "item_ranked": 11,
//           "title": "Bakery-Fresh Cakes",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(2, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/cakes/2023/Cakes_Mob_Chocolates-27-11-24.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Clocolate",
//               cardStyle: {
//                 gridColumn: "span 2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/cakes/2023/Cakes_Mob_252x300_Flower-N-Cake.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Flower & Cake",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridColumnStart: "3",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/cakes/2023/Cakes_Mob_252x300_Eggless.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "EggLess",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridRowStart: "2"
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/cakes/2023/Cakes_Mob_252x300_Pineapple.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Pineapple",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridRowStart: "2"
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/cakes/2023/Cakes_Mob_252x300_Butterscotch.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Butterscotch",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//           ]
//         },
//         {
//           "item_ranked": 12,
//           "title": "Freshly Curated",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(2, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/New_Arrivals_Mob_Flowers-06-01-23.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Flowers",
//               cardStyle: {
//                 gridRow: "span 2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/New_Arrivals_Mob_Cakes-06-01-23.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Cakes",
//               cardStyle: {
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/New_Arrivals_Mob_Personalised-06-01-23.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Personalized",
//               cardStyle: {
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/New_Arrivals_Mob_Hampers-06-01-23.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Hamper",
//               cardStyle: {
//                 gridColumnStart: "2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/New_Arrivals_Mob_Plants-06-01-23.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Plant",
//               cardStyle: {
//                 gridColumnStart: "3",
//                 borderRadius: "10px",

//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             }
//           ]
//         },
//         {
//           "item_ranked": 13,
//           "title": "For Every Relationship",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(1, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/relationship/Recipient_Men_Mob_41224.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Men",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/relationship/Recipient_Women_Mob_41224.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Women",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/relationship/Recipient_Kids_Mob_41224.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Kids",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               imageStyle: {
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 height: "85%"
//               },
//               textStyle: {
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//           ]
//         },
//         {
//           "item_ranked": 14,
//           "title": "Gifts worth waiting for",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(2, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/gifts/GWWF_Mob-18-11-24.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Spirital Gits",
//               cardStyle: {
//                 gridColumn: "span 2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/gifts/GWWF_252x300_toys.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Toys & Games",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridColumnStart: "3",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/gifts/GWWF_252x300_fashion&lifestyle.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Fashion & Lifestyle",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridRowStart: "2"
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/gifts/GWWF_252x300_expirential.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Experimental Gifts",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridRowStart: "2"
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/gifts/GWWF_252x300_bestsellers.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Bestseller Gifts",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//           ]
//         },
//         {
//           "item_ranked": 15,
//           "title": "Gifts that Go together",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(2, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/combos/2023/GTGT_Mob_250x634_FLowers&Cakes.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Flowers & Cakes",
//               cardStyle: {
//                 gridRow: "span 2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/combos/2023/GTGT_Mob_530x300_Gift%20Hampers.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Gift Hamper",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridColumn: "span 2"
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/combos/2023/GTGT_Mob_530x300_FLowers&Chocolates.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Flower N Chocolate",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridColumn: "span 2"
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//           ]
//         },
//         {
//           "item_ranked": 16,
//           "title": "Gifts That Tell Stories",
//           "type": "customSizedGrid",
//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(2, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/personalised/2023/new/Stationary%20.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Stationary Gifts",
//               cardStyle: {
//                 gridRow: "span 2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/personalised/2023/new/cushion.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Cushions",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/personalised/2023/new/Frame.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Photo Frame",
//               cardStyle: {
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/personalised/2023/new/mug.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Mugs",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridColumn: "span 2"
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//           ]
//         },
//         {
//           "item_ranked": 17,
//           "title": "Plants For Every Vibe",
//           "type": "customSizedGrid",

//           "containerStyle": {
//             height: "500px",
//             marginTop: "20px"
//           },
//           "innerContainerStyle": {
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gridTemplateRows: "repeat(2, minmax(0, 1fr))",
//             gap: "0.5rem",
//           },
//           "boxStyle": {
//             "backgroundColor": "white",
//             "borderRadius": "0px",
//           },
//           "items": [
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/plants/2023/Plants-For-Every-Vibe_mob_Jade-Plants.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Jade Plant",
//               cardStyle: {
//                 gridRow: "span 2",
//                 borderRadius: "10px",
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/plants/2023/Plants-For-Every-Vibe_mob_Lucky-Bamboo.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Lucky Bamboo",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridColumn: "span 2"
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//             {
//               "image": "https://www.fnp.com/assets/images/custom/new-mobile-home/new-ui/plants/2023/Plants-For-Every-Vibe_mob_Money-Plants.jpg",
//               "type": "sized-card",
//               "route": "chocolate",
//               "text": "Money Plant",
//               cardStyle: {
//                 borderRadius: "10px",
//                 gridColumn: "span 2"
//               },
//               textStyle: {
//                 position: "absolute",
//                 bottom: "-0.5rem",
//                 left: "0.75rem",
//                 right: "0.75rem",
//                 paddingTop: "0.25rem",
//                 paddingBottom: "0.25rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: "rgba(255, 255, 255, 0.75)"
//               }
//             },
//           ]
//         },
//       ])
    }
  }, [selectedView]);

  return (
    <>
      <div className="grid grid-cols-[15%,60%,25%] absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <SEO title={"Landing"} />

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
            <BasicButton
              onClick={handlePublish}
              className={`bg-green-700 w-full text-white rounded-lg  mt-3 transition-all duration-300 hover:bg-green-600 hover:shadow-lg active:scale-95`}
            >
              Publish
            </BasicButton>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-5">
          <div
            className={twMerge(
              "bg-white h-[95svh] border rounded-2xl p-3 flex flex-col overflow-y-auto overflow-x-hidden",
              selectedView == "homeDesk" ? "w-full" : "w-[500px] mx-auto"
            )}
          >
            {struct?.map((section, index) => (
              <section
                key={index}
                style={section.containerStyle}
                className={twMerge(
                  index > 0 && "p-0 mx-auto max-w-[1600px]  w-full"
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {["containerStyle", "boxStyle", "innerContainerStyle", "items"].map(
            (styleTag) => {
              const IconComponent = styleIcons[styleTag];
              return (
                <>
                  <StyleSection
                    key={styleTag}
                    title={styleTag}
                    isActive={selectedKey === styleTag}
                    onToggle={() => toggleStyleTag(styleTag)}
                    IconComponent={IconComponent}
                  >
                    <div className="p-4 space-y-4">
                      {styleTag !== "items" ? (
                        <>
                          {styleTag === "containerStyle" ? (
                            <>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="size-5 text-gray-400"
                                  >
                                    <path d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                                  </svg>

                                  <span className="text-sm font-medium text-gray-700">
                                    Type Slection
                                  </span>
                                </div>
                                <Switch
                                  initial={
                                    struct[selectedSection]?.type == "carousel"
                                  }
                                  onChange={handleTypeUpdate}
                                  label="Carousel"
                                  helper="Convert your section into a carousel!"
                                />
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {styleTag === "boxStyle" && (
                            <>
                              <div className="flex items-center gap-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="ext-gray-400 size-5"
                                >
                                  <polyline points="4 7 4 4 20 4 20 7" />
                                  <line x1="9" x2="15" y1="20" y2="20" />
                                  <line x1="12" x2="12" y1="4" y2="20" />
                                </svg>
                                <input
                                  value={struct[selectedSection]?.title ?? ""}
                                  onChange={handleTitleUpdate}
                                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                  placeholder="Enter title"
                                />
                              </div>
                            </>
                          )}
                          <PaddingControl
                            updatePadding={(side, value) =>
                              handleUpdatePadding(side, value, styleTag)
                            }
                            initialPadding={{
                              top:
                                parseInt(
                                  struct[selectedSection]?.[styleTag]
                                    ?.paddingTop
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
                                  struct[selectedSection]?.[styleTag]
                                    ?.paddingLeft
                                ) || 0,
                            }}
                          />

                          {styleTag === "innerContainerStyle" && (
                            <>
                              <GapControl
                                updateGap={(value) =>
                                  handleUpdate(
                                    { label: "gap", value: `${value}px` },
                                    styleTag
                                  )
                                }
                                initial={
                                  parseInt(
                                    struct[selectedSection]?.[styleTag]?.gap
                                  ) || 0
                                }
                              />
                              <RangeSlider
                                initial={
                                  parseInt(
                                    struct[selectedSection]?.[
                                      styleTag
                                    ]?.gridTemplateColumns?.match(/\d+/)?.[0]
                                  ) || 5
                                }
                                onChange={(value) =>
                                  handleUpdate(
                                    {
                                      label: "gridTemplateColumns",
                                      value: `repeat(${value}, 1fr)`,
                                    },
                                    styleTag
                                  )
                                }
                                label="Grid Columns"
                              />
                            </>
                          )}

                          <ColorInput
                            label="Background Color"
                            value={
                              struct[selectedSection]?.[styleTag]
                                ?.backgroundColor || "#ffffff"
                            }
                            onChange={(value) =>
                              handleUpdate(
                                { label: "backgroundColor", value },
                                styleTag
                              )
                            }
                          />

                          <div className="p-3">
                            <label className="text-sm font-medium text-gray-700">
                              Border Radius
                            </label>
                            <div className="flex items-center gap-2 mt-2">
                              <input
                                type="range"
                                min="0"
                                max="30"
                                value={
                                  parseInt(
                                    struct[selectedSection]?.[styleTag]
                                      ?.borderRadius
                                  ) || 0
                                }
                                onChange={(e) =>
                                  handleUpdate(
                                    {
                                      label: "borderRadius",
                                      value: `${e.target.value}px`,
                                    },
                                    styleTag
                                  )
                                }
                                className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                              <input
                                type="number"
                                value={
                                  parseInt(
                                    struct[selectedSection]?.[styleTag]
                                      ?.borderRadius
                                  ) || 0
                                }
                                onChange={(e) =>
                                  handleUpdate(
                                    {
                                      label: "borderRadius",
                                      value: `${e.target.value}px`,
                                    },
                                    styleTag
                                  )
                                }
                                className="w-16 px-2 py-1 text-sm text-center border border-gray-200 rounded-md"
                              />
                              <span className="text-sm text-gray-500">px</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <RangeSlider
                            initial={
                              struct[selectedSection]?.items?.length ?? 0
                            }
                            onChange={handleItemCount}
                            label="Number of Items"
                          />
                          <div className="space-y-4 h-[60vh] overflow-y-auto hide-scrollbar">
                            {struct[selectedSection]?.items?.map(
                              (item, index) => (
                                <ItemEditor
                                  key={index}
                                  item={item}
                                  index={index}
                                  selectedSection={selectedSection}
                                  setStruct={setStruct}
                                />
                              )
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </StyleSection>
                </>
              );
            }
          )}
        </div>
      </div>
      <div
        onClick={() =>
          setSelectedView((prev) =>
            prev === "homeDesk" ? "homeMob" : "homeDesk"
          )
        }
        className="fixed bottom-10 left-10 bg-white hover:bg-black/5 p-4 rounded-full shadow-xl border cursor-pointer"
      >
        {selectedView === "homeDesk" ? (
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
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
            />
          </svg>
        ) : (
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
              d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            />
          </svg>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex flex-col items-center">
              {modalState === 'loading' && (
                <>
                  <Loader2 className="h-12 w-12 animate-spin text-green-600 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Publishing...</h2>
                  <p className="text-gray-600">Updating your page, please wait</p>
                </>
              )}

              {modalState === 'success' && (
                <>
                  <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Published Successfully</h2>
                  <p className="text-gray-600">Your page has been updated</p>
                </>
              )}

              {modalState === 'error' && (
                <>
                  <XCircle className="h-12 w-12 text-red-600 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Publish Failed</h2>
                  <p className="text-gray-600">An error occurred. Please try again.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
// const [struct, setStruct] = useState([
//   {
//     item_ranked: 1,
//     title: null,
//     type: "carusel_full",
//     containerStyle: {},
//     items: [
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk%20(3)-8-9-24.jpg",
//         type: "image",
//         route: "chocolate",
//         text: "",
//         cardStyle: { height: "30vh" },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk%20(3)-8-9-24.jpg",
//         type: "image",
//         route: "cake",
//         text: "",
//         cardStyle: { height: "30vh" },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk%20(3)-8-9-24.jpg",
//         type: "image",
//         route: "flower",
//         text: "",
//         cardStyle: { height: "30vh" },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk%20(3)-8-9-24.jpg",
//         type: "image",
//         route: "cherry",
//         text: "",
//         cardStyle: { height: "30vh" },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk%20(3)-8-9-24.jpg",
//         type: "image",
//         route: "cakes",
//         text: "",
//         cardStyle: { height: "30vh" },
//       },
//     ],
//   },
//   {
//     item_ranked: 2,
//     title: null,
//     type: "grid",
//     containerStyle: {},
//     items: [
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Karwa_Chauth_Squircle03-10-2024.jpg",
//         type: "card1",
//         route: "Birthday",
//         text: "Karwa Chauth",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Diwali_Squircle-7-10-24.jpg",
//         type: "card1",
//         route: "Anniversary",
//         text: "Diwali Gifts",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle.jpg",
//         type: "card1",
//         route: "flowers",
//         text: "Birthday",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/anniversary_Squircle.jpg",
//         type: "card1",
//         route: "chocolate",
//         text: "Anniversary",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/New-Squircle-Icon_Combos-17-10-24.jpg",
//         type: "card1",
//         route: "red",
//         text: "Combos",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle.jpg",
//         type: "card1",
//         route: "pink",
//         text: "Birthday",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle.jpg",
//         type: "card1",
//         route: "voilet flower",
//         text: "Birthday",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle.jpg",
//         type: "card1",
//         route: "gift",
//         text: "Birthday",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle.jpg",
//         type: "card1",
//         route: "cakes",
//         text: "Birthday",
//       },
//     ],
//   },
//   // {
//   //   item_ranked: 3,
//   //   type: "gift_finder",
//   //   containerStyle: { margin: "0 10%" },
//   // },
//   {
//     item_ranked: 4,
//     type: "text",
//     title: "Celebrate Occasions with India's #1 Online Gift Store",
//     description:
//       "Thoughtfully curated 139,821 Gift Ideas. Get 2-Hour Delivery & Free Shipping in India.",
//   },
//   // {
//   //   item_ranked: 5,
//   //   title: "Thoughtfully Curated Gifts",
//   //   type: "grid1",
//   //   button: {
//   //     name: "View All",
//   //     style: {
//   //       color: "green",
//   //       fontSize: "16px",
//   //     },
//   //   },
//   //   containerStyle: {
//   //     display: "grid",
//   //     gridTemplateColumns: "repeat(10, 1fr)",
//   //     gridTemplateRows: "repeat(7, 1fr)",
//   //     gap: "20px",
//   //   },
//   //   boxStyle: {
//   //     backgroundColor: "white",
//   //     borderRadius: "10px",
//   //   },
//   //   items: [
//   //     {
//   //       image:
//   //         "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Hero_DeskV2.jpg",
//   //       type: "card2",
//   //       route: "table",
//   //       text: null,
//   //       cardStyle: { gridColumn: "1 / 6", gridRow: "1 / 5" },
//   //     },
//   //     {
//   //       image:
//   //         "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Hero_DeskV2.jpg",
//   //       type: "card2",
//   //       route: "bag",
//   //       text: null,
//   //       cardStyle: { gridColumn: "6 / 11", gridRow: "1 / 5" },
//   //     },
//   //     {
//   //       image:
//   //         "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
//   //       type: "card3",
//   //       route: "cake red",
//   //       text: "Let them relish each moment with a Cake from you",
//   //       cardStyle: { gridColumn: "1 / 3", gridRow: "5 / 8" },
//   //     },
//   //     {
//   //       image:
//   //         "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
//   //       type: "card3",
//   //       route: "chocolate cake",
//   //       text: "Let them relish each moment with a Cake from you",
//   //       cardStyle: { gridColumn: "3 / 5", gridRow: "5 / 8" },
//   //     },
//   //     {
//   //       image:
//   //         "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
//   //       type: "card3",
//   //       route: "cake",
//   //       text: "Let them relish each moment with a Cake from you",
//   //       cardStyle: { gridColumn: "5 / 7", gridRow: "5 / 8" },
//   //     },
//   //     {
//   //       image:
//   //         "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
//   //       type: "card3",
//   //       route: "flower",
//   //       text: "Let them relish each moment with a Cake from you",
//   //       cardStyle: { gridColumn: "7 / 9", gridRow: "5 / 8" },
//   //     },
//   //     {
//   //       image:
//   //         "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
//   //       type: "card3",
//   //       route: "chocolate",
//   //       text: "Let them relish each moment with a Cake from you",
//   //       cardStyle: { gridColumn: "9 / 11", gridRow: "5 / 8" },
//   //     },
//   //   ],
//   // },
//   {
//     item_ranked: 6,
//     title: "Gifts In Trend",
//     type: "carousel",
//     containerStyle: {},
//     boxStyle: {
//       backgroundColor: "white",
//       borderRadius: "10px",
//     },
//     items: [
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "rose",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "jasmine",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "bouquet",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "red cherry",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//     ],
//   },
//   {
//     item_ranked: 6,
//     title: "The Birthday 2024 Collection",
//     type: "customGrid",
//     containerStyle: {},
//     innerContainerStyle: {
//       display: "grid",
//       gridTemplateColumns: "repeat(5, 1fr)",
//     },
//     boxStyle: {
//       backgroundColor: "white",
//       borderRadius: "10px",
//     },
//     items: [
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//     ],
//   },

//   {
//     item_ranked: 6,
//     title: "Best Sellers",
//     type: "customGrid",
//     containerStyle: {},
//     innerContainerStyle: {
//       display: "grid",
//       gridTemplateColumns: "repeat(5, 1fr)",
//     },
//     boxStyle: {
//       backgroundColor: "white",
//       borderRadius: "10px",
//     },
//     items: [
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//     ],
//   },
//   {
//     item_ranked: 6,
//     title: "Bakery-Fresh Cakes",
//     type: "customGrid",
//     containerStyle: {},
//     innerContainerStyle: {
//       display: "grid",
//       gridTemplateColumns: "repeat(5, 1fr)",
//     },
//     boxStyle: {
//       backgroundColor: "white",
//       borderRadius: "10px",
//     },
//     items: [
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//     ],
//   },
//   {
//     item_ranked: 6,
//     title: "Anniversary : Rekindle Love",
//     type: "customGrid",
//     containerStyle: {},
//     innerContainerStyle: {
//       display: "grid",
//       gridTemplateColumns: "repeat(5, 1fr)",
//     },
//     boxStyle: {
//       backgroundColor: "white",
//       borderRadius: "10px",
//     },
//     items: [
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//       },
//     ],
//   },
//   {
//     item_ranked: 6,
//     title: "Gifts worth waiting for",
//     type: "customGrid",
//     containerStyle: {},
//     innerContainerStyle: {
//       display: "grid",
//       gridTemplateColumns: "repeat(5, 1fr)",
//     },
//     boxStyle: {
//       backgroundColor: "white",
//       borderRadius: "10px",
//     },
//     items: [
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         imageStyle: {
//           borderRadius: "100%",
//           backgroundColor: "white",
//           boxShadow:
//             "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
//           "--tw-shadow":
//             "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
//           "--tw-shadow-colored":
//             "0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color)",
//           padding: "4px",
//         },
//         cardStyle: {
//           boxShadow: "none",
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         imageStyle: {
//           borderRadius: "100%",
//         },
//         cardStyle: {
//           boxShadow: "none",
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         imageStyle: {
//           borderRadius: "100%",
//         },
//         cardStyle: {
//           boxShadow: "none",
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         imageStyle: {
//           borderRadius: "100%",
//         },
//         cardStyle: {
//           boxShadow: "none",
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         imageStyle: {
//           borderRadius: "100%",
//         },
//         cardStyle: {
//           boxShadow: "none",
//         },
//       },
//     ],
//   },
//   {
//     item_ranked: 6,
//     title: "Gifts that Go together",
//     type: "customGrid",
//     containerStyle: {},
//     innerContainerStyle: {
//       display: "grid",
//       gridTemplateColumns: "repeat(5, 1fr)",
//     },
//     boxStyle: {
//       backgroundColor: "white",
//       borderRadius: "10px",
//     },
//     items: [
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         cardStyle: {
//           borderRadius: "30px",
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         cardStyle: {
//           borderRadius: "30px",
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         cardStyle: {
//           borderRadius: "30px",
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         cardStyle: {
//           borderRadius: "30px",
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         cardStyle: {
//           borderRadius: "30px",
//         },
//       },
//     ],
//   },
//   {
//     item_ranked: 6,
//     title: "Recently Viewed By You",
//     type: "customGrid",
//     containerStyle: {},
//     innerContainerStyle: {
//       display: "grid",
//       gridTemplateColumns: "repeat(5, 1fr)",
//     },
//     boxStyle: {
//       backgroundColor: "white",
//       borderRadius: "10px",
//     },
//     items: [
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         cardStyle: {
//           borderRadius: "100%",
//         },
//         button: {
//           name: "Buy Now",
//           style: {
//             backgroundColor: "#FFC300",
//             fontSize: "14px",
//             margin: "0 auto",
//           },
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         cardStyle: {
//           borderRadius: "100%",
//         },
//         button: {
//           name: "Buy Now",
//           style: {
//             backgroundColor: "#FFC300",
//             fontSize: "14px",
//             margin: "0 auto",
//           },
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         cardStyle: {
//           borderRadius: "100%",
//         },
//         button: {
//           name: "Buy Now",
//           style: {
//             backgroundColor: "#FFC300",
//             fontSize: "14px",
//             margin: "0 auto",
//           },
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         cardStyle: {
//           borderRadius: "100%",
//         },
//         button: {
//           name: "Buy Now",
//           style: {
//             backgroundColor: "#FFC300",
//             fontSize: "14px",
//             margin: "0 auto",
//           },
//         },
//       },
//       {
//         image:
//           "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
//         type: "card3",
//         route: "chocolate",
//         text: "Bouquet Of 8 Royal Red Roses",
//         cardStyle: {
//           borderRadius: "100%",
//         },
//         button: {
//           name: "Buy Now",
//           style: {
//             backgroundColor: "#000",
//             fontSize: "14px",
//             margin: "0 auto",
//           },
//         },
//       },
//     ],
//   },
// ]);
// const [struct, setStruct] = useState([
//   {
//     item_ranked: 1,
//     title: "",
//     type: "customGrid",
//     containerStyle: {},
//     innerContainerStyle: {
//       display: "grid",
//       gridTemplateColumns: "repeat(5, 1fr)",
//     },
//     boxStyle: {
//       backgroundColor: "white",
//       borderRadius: "10px",
//     },
//     items: Array(5).fill({
//       image: "",
//       type: "card3",
//       route: "",
//       text: "",
//       cardStyle: {
//         borderRadius: "10px",
//       },
//     }),
//   },
// ]);
