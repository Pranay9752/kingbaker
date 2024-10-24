import React, { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

const SizeSelector = ({ image, sizes }) => {
  const { setValue, getValues } = useFormContext();
  const [selectedSize, setSelectedSize] = useState(null);
  console.log("selectedSize: ", selectedSize);

  const handleSpecificationChage = (size) => {
    const body = {
      name: "weight",
      value: {
        unit: size,
        price: 0,
      },
    };
    setValue("specification", body);
    setSelectedSize(body);
  };

  return (
    <div className="w-full ">
      <h3 className="text font-semibold mb-3">Pick an upgrade</h3>
      <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-10 gap-4 w-fit">
        {sizes.map((size, index) => (
          <button
            key={index}
            onClick={() => handleSpecificationChage(size)}
            className={`relative group flex-1 w-fit border rounded-lg ${
              selectedSize?.value?.unit === size
                ? "ring-1 0 ring-blue-500"
                : "hover hover:ring-blue-300"
            }`}
          >
            <img
              src={image}
              alt={`${size}${size?.unit ?? ""} size`}
              className="w-full aspect-square object-cover rounded-t-lg"
              onError={(e) => {
                e.target.src =
                  "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";
              }}
            />
            <div className="p-2 text-center bg-white rounded-b-lg">
              <p className="font-medium">
                {size} {size?.unit ?? ""}
              </p>
              <p className="text-gray-600">₹ {size?.price ?? 0.0}</p>
            </div>
            {selectedSize?.value?.unit == size && (
              <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
