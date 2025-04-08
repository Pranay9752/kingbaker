import OwnerHeader from "../../../molecules/header/OwnerHeader";
import SEO from "../../../atom/seo/SEO";

import React, { useState } from "react";
import {
  Upload,
  X,
  Check,
  AlertTriangle,
  Loader,
  Trash2,
  FileText,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import * as XLSX from "xlsx";
import BulkUploadPreviewCard from "./BulkUploadPreviewCard";
import { useCreateProductMutation } from "../../../redux/apiSlices/owner/product";
import { cn } from "../../../atom/utils/cn";
import { toast } from "sonner";

const BulkUpdateScreen = () => {
  // States for different parts of the flow
  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageData, setImageData] = useState({});
  console.log('imageData: ', imageData);
  const [fileError, setFileError] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadState, setUploadState] = useState(null); // 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation();

  // Mock function to parse file data (in a real app, you'd implement actual file parsing)
  const parseFileData = (file) => {
    return new Promise((resolve, reject) => {
      // Simulating file processing delay
      setTimeout(() => {
        // Mock data that would come from file
        const mockData = [
          {
            id: "NEW-001",
            name: "Strawberry Shortcake",
            category: "Cakes",
            price: "$49.99",
            description:
              "Fresh strawberries layered with light sponge and cream",
            image: "/api/placeholder/120/80",
            status: "new",
          },
          {
            id: "UPD-102",
            name: "Premium Gift Box",
            category: "Gift Boxes",
            price: "$89.99",
            description: "Luxury assortment of chocolates and specialty items",
            image: "/api/placeholder/120/80",
            status: "update",
          },
          {
            id: "NEW-003",
            name: "Black Forest Gateau",
            category: "Cakes",
            price: "$54.99",
            description: "Classic chocolate sponge with cherries and cream",
            image: "/api/placeholder/120/80",
            status: "new",
          },
          {
            id: "UPD-245",
            name: "Birthday Special Cake",
            category: "Cakes",
            price: "$59.99",
            description:
              "Customizable celebration cake with colorful decorations",
            image: "/api/placeholder/120/80",
            status: "update",
            error: "Product ID not found in database",
          },
          {
            id: "NEW-005",
            name: "Anniversary Gift Set",
            category: "Gift Boxes",
            price: "$129.99",
            description:
              "Romantic gift package with champagne and handmade chocolates",
            image: "/api/placeholder/120/80",
            status: "new",
          },
        ];

        if (file.name.endsWith(".csv") || file.name.endsWith(".xlsx")) {
          resolve(mockData);
        } else {
          reject(
            new Error("Invalid file format. Please upload a CSV or Excel file.")
          );
        }
      }, 1500);
    });
  };
  const getProductData = (data, index) => {
    const product_details = {
      prices: "",
      pp: "",
      imageLink: [],
      title: "",
      description: "",
      specifications: "",
      details: [],
      amenities: { Delivery: "" },
      event: [],
      rating: 1,
      reviews: [{ user_id: "", reviews: "" }],
      tags: [],
      weight: [],
      brand: "",
      color: "",
      is_veg: true,
      is_image: true,
      is_message: true,
      index,
    };

    data?.forEach((element) => {
      if (element["Title"]) {
        Object.assign(product_details, {
          title: element["Title"],
          prices: element["Price"],
          pp: element["pp"],
          specifications: element["Specifications"],
          is_veg: element["Is_Veg"],
          is_image: element["Is_Image"],
          is_message: element["Is_Message"],
          brand: element["Brand"],
          tags: element["Tags"]?.split(",") || [],
          event: element["events"]?.split(",") || [],
        });
      }

      if (element["Image Links"])
        product_details.imageLink.push(element["Image Links"]);

      if (element["detail_key"] && element["detail_value"]) {
        product_details.details.push({
          key: element["detail_key"],
          value: element["detail_value"],
        });
      }

      if (element["weight"]) {
        const weightEntry = {
          weight: element["weight"],
          price: element["weight_price"],
          images: element["weight_image"] ? [element["weight_image"]] : [],
        };
        product_details.weight.push(weightEntry);
      } else if (element["weight_image"] && product_details.weight.length > 0) {
        // Ensure the last weight entry exists before pushing an image
        product_details.weight[product_details.weight.length - 1].images.push(
          element["weight_image"]
        );
      }
    });

    return product_details;
  };

  const arrangeData = (data) => {
    const groupedData = data.reduce(
      (acc, item) => {
        if (item["Title"]) acc.index++;
        acc.result[acc.index] = [...(acc.result[acc.index] || []), item];
        return acc;
      },
      { result: {}, index: 0 }
    ).result;

    return Object.values(groupedData).map(getProductData);
  };
  const arrangeImageData = (data) => {
    console.log("data: ", data);

    const imageObject = {};

    data.forEach((element) => {
      imageObject[element?.weight_image] = element;
    });

    return imageObject;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    if (selectedFile) {
      setFile(selectedFile);
      setFileError(null);
      setLoading(true);

      // // Process file data
      // parseFileData(selectedFile)
      //   .then(data => {
      //     setPreviewData(data);
      //     setLoading(false);
      //   })
      //   .catch(error => {
      //     setFileError(error.message);
      //     setFile(null);
      //     setLoading(false);
      //   });

      reader.onload = (event) => {
        // Read the file as a binary string
        const binaryString = event.target.result;

        // Parse the Excel file
        const workbook = XLSX.read(binaryString, { type: "binary" });

        // Get the first sheet name
        const worksheetName = workbook.SheetNames[0];

        // Get the first worksheet
        const worksheet = workbook.Sheets[worksheetName];

        // Convert worksheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const products = arrangeData(jsonData);
        console.log(products);
        setPreviewData(products);
        setLoading(false);
        // Set the parsed data in state
      };

      // Read the file as a binary string
      reader.readAsBinaryString(selectedFile);
    }
  };
  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    if (selectedFile) {
      setImageFile(selectedFile);

      // // Process file data
      // parseFileData(selectedFile)
      //   .then(data => {
      //     setPreviewData(data);
      //     setLoading(false);
      //   })
      //   .catch(error => {
      //     setFileError(error.message);
      //     setFile(null);
      //     setLoading(false);
      //   });

      reader.onload = (event) => {
        // Read the file as a binary string
        const binaryString = event.target.result;

        // Parse the Excel file
        const workbook = XLSX.read(binaryString, { type: "binary" });

        // Get the first sheet name
        const worksheetName = workbook.SheetNames[0];

        // Get the first worksheet
        const worksheet = workbook.Sheets[worksheetName];

        // Convert worksheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const images = arrangeImageData(jsonData);
        setImageData(images);
        toast.success("Image file Added!")
        // Set the parsed data in state
      };

      // Read the file as a binary string
      reader.readAsBinaryString(selectedFile);
    }
  };

  // Handle bulk upload process
  const handleBulkUpload = async () => {
    setShowModal(true);
    setUploadState("loading");

    const concurrencyLimit = 10; // Limit to 10 concurrent requests
    let index = 0;

    const processNext = async () => {
      if (index >= previewData.length) return;

      const currentIndex = index++;
      try {
        await createProduct({
          data: { product_details: previewData[currentIndex] },
        });
      } catch (error) {
        console.error(`Failed to upload item at index ${currentIndex}`, error);
      }

      await processNext(); // Start the next request
    };

    // Start `concurrencyLimit` parallel requests
    await Promise.all(new Array(concurrencyLimit).fill(null).map(processNext));

    setUploadState("success");
  };

  const handleRemove = (productIndex) => {
    setPreviewData((prev) => {
      const index = prev.findIndex((item) => item.index === productIndex);
      if (index === -1) return prev; // If not found, return unchanged

      const newData = [...prev];
      const lastIndex = newData.length - 1;

      // Swap with the last element and remove
      [newData[index], newData[lastIndex]] = [
        newData[lastIndex],
        newData[index],
      ];
      newData.pop(); // Remove the last element

      return newData;
    });
  };

  // Close modal and reset states as needed
  const closeModal = () => {
    setShowModal(false);
    if (uploadState === "success") {
      // Reset everything after successful upload
      setFile(null);
      setPreviewData([]);
    }
    setUploadState(null);
  };

  const handleDownload = () => {
    const files = [
      { url: "/Product Template.xlsx", name: "Product Template.xlsx" },
      // { url: "/Image Tempate.xlsx", name: "Image Tempate.xlsx" },
    ];

    files.forEach((file) => {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="flex flex-col min-h- screen bg -[#1a1f25] text-gray-100">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* File Upload Section */}
        <div className="mb-8">
          <div className="w-full flex justify-end items-center pb-5">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg cursor-pointer transition-colors ml-auto"
            >
              Dowload Template
            </button>
          </div>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              fileError
                ? "border-red-500 bg-red-900/10"
                : "border-gray-700 hover:border-purple-500/50"
            }`}
          >
            {!file && !loading ? (
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-500 mb-3" />
                <h2 className="text-xl font-medium mb-2">
                  Drop your file here or click to browse
                </h2>
                <p className="text-gray-400 mb-4">
                  Supports CSV and Excel files
                </p>
                <div className="space-x-4">
                  {/* {!imageFile && (
                    <label className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg cursor-pointer transition-colors">
                      Select Image File
                      <input
                        type="file"
                        className={"hidden"}
                        accept=".csv,.xlsx,.xls"
                        onChange={handleImageFileChange}
                      />
                    </label>
                  )} */}
                  <label className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg cursor-pointer transition-colors">
                    Select File
                    <input
                      type="file"
                      className="hidden"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {fileError && (
                  <div className="mt-4 text-red-400 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{fileError}</span>
                  </div>
                )}
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center">
                <Loader className="h-12 w-12 text-purple-500 animate-spin mb-3" />
                <h2 className="text-xl font-medium">Processing your file...</h2>
                <p className="text-gray-400 mt-2">This may take a moment</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-10 w-10 text-purple-400" />
                    <div className="text-left">
                      <h3 className="font-medium">{file.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {previewData.length} products found
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setFile(null);
                        setPreviewData([]);
                      }}
                      className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Remove</span>
                    </button>
                    <button
                      onClick={handleBulkUpload}
                      className="px-4 py-1.5 bg-purple-700 hover:bg-purple-600 rounded-lg flex items-center gap-1.5 transition-colors"
                      disabled={previewData.length === 0}
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload All</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Preview Section */}
        {previewData.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Preview Products</h2>
              <div className="text-sm text-gray-400">
                {previewData.filter((item) => item.status === "new").length} new
                •{previewData.filter((item) => item.status === "update").length}{" "}
                updates •{previewData.filter((item) => item.error).length} with
                errors
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {previewData.map((item) => (
                <BulkUploadPreviewCard
                  key={item?.title}
                  product={item}
                  onRemove={() => handleRemove(item.index)}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleBulkUpload}
                className="px-6 py-2.5 bg-purple-700 hover:bg-purple-600 rounded-lg flex items-center gap-2 transition-colors"
                disabled={previewData.length === 0}
              >
                <Upload className="h-5 w-5" />
                <span>Upload {previewData.length} Products</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Status Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            {uploadState === "loading" && (
              <div className="text-center">
                <Loader className="h-16 w-16 text-purple-500 animate-spin mx-auto mb-4" />
                <h2 className="text-xl font-medium mb-2">Uploading Products</h2>
                <p className="text-gray-400 mb-4">
                  Please wait while we process your products...
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className="bg-purple-600 h-2 rounded-full animate-pulse"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            )}

            {uploadState === "success" && (
              <div className="text-center">
                <div className="bg-green-900/30 p-3 rounded-full inline-flex mb-4">
                  <Check className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-xl font-medium mb-2">Upload Successful</h2>
                <p className="text-gray-400 mb-6">
                  All {previewData.length} products have been successfully
                  uploaded.
                </p>
                <button
                  onClick={closeModal}
                  className="w-full px-4 py-2.5 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            )}

            {uploadState === "error" && (
              <div className="text-center">
                <div className="bg-red-900/30 p-3 rounded-full inline-flex mb-4">
                  <AlertTriangle className="h-16 w-16 text-red-500" />
                </div>
                <h2 className="text-xl font-medium mb-2">Upload Failed</h2>
                <p className="text-gray-400 mb-4">{errorMessage}</p>
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setUploadState("loading");
                      setTimeout(() => setUploadState("success"), 2000);
                    }}
                    className="flex-1 px-4 py-2.5 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="p-4 border-t border-gray-700 bg-gray-800/50">
        <div className="text-sm text-gray-400 text-center">
          {previewData.length > 0
            ? `${previewData.length} products ready for upload`
            : "Upload a file to get started"}
        </div>
      </footer>
    </div>
  );
};

const OwnerBulkUpdate = ({}) => {
  return (
    <>
      <OwnerHeader isActive={"Bulk Update"}>
        <SEO title={"Bulk Update"} />

        <div className="w-full bg-black text-gray-300 p-4 rounded-lg">
          <BulkUpdateScreen />
        </div>
      </OwnerHeader>
    </>
  );
};

export default OwnerBulkUpdate;
