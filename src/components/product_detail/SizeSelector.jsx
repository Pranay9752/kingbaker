import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const SizeSelector = ({ image, sizes }) => {
  const { setValue, getValues } = useFormContext();
  const [selectedSize, setSelectedSize] = useState(null);
  const handleSpecificationChage = (size, decimal = 1) => {
    const body = {
      name: "weight",
      value: {
        unit: size.weight,
        price: size.price,
        images: decimal == 1 ? size.images : null
      },
    };
    setValue("specification", body);
    setSelectedSize(body);
  };

  useEffect(() => {
    if (sizes && Array.isArray(sizes) && sizes.length > 0)
      handleSpecificationChage(sizes[0], 0);
  }, [sizes]);

  if(sizes && Array.isArray(sizes) && sizes?.length == 1) return <></>
  return (
    // <div className="w-full ">
    //   <h3 className="text font-semibold mb-3">Pick an upgrade</h3>
    //   <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-10 gap-4 w-fit">
    //     {sizes.map((size, index) => (
    //       <button
    //         key={index}
    //         onClick={() => handleSpecificationChage(size)}
    //         className={`relative group flex-1 w-fit border rounded-lg ${
    //           selectedSize?.value?.unit === size
    //             ? "ring-1 0 ring-blue-500"
    //             : "hover hover:ring-blue-300"
    //         }`}
    //       >
    //         <img
    //           src={size.images?.[0] || image}
    //           alt={`${size}${size?.unit ?? ""} size`}
    //           className="w-full aspect-square object-cover rounded-t-lg"
    //           onError={(e) => {
    //             e.target.src =
    //               "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";
    //           }}
    //         />
    //         <div className="p-2 text-center bg-white rounded-b-lg">
    //           <p className="font-medium">
    //             {size.weight}
    //             {/* {size.weight} {size?.unit ?? ""} */}
    //           </p>
    //           <p className="text-gray-600">₹ {size?.price ?? 0.0}</p>
    //         </div>
    //         {selectedSize?.value?.unit == size.weight && (
    //           <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none" />
    //         )}
    //       </button>
    //     ))}
    //   </div>
    // </div>
    <div className="w-full px-4 md:px-6 lg:px-8">
  <h3 className="text-lg md:text-xl font-semibold mb-3 text-center md:text-left">
    Pick an upgrade
  </h3>
  <div className="flex flex-wrap gap-4">
    {sizes.map((size, index) => (
      <button
        key={index}
        onClick={() => handleSpecificationChage(size)}
        className={`relative group flex-1 max-w-[90px] md:max-w-[120px] border rounded-lg ${
          selectedSize?.value?.unit === size
            ? "ring-1 ring-blue-500"
            : "hover:ring-blue-300"
        }`}
      >
        <img
          src={size.images?.[0] || image}
          alt={`${size}${size?.unit ?? ""} size`}
          className="w-full aspect-square object-cover rounded-t-lg"
          onError={(e) => {
            e.target.src =
              "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";
          }}
        />
        <div className="p-2 text-center bg-white rounded-b-lg">
          <p className="font-medium text-sm md:text-base">
            {size.weight}
          </p>
          <p className="text-gray-600 text-sm">₹ {size?.price ?? 0.0}</p>
        </div>
        {selectedSize?.value?.unit == size.weight && (
          <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none" />
        )}
      </button>
    ))}
  </div>
</div>


  );
};

export default SizeSelector;
