import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import OwnerHeader from "../../../molecules/header/OwnerHeader";
import { useSuggestionProductMutation } from "../../../redux/apiSlices/ecom/productsApiSlice";
import { useFilterProductMutation } from "../../../redux/apiSlices/ecom/listingApiSlice";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
  },
  headerContainer: {
    marginBottom: 30,
    textAlign: "center",
  },
  headerAccent: {
    fontSize: 12,
    color: "#FF6B6B",
    marginBottom: 8,
    letterSpacing: 2,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  headerDivider: {
    width: "40%",
    height: 3,
    backgroundColor: "#FF6B6B",
    alignSelf: "center",
    marginBottom: 20,
  },
  dateContainer: {
    marginBottom: 25,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dateLabel: {
    fontSize: 11,
    color: "#868E96",
    marginRight: 5,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  date: {
    fontSize: 11,
    color: "#2D3436",
    fontWeight: "bold",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
  },
  product: {
    width: "45%",
    marginBottom: 25,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 15,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    color: "#212529",
    fontWeight: "bold",
  },
  price: {
    fontSize: 12,
    color: "#FF6B6B",
    marginBottom: 5,
  },
  link: {
    fontSize: 11,
    color: "#4DABF7",
    textDecoration: "none",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#868E96",
  },
});

// Default image URL - replace with your actual default image URL
const DEFAULT_IMAGE =
  "https://placehold.co/400x300/F8F9FA/A0AEC0?text=Product+Image";

const PDFDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Modern Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerAccent}>PREMIUM COLLECTION</Text>
          <Text style={styles.header}>King Baker</Text>
          <View style={styles.headerDivider} />
        </View>

        {/* Modernized Date */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Curated On</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* Products Grid */}
        <View style={styles.grid}>
          {data?.map((product) => (
            <View key={product.productId} style={styles.product}>
              <Image
                src={product.imageLink?.[0] || DEFAULT_IMAGE}
                style={styles.image}
              />
              <Text style={styles.title}>{product.title}</Text>
              {product.price && (
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              )}
              <Link
                src={`https://kingbaker.vercel.com/product/${product.productId}`}
                style={styles.link}
              >
                View Product →
              </Link>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Visit kingbaker.vercel.com for our complete collection
        </Text>
      </Page>
    </Document>
  );
};

const OwnerProducts = () => {
  const skeletonCount = 6;

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const [suggestionProduct] = useSuggestionProductMutation();
  const [filterProduct, { isLoading: productLoading }] =
    useFilterProductMutation();

  // Fetch product suggestions with debouncing
  const fetchSuggestions = useCallback(
    debounce(async (term) => {
      if (term.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const result = await suggestionProduct({ query: term }).unwrap();
        setSuggestions(result?.suggestions || []);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [suggestionProduct]
  );

  // Fetch products based on a selected suggestion
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

  // Handle search input changes
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
    handleSuggestionClick('cake');
  },[])

  return (
    <OwnerHeader isActive="Products">
      <div className="w-full bg-black text-gray-300 p-4 rounded-lg">
        {/* Search Section */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-8 py-1.5 bg-[#161b22] border border-gray-800 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-gray-300"
              placeholder="Search Products"
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
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-600 transition-colors">
            <PDFDownloadLink
              document={<PDFDocument data={data} />}
              fileName="king_baker_products.pdf"
              className="text-white hover:text-gray-300"
            >
              {({ loading }) =>
                loading ? (
                  "Preparing PDF..."
                ) : (
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
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                )
              }
            </PDFDownloadLink>
          </button>
        </div>

        {productLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[...Array(skeletonCount)].map((_, index) => (
              <div
                key={index}
                className="bg-[#161b22] rounded-xl overflow-hidden animate-pulse"
              >
                <div className="relative">
                  <div className="w-full h-48 bg-gray-700" />
                  <div className="absolute top-3 left-3 bg-gray-700 w-16 h-6 rounded-full" />
                </div>
                <div className="p-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-8 bg-gray-700 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!productLoading && (!data || data.length === 0) ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center max-w-7xl mx-auto">
            <div className="bg-[#161b22] p-8 rounded-xl text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-500">
                We couldn't find any products matching your criteria.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  mx-auto">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-[#161b22] rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={item.imageLink?.[0]}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src =
                        "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg";
                    }}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-500 px-3 py-1 rounded-full text-sm font-medium text-white shadow-lg">
                    {item.productId || ""}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-400 mb-2 truncate">
                    {item.title || ""}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-emerald-600">
                      {(item.weight?.[0]?.price || "0.00")?.toLocaleString(
                        "en-IN",
                        {
                          currency: "inr",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </OwnerHeader>
  );
};

export default OwnerProducts;
