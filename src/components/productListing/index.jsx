/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import ProductListing from "./productPage";
import Sidebar from "./Sidebar";
import TopNavbar from "../../molecules/header/TopNavBar";
import { useFilterDetailsMutation } from "../../redux/apiSlices/ecom/listingApiSlice";
const ProductSearch = () => {
  const birthdayGiftsData = {
    title: "Memorable Birthday Gifts",
    rating: 4.0,
    reviewCount: 81202,
    totalItems: 36,
    sortOptions: [
      "Recommended",
      "New",
      "Price: Low to High",
      "Price: High to Low",
    ],
    promoCard: {
      title: "Get Flat 10% Off",
      subtitle: "on orders worth ₹1500 & above.",
      code: "WOWFNP",
    },
    categories: [
      "Flowers",
      "Cakes",
      "Personalised Gifts",
      "Plants",
      "Combos",
      "Birthday Bestsellers",
    ],
    products: [
      {
        name: "Rose Bouquet",
        price: "₹899",
        rating: 4.9,
        reviewCount: 89,
        deliveryInfo: "Earliest Delivery: Today",
        images: [
          "https://img.freepik.com/free-photo/flower-wallpaper-with-flower-called-daisies_1340-31840.jpg?t=st=1726165942~exp=1726169542~hmac=e309f415296a9f419d8fc9f5e4901f11550b70f522581a927b6ebce5acf71777&w=1380",
          "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512_640.jpg",
          "/api/placeholder/400/320",
        ],
      },
      {
        name: "Rose Bouquet",
        price: "₹899",
        rating: 4.9,
        reviewCount: 89,
        deliveryInfo: "Earliest Delivery: Today",
        images: [
          "https://img.freepik.com/free-photo/nature-romance-fresh-pink-flower-blossom-close-up-generated-by-ai_188544-15672.jpg?w=1480&t=st=1726167536~exp=1726168136~hmac=e952a8c95849c518d3501196ff7caab89575347d8169f634849d5c9edc40ff6e",
          "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512_640.jpg",
          "/api/placeholder/400/320",
        ],
      },
      {
        name: "Rose Bouquet",
        price: "₹899",
        rating: 4.9,
        reviewCount: 89,
        deliveryInfo: "Earliest Delivery: Today",
        images: [
          "https://img.freepik.com/free-photo/green-leaf-is-shown-with-orange-tulips-foreground_1340-40525.jpg?t=st=1726167552~exp=1726171152~hmac=1f47c7abeda8734eaa9e52022733644d1cf0c5cb02816ec1eabdb1426c076760&w=900",
          "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512_640.jpg",
          "/api/placeholder/400/320",
        ],
      },
      {
        name: "Rose Bouquet",
        price: "₹899",
        rating: 4.9,
        reviewCount: 89,
        deliveryInfo: "Earliest Delivery: Today",
        images: [
          "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512_640.jpg",
          "/api/placeholder/400/320",
          "/api/placeholder/400/320",
        ],
      },
    ],
  };
  const filterItems = [
    {
      title: "Price",
      children: [
        { title: "₹0 TO ₹499", count: 590, type: "checkbox" },
        { title: "₹500 TO ₹999", count: 1301, type: "checkbox" },
        { title: "₹1000 TO ₹1499", count: 971, type: "checkbox" },
        { title: "₹1500 TO ₹1999", count: 584, type: "checkbox" },
        { title: "₹2000 TO ₹2499", count: 344, type: "checkbox" },
        { title: "₹2500 TO ₹2999", count: 239, type: "checkbox" },
        { title: "₹3000 AND ABOVE", count: 354, type: "checkbox" },
      ],
    },
    {
      title: "Other",
      children: [
        { title: "₹0 TO ₹499", count: 590, type: "checkbox" },
        { title: "₹500 TO ₹999", count: 1301, type: "checkbox" },
        { title: "₹1000 TO ₹1499", count: 971, type: "checkbox" },
        { title: "₹1500 TO ₹1999", count: 584, type: "checkbox" },
        { title: "₹2000 TO ₹2499", count: 344, type: "checkbox" },
        { title: "₹2500 TO ₹2999", count: 239, type: "checkbox" },
        { title: "₹3000 AND ABOVE", count: 354, type: "checkbox" },
      ],
    },
  ];

  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [filterDetails, { isLoading, isError }] = useFilterDetailsMutation();
  const [hasMore, setHasMore] = useState(true); // Track if more data is available

  const fetchData = async (page) => {
    try {
      const response = await filterDetails({
        search_text: "cakes",
        sortBy: "new",
        page,
        limit: 33,
      }).unwrap();

      if (response.data.length > 0) {
        console.log('response: ', response.data);
        setSearchData((prevData) => [...prevData, ...response.data]);
      } else {
        setHasMore(false); // No more data
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Initial data load
    fetchData(page);
  }, [page]);

  // Callback to load more products when 70% is scrolled
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment the page
    }
  }, [isLoading, hasMore]);

  return (
    <>
      <TopNavbar
        logo="/path/to/your/logo.png"
        title="logo"
        searchPlaceholder="Search flowers, cakes, gifts, etc."
        currencies={["INR", "USD", "EUR"]}
        deliveryLocationText="Select Delivery Location"
        franchiseEnquiriesText="Franchise Enquiries"
        corporateGiftsText="Corporate Gifts"
        moreOptions={[
          { label: "About Us", link: "/about" },
          { label: "Contact", link: "/contact" },
          { label: "FAQ", link: "/faq" },
        ]}
        userGreeting="Hi Guest"
      />
      <div className="flex h-screen gap-4 bg-gray-100 mt-4 px-4">
        {/* Sidebar */}
        <div className="w-3/12 bg-gray-100 h-fit rounded-lg overflow-hidden mt-4 sticky top-4">
          <Sidebar
            mode="filter"
            textTop={"Filter"}
            isOpen={true}
            filterItems={filterItems}
          />
        </div>

        {/* Product Listing */}
        <div className="w-full 9/12 overflow-y-scroll h-full scrollbar-hide">
          <ProductListing {...birthdayGiftsData} products={searchData} onScrollEnd={handleLoadMore} />
        </div>
      </div>
    </>
  );
};

export default ProductSearch;
