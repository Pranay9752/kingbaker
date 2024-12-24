// import React from 'react'
// import { useForm } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Input } from '../vendors/addVendor';
// import BasicButton from '../../../atom/button/BasicButton';

// const ProductForm = ({ onSubmit }) => {
//   const validationSchema = Yup.object().shape({
//     product_details: Yup.array().of(
//       Yup.object().shape({
//         prices: Yup.number().required('Price is required'),
//         imageLink: Yup.array().of(Yup.string().required('Image link is required')).min(1, 'At least one image is required'),
//         title: Yup.string().required('Title is required'),
//         description: Yup.string().required('Description is required'),
//         specifications: Yup.string().required('Specifications are required'),
//         details: Yup.array().of(
//           Yup.object().shape({
//             'Cake Flavour': Yup.string().required('Cake Flavour is required'),
//             'Best Before': Yup.string().required('Best Before date is required'),
//           })
//         ).min(1, 'At least one detail is required'),
//         amenities: Yup.array().of(
//           Yup.object().shape({
//             Delivery: Yup.string().required('Delivery information is required'),
//           })
//         ).min(1, 'At least one amenity is required'),
//         event: Yup.array().of(Yup.string().required('Event is required')).min(1, 'At least one event is required'),
//         rating: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5').required('Rating is required'),
//         reviews: Yup.array().of(
//           Yup.object().shape({
//             user_id: Yup.string().required('User ID is required'),
//             reviews: Yup.string().required('Review is required'),
//           })
//         ).min(1, 'At least one review is required'),
//         tags: Yup.array().of(Yup.string().required('Tag is required')).min(1, 'At least one tag is required'),
//         weight: Yup.array().of(Yup.string().required('Weight is required')).min(1, 'At least one weight is required'),
//         brand: Yup.string().required('Brand is required'),
//         color: Yup.array().of(Yup.string().required('Color is required')).min(1, 'At least one color is required'),
//       })
//     ).min(1, 'At least one product detail is required'),
//   });

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       product_details: [
//         {
//           prices: 0,
//           imageLink: [],
//           title: '',
//           description: '',
//           specifications: '',
//           details: [
//             { 'Cake Flavour': '', 'Best Before': '' },
//           ],
//           amenities: [
//             { Delivery: '' },
//           ],
//           event: [],
//           rating: 0,
//           reviews: [
//             { user_id: '', reviews: '' },
//           ],
//           tags: [],
//           weight: [],
//           brand: '',
//           color: [],
//         },
//       ],
//     },
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       <div className="space-y-4">
//         {/* Product Details */}
//         <div className="space-y-4">
//           <h2 className="text-lg font-semibold text-gray-300">Product Details</h2>
//           {/* Display product details fields here */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-400">Price</label>
//               <Input
//                 name="product_details.0.prices"
//                 type="number"
//                 {...register('product_details.0.prices')}
//                 className="bg-[#161b22] border-gray-800 text-gray-300"
//                 error={errors.product_details?.[0]?.prices?.message}
//               />
//             </div>
//             {/* Add more product details fields here */}
//           </div>
//         </div>

//         {/* Images */}
//         <div className="space-y-4">
//           <h2 className="text-lg font-semibold text-gray-300">Images</h2>
//           {/* Display image link fields here */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-400">Image Link</label>
//               <Input
//                 name="product_details.0.imageLink.0"
//                 {...register('product_details.0.imageLink.0')}
//                 className="bg-[#161b22] border-gray-800 text-gray-300"
//                 error={errors.product_details?.[0]?.imageLink?.[0]?.message}
//               />
//             </div>
//             {/* Add more image link fields here */}
//           </div>
//         </div>

//         {/* Other Sections */}
//         {/* Add other form sections like Title, Description, Specifications, etc. */}
//       </div>

//       <div className="flex justify-end">
//         <BasicButton className="bg-blue-800/50 hover:bg-blue-800 text-gray-300 px-4 py-2 rounded-lg">
//           Save
//         </BasicButton>
//       </div>
//     </form>
//   );
// };

// function AddProductModal() {
//   return (
//     <div><h2 className="text-xl font-semibold text-gray-300 mb-5 flex gap-2 items-center">
//       Add Product
//     </h2>
//       <ProductForm />
//     </div>
//   )
// }

// export default AddProductModal

import React, { useState, forwardRef, useRef, useEffect } from "react";
import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { Input } from '../vendors/addVendor';
import BasicButton from "../../../atom/button/BasicButton";
import Select from "react-select";
import { useCreateProductMutation } from "../../../redux/apiSlices/owner/product";
import { toast } from "sonner";
import Loader from "../../../atom/loader/loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RichTextEditor from "./richTextEditor";
import { X } from "lucide-react";

export const Input = forwardRef(
  ({ name, className = "", error, type = "text", step, ...props }, ref) => {
    const baseClasses =
      "w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
    const errorClasses = error ? "border-red-500" : "";

    return (
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        step={step}
        className={`${baseClasses} ${errorClasses} ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
    );
  }
);

// Customized select theme
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#161b22",
    borderColor: state.isFocused ? "#2563eb" : "#374151",
    color: "#d1d5db",
    padding: "4px",
    borderRadius: "0.375rem",
    boxShadow: state.isFocused ? "0 0 0 2px #2563eb" : "none",
    "&:hover": {
      borderColor: "#2563eb",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#d1d5db", // Text color for selected option
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#161b22",
    borderRadius: "0.375rem",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#2563eb" : "#161b22",
    color: state.isFocused ? "#ffffff" : "#d1d5db",
    "&:hover": {
      backgroundColor: "#2563eb",
      color: "#ffffff",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6b7280", // Placeholder color
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#2563eb",
    color: "#ffffff",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#ffffff",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#1d4ed8",
      color: "#ffffff",
    },
  }),
};

// const RichTextEditor = ({ methods, fieldPath }) => {
//   const editorRef = useRef(null);

//   // Execute commands for rich text formatting
//   const formatText = (command, value = null) => {
//     document.execCommand(command, false, value);
//     editorRef.current.focus(); // Keep the editor focused
//   };

//   // Handle input changes and update value
//   const handleInput = () => {
//     const content = editorRef.current.innerHTML; // Get current content
//     methods.setValue(fieldPath, content); // Update form value using setValue
//   };

//   return (
//     <div>
//       {/* Toolbar */}
//       <div className="flex items-center gap-3 p-2 border border-gray-700 rounded-md bg-gray-800 shadow-sm">
//         <button
//           type="button"
//           onClick={() => formatText("bold")}
//           title="Bold"
//           className="p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
//         >
//           <strong>B</strong>
//         </button>
//         <button
//           type="button"
//           onClick={() => formatText("italic")}
//           title="Italic"
//           className="p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
//         >
//           <em>I</em>
//         </button>
//         <button
//           type="button"
//           onClick={() => formatText("insertOrderedList")}
//           title="Ordered List"
//           className="p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
//         >
//           1.
//         </button>
//         <button
//           type="button"
//           onClick={() => formatText("insertUnorderedList")}
//           title="Unordered List"
//           className="p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
//         >
//           •
//         </button>
//         <button
//           onClick={() => formatText("formatBlock", "blockquote")}
//           type="button"
//           title="Quote"
//           className="p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
//         >
//           “ ”
//         </button>
//         <button
//           type="button"
//           onClick={() => formatText("code")}
//           title="Code"
//           className="p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
//         >
//           {`</>`}
//         </button>
//       </div>

//       {/* ContentEditable Editor */}
//       <div
//         ref={editorRef}
//         onInput={handleInput} // Trigger handleInput on content changes
//         className="editor"
//         contentEditable
//         suppressContentEditableWarning={true}
//       >
//         <p className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-[#161b22] border-gray-800 text-gray-300">
//           Type here...
//         </p>
//       </div>
//     </div>
//   );
// };

// const validationSchema = Yup.object().shape({
//   product_details: Yup.array().of(
//     Yup.object().shape({
//       prices: Yup.number().required('Price is required'),
//       imageLink: Yup.array().of(Yup.string().required('Image link is required')).min(1, 'At least one image is required'),
//       title: Yup.string().required('Title is required'),
//       description: Yup.string().required('Description is required'),
//       specifications: Yup.string().required('Specifications are required'),
//       details: Yup.array().of(
//         Yup.object().shape({
//           key: Yup.string().required('Key is required'),
//           value: Yup.string().required('Value is required'),
//         })
//       ).min(1, 'At least one detail is required'),
//       amenities: Yup.object().shape({
//         Delivery: Yup.string(),
//       }),
//       event: Yup.array().of(Yup.string()).nullable(),
//       rating: Yup.number().min(1).max(5).nullable(),
//       reviews: Yup.array().of(
//         Yup.object().shape({
//           user_id: Yup.string().nullable(),
//           reviews: Yup.string().nullable(),
//         })
//       ).nullable(),
//       tags: Yup.array().of(Yup.string()).min(1, 'At least one tag is required'),
//       weight: Yup.array().of(
//         Yup.object().shape({
//           key: Yup.string().required('Key is required'),
//           value: Yup.number().required('Weight must be a number'),
//         })
//       ).min(1, 'At least one weight entry is required'),
//       brand: Yup.string().required('Brand is required'),
//       color: Yup.string().nullable(),
//     })
//   ).min(1, 'At least one product detail is required'),
// });

const ProductForm = ({ onSubmit, onClose }) => {
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  const validationSchema = Yup.object().shape({
    product_details: Yup.array()
      .of(
        Yup.object().shape({
          prices: Yup.number().nullable(),
          imageLink: Yup.array().of(Yup.string()).nullable(),
          title: Yup.string().nullable(),
          description: Yup.string().nullable(),
          specifications: Yup.string().nullable(),
          details: Yup.array()
            .of(
              Yup.object().shape({
                key: Yup.string().nullable(),
                value: Yup.string().nullable(),
              })
            )
            .nullable(),
          amenities: Yup.object().shape({
            Delivery: Yup.string().nullable(),
          }),
          event: Yup.array().of(Yup.string()).nullable(),
          rating: Yup.number().min(1).max(5).nullable(),
          reviews: Yup.array()
            .of(
              Yup.object().shape({
                user_id: Yup.string().nullable(),
                reviews: Yup.string().nullable(),
              })
            )
            .nullable(),
          tags: Yup.array().of(Yup.string()).nullable(),
          weight: Yup.array()
            .of(
              Yup.object().shape({
                key: Yup.string().nullable(),
                value: Yup.number().nullable(),
              })
            )
            .nullable(),
          brand: Yup.string().nullable(),
          color: Yup.string().nullable(),
          is_veg: Yup.boolean().nullable(),
          is_image: Yup.boolean().nullable(),
          is_message: Yup.boolean().nullable(),
        })
      )
      .nullable(),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      product_details: [
        {
          prices: 0,
          imageLink: [],
          title: "",
          description: "",
          specifications: "",
          details: [{ key: "", value: "" }],
          amenities: { Delivery: "" },
          event: [],
          rating: 1,
          reviews: [{ user_id: "", reviews: "" }],
          tags: [],
          weight: [{ key: "", value: 0 }],
          brand: "",
          color: "white",
          is_veg: false,
          is_image: false,
          is_message: false,
        },
      ],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = methods;

  const {
    fields: details,
    append: appendDetail,
    remove: removeDetail,
  } = useFieldArray({
    control,
    name: "product_details.0.details",
  });

  const {
    fields: weight,
    append: appendWeight,
    remove: removeWeight,
  } = useFieldArray({
    control,
    name: "product_details.0.weight",
  });

  const handleAddTag = (e) => {
    e.preventDefault();
    const newTag = e.target.value.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setValue("product_details.0.tags", [...tags, newTag]);
    }
    e.target.value = "";
  };

  const handleRemoveTag = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    setValue("product_details.0.tags", newTags);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file), // Unique identifier for each image
      src: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
    setValue("product_details.0.imageLink", [
      ...images,
      ...newImages.map((img) => img.src),
    ]);
  };

  const handleDeleteImage = (id) => {
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
    setValue(
      "product_details.0.imageLink",
      updatedImages.map((img) => img.src)
    );
  };

  const deliveryOptions = [
    { value: "Standard", label: "Standard" },
    { value: "Express", label: "Express" },
    { value: "Same Day", label: "Same Day" },
  ];

  const eventOptions = [
    { value: "Birthday", label: "Birthday" },
    { value: "Anniversary", label: "Anniversary" },
    { value: "Wedding", label: "Wedding" },
    { value: "Graduation", label: "Graduation" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
      <div className="space-y-4  md:h-[80vh] hide-scrollbar overflow-y-auto">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Title</label>
          <Input
            {...register("product_details.0.title")}
            className="bg-[#161b22] border-gray-800 text-gray-300"
            error={errors.product_details?.[0]?.title?.message}
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Price</label>
          <Input
            type="number"
            {...register("product_details.0.prices")}
            className="bg-[#161b22] border-gray-800 text-gray-300"
            error={errors.product_details?.[0]?.prices?.message}
          />
        </div>

        {/* Specifications */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">
            Specifications
          </label>
          <Input
            {...register("product_details.0.specifications")}
            className="bg-[#161b22] border-gray-800 text-gray-300"
            error={errors.product_details?.[0]?.specifications?.message}
          />
        </div>
        <div className="space-y-4 px-2">
          <label className="text-sm font-medium text-gray-400">Details</label>
          {details.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-2 mb-4">
              {/* Key Input */}
              <input
                placeholder="Key"
                {...register(`product_details.0.details.${index}.key`)}
                className="bg-[#161b22] border-gray-800 text-gray-300 p-2 rounded-md focus:ring focus:ring-blue-500"
              />

              <RichTextEditor
                methods={methods}
                fieldPath={`product_details.0.details.${index}.value`}
              />
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeDetail(index)}
                className="text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendDetail({ key: "", value: "" })}
            className="text-blue-500"
          >
            + Add Detail
          </button>
        </div>

        {/* Image Upload with Delete Functionality */}
        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-medium text-gray-400">Images</label>
          <input
            className="bg-[#161b22] border-gray-800 text-gray-300"
            type="file"
            multiple
            onChange={handleImageUpload}
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((img) => (
              <div key={img.id} className="relative w-20 h-20">
                <img
                  src={img.src}
                  alt="Preview"
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Tags */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Tags</label>
          <input
            className="bg-[#161b22] border-gray-800 text-gray-300 w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            type="text"
            onKeyDown={(e) => e.key === "Enter" && handleAddTag(e)}
            placeholder="Add a tag"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white font-bold text-sm text-gray-800 px-2 py-1 rounded-md flex justify-center items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-red-500"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Weight */}
        <div>
          <label className="text-sm font-medium text-gray-400">Types</label>
          {weight.map((item, index) => (
            <div key={item.id} className="flex gap-2 mb-2">
              <Input
                className="bg-[#161b22] border-gray-800 text-gray-300"
                placeholder="Key"
                {...register(`product_details.0.weight.${index}.key`)}
              />
              <Input
                className="bg-[#161b22] border-gray-800 text-gray-300"
                type="number"
                placeholder="Value"
                {...register(`product_details.0.weight.${index}.value`)}
              />
              <button
                type="button"
                onClick={() => removeWeight(index)}
                className="text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendWeight({ key: "", value: 0 })}
            className="text-blue-500"
          >
            + Add Types
          </button>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Brand</label>
          <Input
            label="Brand"
            {...register("product_details.0.brand")}
            error={errors.product_details?.[0]?.brand?.message}
            type="text"
            {...register("product_details.0.brand")}
            className="bg-[#161b22] border-gray-800 text-gray-300"
          />
        </div>
        {/* Color */}
        {/* <Input label="Color" {...register('product_details.0.color')} error={errors.product_details?.[0]?.color?.message} /> */}

        {/* Delivery Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Delivery</label>
          <Select
            options={deliveryOptions}
            {...register("product_details.0.amenities.Delivery")}
            onChange={(option) => option?.value}
            styles={customSelectStyles}
          />
        </div>

        {/* Event Multi-Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Event</label>
          <Select
            options={eventOptions}
            isMulti
            {...register("product_details.0.event")}
            onChange={(options) => options?.map((option) => option.value)}
            className="bg-[#161b22] border-gray-800 text-gray-300"
            styles={customSelectStyles}
          />
        </div>
        <div className="flex items-center space-x-2 my-2">
          <input
            type="checkbox"
            {...register("product_details.0.is_veg")}
            className="toggle-checkbox size-4"
          />
          <label className="text-sm font-medium text-gray-400">
            Show veg/non-veg option while ordering.
          </label>
        </div>
        <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("product_details.0.is_message")}
              className="toggle-checkbox size-4"
            />
          <label className="text-sm font-medium text-gray-400">
            Show "Message On Cake" option while ordering.
          </label>
        </div>
        <div className="flex items-center space-x-2 my-2">
          <input
            type="checkbox"
            {...register("product_details.0.is_image")}
            className="toggle-checkbox size-4"
          />
          <label className="text-sm font-medium text-gray-400">
            Take personalised images from user.
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <BasicButton
          type="button"
          onClick={onClose}
          className="bg-red-800/50 hover:bg-red-800 text-gray-300 px-4 py-2 rounded-lg"
        >
          Cancel
        </BasicButton>
        <BasicButton
          type="submit"
          className="bg-blue-800/50 hover:bg-blue-800 text-gray-300 px-4 py-2 rounded-lg"
        >
          Save
        </BasicButton>
      </div>
    </form>
  );
};

function AddProductModal({ onClose }) {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (data) => {
    try {
      console.log({
        data: {
          product_details: {
            ...data.product_details?.[0],
            weight: data.product_details?.[0]?.weight?.map((item) => ({
              weight: item.key,
              price: item.value,
            })),
          },
        },
      });
      const response = await createProduct({
        data: {
          product_details: {
            ...data.product_details?.[0],
            weight: data.product_details?.[0]?.weight?.map((item) => ({
              weight: item.key,
              price: item.value,
            })),
          },
        },
      }).unwrap();
      toast.success(response.message);
      // onClose();
    } catch (error) {
      toast.error("Failed to create product"); // You can customize this error message
      console.error("Order creation error:", error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="p-3 md:max-w-2xl relative">
        <div
          onClick={onClose}
          className="absolute right-2 top-2 w-fit cursor-pointer"
        >
          <X />
        </div>
        <h2 className="text-xl font-semibold text-gray-300 mb-5 flex gap-2 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path d="M3 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3Z" />
            <path
              fillRule="evenodd"
              d="M3 6h10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Zm3 2.75A.75.75 0 0 1 6.75 8h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 8.75Z"
              clipRule="evenodd"
            />
          </svg>
          Add Product
        </h2>
        <ProductForm onClose={onClose} onSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default AddProductModal;
