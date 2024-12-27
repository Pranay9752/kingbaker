/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import ProductListing from "./ProductPage";
import Sidebar from "./Sidebar";
import TopNavbar from "../../molecules/header/TopNavBar";
import {
  useFilterDetailsMutation,
  useFilterProductMutation,
} from "../../redux/apiSlices/ecom/listingApiSlice";
import MobileFilterSort from "./MobileFilterSort";
import { useParams } from "react-router-dom";
import Modal from "../../atom/popovers/Modal";
import Loader from "../../atom/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../molecules/footer/footer";
import NavBar from "../home/NavBar";
import { setAdvFilter } from "../../redux/slices/ecom/advFilters";
import filterNonEmptyValues from "../../atom/utils/filterNonEmptyvalues";

//PROD6756,PROD3181,PROD2465
const ProductSearch = () => {
  const [sortKeys, setSortKeys] = useState({ label: "New", value: "new" });
 
  const birthdayGiftsData = {
    title: "Memorable Birthday Gifts",
    rating: 4.0,
    reviewCount: 0,
    totalItems: 36,
    sortOptions: [
      // { label: "Recommended", value: "new" },
      { label: "New", value: "new" },
      { label: "Price: Low to High", value: "low-to-high" },
      { label: "Price: High to Low", value: "high-to-low" },
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

  const tag = useParams();
  const [searchData, setSearchData] = useState([]);
  const filter = useSelector((state) => state.filter);
  const selectedFilter = useSelector((state) => state.selectedFilter);
  const advFilter = useSelector((state) => state.advFilter);
  const [limit, setLimit] = useState({
    name: "prices",
    lwrlmt: 0,
    uprlmt: 1000,
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  const dispatch = useDispatch();
  const [filterDetails, { isLoading }] = useFilterDetailsMutation();
  const [filterProduct, { isLoading: filterLoading }] =
    useFilterProductMutation();

  const handleLimit = (e, up, down) => {
    setLimit((prev) => ({ ...prev, lwrlmt: down, uprlmt: up }));
  };

  const handleSortChange = (option) => {
    setSortKeys(option);
  };
  const fetchData = async (page) => {
    try {
      const response = await filterProduct({
        search_text: tag?.tag ?? "",
        sortBy: sortKeys?.value ?? "new",
        page,
        limit: 33,
        productFilters: selectedFilter,
        // findBy: {
        //   name: "prices",
        //   lwrlmt: filter?.lwrlmt ?? 0,
        //   uprlmt: filter?.uprlmt ?? 10000,
        // },
      }).unwrap();

      if (response.length > 0) {
        setSearchData((prevData) => response);
      } else {
        setSearchData([]);
        setHasMore(false); // No more data
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilter = async () => {
    try {
      const response = await filterDetails({
        search_text: tag?.tag ?? "",
      }).unwrap();
      const filters = filterNonEmptyValues(response?.productFilters);
      dispatch(setAdvFilter(filters));
    } catch (error) {
      dispatch(setAdvFilter({}));
      console.error(error);
    }
  };

  const sortClick = (data) => {
    setSortKeys(data);
  };

  useEffect(() => {
    // Initial data load
    setSearchData([]);
    fetchData(page);
  }, [
    page,
    tag?.tag,
    sortKeys,
    filter?.uprlmt,
    filter?.lwrlmt,
    selectedFilter,
  ]);

  useEffect(() => {
    fetchFilter();
  }, [tag]);

  // Callback to load more products when 70% is scrolled
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment the page
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    document.body.classList.add("bg-[#f2f2f2]");
    return () => {
      document.body.classList.remove("bg-[#f2f2f2]");
    };
  });

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
      <NavBar />
      <div className="flex h-screen max-w-[1600px] md:mx-auto md:gap-4 bg-gray-100 mt-4 md:px-4 md:pl-4">
        <div className="hidden md:block w-3/12 bg-gray-100 h-fit rounded-lg overflow-hidden mt-4 sticky top-4">
          <Sidebar
            mode="filter"
            textTop={"Filter"}
            isOpen={true}
            filterItems={advFilter}
            handleLimit={handleLimit}
          />
        </div>

        {/* Product Listing */}
        <div className="w-full overflow-y-scroll h-full hide-scrollbar">
          <ProductListing
            {...birthdayGiftsData}
            title={tag?.tag}
            sortClick={sortClick}
            products={searchData}
            onScrollEnd={handleLoadMore}
            sortKeys={sortKeys}
          />
        </div>
        <MobileFilterSort filters={advFilter} tag={tag?.tag}  handleSortChange={handleSortChange} />
      </div>
      {(isLoading || filterLoading) && (
        <Modal>
          <Loader />
        </Modal>
      )}
      <Footer />
    </>
  );
};

export default ProductSearch;
