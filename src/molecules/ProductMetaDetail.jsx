import { useState } from "react";
import BasicButton from "../atom/button/BasicButton";

const SECTIONS = [
  { label: "Description", value: "Description" },
  { label: "Delivery Info", value: "Delivery Info" },
  { label: "Care Info", value: "Care Info" },
];

const productDetails = {
  "Product Details": {
    "Cake Flavour": "Truffle",
    Version: "Eggless",
    "Type of Cake": "Cream Cake",
    Shape: "Round",
    Weight: "500 gm",
    "Net Quantity": "1 Cake",
    Diameter: "7.5 inch",
    "Country Of Origin": "India",
    Serves: "4-6 People",
  },
  Ingredients: [
    "Chocolate premix",
    "Refined oil",
    "Breakfast Sugar",
    "Chocolate Truffle Base",
    "Dark Chocolate compound",
    "Milk chocolate compound",
    "Chocolate Glaze",
  ],
  "Please Note": [
    "The cake stand, cutlery accessories used in the image are only for representation purposes. They are not delivered with the cake.",
    "This cake is hand delivered in a good quality cardboard box.",
  ],
};

const ProductMetaDetail = () => {
  const [selectedSection, setSelectedSection] = useState(0);

  const handleChange = (index) => {
    setSelectedSection(index);
  };

  return (
    <div className="grid grid-cols-3 py-2 gap-2">
      {SECTIONS.map((item, index) => {
        return (
          <BasicButton
            onClick={() => handleChange(index)}
            key={index}
            className={`${
              selectedSection == index
                ? "bg-blue-400 text-white"
                : "bg-black/30 text-gray-800"
            } rounded-lg`}
          >
            {item?.label ?? ""}
          </BasicButton>
        );
      })}
      <div className="col-span-3">
        {Object.keys(productDetails).map((key, index) => (
          <div>
            <h3 className="text-base font-bold text-gray-800">{key}:</h3>
              {Array.isArray(productDetails[key]) ? (
                <ul className="list-disc list-inside text-gray-600 flex flex-col gap-2 m-3 mt-2">
                  {productDetails[key].map((item, i) => (
                    <li key={i}><span>{item}</span></li>
                  ))}
                </ul>
              ) : (
                <ul className="list-disc list-inside text-gray-600 flex flex-col gap-2 m-3 mt-2">
                  {Object.keys(productDetails[key]).map((item, i) => (
                    <li key={i}>
                      {item} - {productDetails[key][item]}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductMetaDetail;
