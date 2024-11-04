import React, { useCallback, useEffect, useMemo, useState } from "react";
import TextTitleComponent from "../../home/TextTitleComponent";
import CategoriesCard from "../../home/CategoriesCard";
import CardCarousel from "../../home/CardCarousel";
import Carousel from "../../home/CarouselSlider";
import { twMerge } from "tailwind-merge";
import CustomGrid from "../../home/CustomGrid";

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

// const ItemEditor = ({ item, index, selectedSection, setStruct }) => {
//   const handleTextChange = (value) => {
//     setStruct((prev) => {
//       const newArr = [...prev];
//       newArr[selectedSection] = {
//         ...newArr[selectedSection],
//         items: newArr[selectedSection].items.map((itm, i) =>
//           i === index ? { ...itm, text: value } : itm
//         ),
//       };
//       return newArr;
//     });
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setStruct((prev) => {
//         const newArr = [...prev];
//         newArr[selectedSection] = {
//           ...newArr[selectedSection],
//           items: newArr[selectedSection].items.map((itm, i) =>
//             i === index ? { ...itm, image: imageUrl } : itm
//           ),
//         };
//         return newArr;
//       });
//     }
//   };

//   const handleRouteChange = (e) => {
//     setStruct((prev) => {
//       const newArr = [...prev];
//       newArr[selectedSection] = {
//         ...newArr[selectedSection],
//         items: newArr[selectedSection].items.map((itm, i) =>
//           i === index ? { ...itm, route: e.target.value?.trim() ?? "" } : itm
//         ),
//       };
//       return newArr;
//     });
//   };

//   return (
//     <div className="flex flex-col items-center justify-start space-x-4 py-2 px-4 gap-3">
//       <div className="flex w-full items-center justify-start gap-3">
//         <span className="px-2 font-bold">{index + 1}</span>
//         <input
//           value={item?.text ?? ""}
//           onChange={(e) => handleTextChange(e.target.value)}
//           className="px-2 py-1 w-full border border-gray-300 rounded-lg focus:ring-0 focus:ring-slate-300 focus:outline-none"
//           placeholder="Title"
//         />
//       </div>
//       <div className="w-full">
//         <label htmlFor={`uploadImage-${index}`}>
//           <img
//             src={item?.image}
//             onError={(e) => {
//               e.target.src =
//                 "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";
//             }}
//             alt={`item-${index}`}
//             className="w-16 h-16 object-cover rounded-md mr-4"
//           />
//           <input
//             type="file"
//             id={`uploadImage-${index}`}
//             onChange={handleImageUpload}
//             className="hidden"
//           />
//         </label>
//       </div>
//       <div className=" flex items-center gap-3 w-full  ">
//         <label className="text-sm font-medium text-slate-800">Tag</label>
//         <div className="flex items-center space-x-2 ">
//           <input
//             type="tag"
//             value={item?.route || ""}
//             onChange={handleRouteChange}
//             className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:ring focus:ring-slate-300 focus:outline-none"
//             placeholder="Tags"
//           />
//         </div>
//       </div>
//       <InputControl
//         initialInput={item?.cardStyle?.borderRadius}
//         title={"Border Radius"}
//         updateInput={(value) => {
//           setStruct((prev) => {
//             const newArr = [...prev];
//             newArr[selectedSection] = {
//               ...newArr[selectedSection],
//               items: newArr[selectedSection].items.map((itm, i) =>
//                 i === index
//                   ? {
//                       ...itm,
//                       cardStyle: {
//                         ...item.cardStyle,
//                         borderRadius: `${value ?? 0}px`,
//                       },
//                     }
//                   : itm
//               ),
//             };
//             return newArr;
//           });
//         }}
//       />
//     </div>
//   );
// };

// Main component

const ItemEditor = ({ item, index, selectedSection, setStruct }) => {
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
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        handleUpdate((item) => ({ ...item, image: imageUrl }));
      }
    },
    [handleUpdate]
  );

  return (
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
  );
};

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
        image: "",
        type: "card3",
        route: "",
        text: "",
        cardStyle: {
          borderRadius: "10px",
        },
      }),
    },
  ]);

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
                <div className="bg-white  border rounded-2xl shadow-md divide-y ">
                  <>
                    <RangeSlider
                      initial={struct[selectedSection]?.items?.length ?? 0}
                      onChange={handleItemCount}
                    />
                  </>
                  <div className="h-[70svh] overflow-y-auto overflow-hidden hide-scrollbar">
                    {struct[selectedSection]?.items?.map((item, index) => (
                      <ItemEditor
                        key={index}
                        item={item}
                        index={index}
                        selectedSection={selectedSection}
                        setStruct={setStruct}
                      />
                    ))}
                  </div>
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
