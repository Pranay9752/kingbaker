import React, { useEffect, useMemo, useState } from "react";
import MobileHeader from "../../molecules/header/MobileHeader";
import ImageCarousel from "../../molecules/carousal/imagecarousel";
import ProductDetails from "./productDetails";
import ActionButtons from "../../molecules/ActionButtons";
import ImageModal from "./modals/imageModal";
import ReviewCarousel from "../../molecules/carousal/ReviewCarousal";
import ProductCarousel from "../../molecules/carousal/ProductCarousal";
import EventBar from "../../molecules/header/EventBar";
// import TopNavbar from "../../molecules/header/MainNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/apiSlices/ecom/productsApiSlice";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import TopNavbar from "../../molecules/header/TopNavBar";
import Footer from "../../molecules/footer/footer";
import Breadcrumb from "../../atom/breadcrumb";
import Loader from "../../atom/loader/loader";

// Main Component
const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      productId: productId,
    },
  });
  const [typeImages, setTypeImages] = useState(null);

  const { data, isError, isLoading } = useGetProductQuery(
    {
      productId: productId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const items = useMemo(
    () => [
      {
        label: "Home",
        icon: "M19.707 9.293l-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z",
        onClick: () => navigate("/"),
      },
      {
        label: "Projects",
        onClick: null,
      },
    ],
    [data]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = [
    "https://picsum.photos/64/?blur=10",
    "https://picsum.photos/64/?blur=10",
    "https://picsum.photos/64/?blur=10",
    "https://picsum.photos/64/?blur=10",
  ];

  const products = [
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    // Add more products as needed
  ];

  const onSubmit = (data) => {
    console.log("dat5555555555 a: ", data?.specification?.value?.images);
    setTypeImages(data?.specification?.value?.images);
  };

  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  });

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 w-[100vw] h-[100vh] flex justify-center items-center bg-black/20">
          <Loader />
        </div>
      )}
      <FormProvider {...methods}>
        <TopNavbar
          className={`fixed top-0 z-50 w-full md:hidden`}
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
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="md:hidden relative h-screen px -52 bg-gray-100">
            <ImageCarousel
              title={data?.data?.title || ""}
              images={typeImages || data?.data?.imageLink || []}
              onImageClick={() => setIsModalOpen(true)}
            />
            <ProductDetails
              key={"mobileProductDetails"}
              data={data?.data ?? {}}
              title="Decorated Chocolate Truffle Cake Half Kg Egg..."
              rating={1}
              reviews={1256}
              price={methods.watch("specification")?.value?.price}
              taxInfo="Inclusive of all taxes"
              timeLeft="01:25:30"
            />

            <ActionButtons
              product={data?.data ?? {}}
              productId={data?.data?._id ?? ""}
            />

            <ImageModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              imageSrc={data?.data?.imageLink?.[0] ?? images[0]}
            />
          </div>
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
            className={"md:block hidden"}
          />
          <div className="hidden md:flex flex-col justify-start items-center py-10  mx-auto max-w-[1600px]">
            <div className=" flex gap-5 w-full ">
              <div className=" sticky top-4 self-start">
                <ImageCarousel
                  title={data?.data?.title || ""}
                  autoSlide={false}
                  images={typeImages || data?.data?.imageLink || []}
                  onImageClick={() => setIsModalOpen(true)}
                />
              </div>
              <div className=" w-full">
                <ProductDetails
                  key={"desktopProductDetails"}
                  data={data?.data ?? {}}
                  title="Decorated Chocolate Truffle Cake Half Kg Egg..."
                  rating={5}
                  reviews={1256}
                  price={methods.watch("specification")?.value?.price}
                  taxInfo="Inclusive of all taxes"
                  timeLeft="01:25:30"
                />
              </div>
            </div>
            <ReviewCarousel
              reviews={data?.data?.reviews ?? []}
              title={"What customers are saying"}
            />
            <div className="w-full">
              {/* <ProductCarousel
                title="Recently viewed by you"
                products={products}
                className="my-custom-class"
                cardClassName="my-card-class"
              />
              <ProductCarousel
                title="You may also like"
                products={products}
                className="my-custom-class"
                cardClassName="my-card-class"
              />
              <ProductCarousel
                title="What others are viewing"
                products={products}
                className="my-custom-class"
                cardClassName="my-card-class"
              /> */}
            </div>
          </div>
        </form>
      </FormProvider>
      {/* <DevTool control={methods.control} /> set up the dev tool */}
      <Footer />
    </>
  );
};

export default ProductDetail;
