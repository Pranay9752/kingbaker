import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ChevronLeft,
} from "lucide-react";
import { useCallback } from "react";
import { useFilterProductMutation } from "../../../redux/apiSlices/ecom/listingApiSlice";
import { useSuggestionProductMutation } from "../../../redux/apiSlices/ecom/productsApiSlice";
import { debounce } from "lodash";
import {
  useGetMapProductByVendorIdQuery,
  useMapProductByVendorMutation,
} from "../../../redux/apiSlices/owner/vendor";
import ScreenLoader from "../../../atom/loader/screenLoader";

const VendorMapping = ({ vendor_id, onBack }) => {
  // Sample cake and gift product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Chocolate Truffle Cake",
      category: "Cakes",
      price: "$49.99",
      description: "Rich chocolate ganache with smooth truffle layers",
      image: "/api/placeholder/300/200",
      isMapped: true,
    },
    {
      id: 2,
      name: "Red Velvet Celebration",
      category: "Cakes",
      price: "$54.99",
      description: "Classic red velvet with cream cheese frosting",
      image: "/api/placeholder/300/200",
      isMapped: true,
    },
    {
      id: 3,
      name: "Birthday Gift Hamper",
      category: "Gift Boxes",
      price: "$89.99",
      description:
        "Curated gift set with chocolates, candles, and personalized card",
      image: "/api/placeholder/300/200",
      isMapped: true,
    },
    {
      id: 4,
      name: "Vanilla Blueberry Cake",
      category: "Cakes",
      price: "$44.99",
      description: "Light vanilla sponge with fresh blueberry compote",
      image: "/api/placeholder/300/200",
      isMapped: false,
    },
    {
      id: 5,
      name: "Congratulations Gift Set",
      category: "Gift Boxes",
      price: "$79.99",
      description: "Premium champagne with assorted chocolates and flowers",
      image: "/api/placeholder/300/200",
      isMapped: false,
    },
    {
      id: 6,
      name: "Mango Passion Fruit Cake",
      category: "Cakes",
      price: "$59.99",
      description: "Tropical mango cake with passion fruit mousse",
      image: "/api/placeholder/300/200",
      isMapped: false,
    },
    {
      id: 7,
      name: "Anniversary Special Cake",
      category: "Cakes",
      price: "$69.99",
      description: "Elegant two-tier cake with gold accents and roses",
      image: "/api/placeholder/300/200",
      isMapped: true,
    },
    {
      id: 8,
      name: "Custom Gift Basket",
      category: "Gift Boxes",
      price: "$99.99",
      description: "Personalized gift basket with selection of premium treats",
      image: "/api/placeholder/300/200",
      isMapped: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);

  // State management
  const [viewMode, setViewMode] = useState("mapped");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [suggestionProduct, { isLoading }] = useSuggestionProductMutation();
  const [filterProduct, { isLoading: productLoading }] =
    useFilterProductMutation();
  const [mappedVendors, setMappedVendors] = useState([]);

  const [mapProductByVendor, { isLoading: mapProductByVendorLoading }] =
    useMapProductByVendorMutation();

  const {
    data: mapDatabyProductId,
    refetch,
    isLoading: getMapProductByVendoridLoading,
  } = useGetMapProductByVendorIdQuery(vendor_id, {
    refetchOnMountOrArgChange: vendor_id,
  });

  const modeData = useMemo(() => {
    if (viewMode == "unmapped" && data) {
      return data;
    } else if (viewMode == "mapped" && mapDatabyProductId) {
      return mapDatabyProductId?.data.map((item) => item?.productDetails) || [];
    } else {
      return [];
    }
  }, [viewMode, data, mapDatabyProductId]);

  // Filter products based on mapped status, search query, and category
  const filteredProducts = products.filter((product) => {
    const matchesView =
      viewMode === "all" ||
      (viewMode === "mapped" && product.isMapped) ||
      (viewMode === "unmapped" && !product.isMapped);
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesView && matchesSearch && matchesCategory;
  });

  // Get unique categories for the filter dropdown
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Toggle product mapping status
  const toggleMapping = async (productId) => {
    try {
      await mapProductByVendor({ mapproduct: [productId], vendor_id });

      setData((prev) =>
        prev.map((product) =>
          product._id === productId
            ? { ...product, isMapped: !product.isMapped }
            : product
        )
      );
      refetch();
    } catch (error) {}
  };

  const fetchSuggestions = useCallback(
    debounce(async (term) => {
      if (term.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const result = await suggestionProduct({ query: term }).unwrap();
        setSuggestions(result?.suggestions || []);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      }
    }, 300),
    [suggestionProduct]
  );

  const fetchData = async (tag) => {
    try {
      const response = await filterProduct({
        search_text: tag,
        sortBy: "new",
        page: 1,
        limit: 33,
        productFilters: {},
      }).unwrap();
      setData(response || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setData([]);
    fetchSuggestions(value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    fetchData(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleSuggestionClick(searchTerm.trim());
    }
  };

  useEffect(() => {
    handleSuggestionClick("cake");
  }, []);

  useEffect(() => {
    if (mapDatabyProductId && mapDatabyProductId?.data) {
      setMappedVendors(
        mapDatabyProductId?.data.map((item) => item?.productDetails?._id)
      );
    }
  }, [mapDatabyProductId]);

  return (
    <div className="flex flex-col min-h-screen bg- [#1a1f25] text-gray-100">
      {/* Header */}
      <header className="p-6 border-b border-gray-700">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBack()}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                viewMode === "all"
                  ? "bg-gray-900/40 text-purple-300"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setViewMode("mapped")}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                viewMode === "mapped"
                  ? "bg-blue-900/40 text-blue-300"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Mapped Products
            </button>
            <button
              onClick={() => setViewMode("unmapped")}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                viewMode === "unmapped"
                  ? "bg-pink-900/40 text-pink-300"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Unmapped Products
            </button>
          </div>
          <div className="relative flex-1 max-w-72">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search cakes and gifts..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
            />
            {isLoading && (
              <div className="absolute top-full mt-1 w-full p-2 text-center text-gray-500 animate-pulse bg-[#161b22]">
                Loading suggestions...
              </div>
            )}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 top-full mt-1 w-full bg-[#161b22] rounded shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 text-gray-200 hover:bg-[#161b22]/60 cursor-pointer transition-colors duration-200"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-hidden flex flex-col">
        {/* Status message for filtered views */}
        {modeData.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8 bg-gray-800/50 rounded-xl border border-gray-700 max-w-md">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-500" />
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-400">
                {viewMode === "mapped"
                  ? "You haven't mapped any products yet. Try mapping some products from the unmapped section."
                  : viewMode === "unmapped"
                  ? "All your products are currently mapped. Great job!"
                  : "No products match your current filters. Try adjusting your search or filters."}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {modeData.map((product) => {
                const isMapped = mappedVendors?.includes(product?._id);
                return (
                  <div
                    key={product.productId}
                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 transition-transform hover:scale-102 flex flex-col"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={product.imageLink?.[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";
                        }}
                      />
                      <div
                        className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                          isMapped
                            ? "bg-green-900/70 text-green-300"
                            : "bg-gray-900/70 text-gray-300"
                        }`}
                      >
                        {isMapped ? "Mapped" : "Unmapped"}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="mb-2">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                          {product.productId}
                        </span>
                      </div>
                      <h3 className="font-medium text-lg mb-1">
                        {product.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 flex-1">
                        {product.specifications}
                      </p>

                      <div className="flex justify-between items-center mt-auto">
                        <span className="font-medium text-lg">
                          ₹{product.prices}
                        </span>
                        <button
                          onClick={() => toggleMapping(product._id)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                            isMapped
                              ? "bg-red-900/20 text-red-400 hover:bg-red-900/40"
                              : "bg-green-900/20 text-green-400 hover:bg-green-900/40"
                          }`}
                        >
                          {isMapped ? (
                            <>
                              <X className="h-3.5 w-3.5" /> Unmap
                            </>
                          ) : (
                            <>
                              <Plus className="h-3.5 w-3.5" /> Map
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <ScreenLoader
        isLoading={
          mapProductByVendorLoading ||
          getMapProductByVendoridLoading ||
          productLoading
        }
      />
    </div>
  );
};

export default VendorMapping;
