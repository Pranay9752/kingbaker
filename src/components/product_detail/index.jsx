import React, { useEffect, useState } from "react";
import MobileHeader from "../../molecules/header/MobileHeader";
import ImageCarousel from "../../molecules/carousal/imagecarousel";
import ProductDetails from "./productDetails";
import ActionButtons from "../../molecules/ActionButtons";
import ImageModal from "./modals/imageModal";
import ReviewCarousel from "../../molecules/carousal/ReviewCarousal";
import ProductCarousel from "../../molecules/carousal/ProductCarousal";
import EventBar from "../../molecules/header/EventBar";
import TopNavbar from "../../molecules/header/MainNavbar";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/apiSlices/ecom/products";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// Main Component
const ProductDetail = () => {
  const { productId } = useParams();
  const methods = useForm({});

  const { data, isError, isLoading } = useGetProductQuery(
    {
      productId: productId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = [
    "https://picsum.photos/64/?blur=10",
    "https://picsum.photos/64/?blur=10",
    "https://picsum.photos/64/?blur=10",
    "https://picsum.photos/64/?blur=10",
    // "https://www.fnp.com/images/pr/x/v20221221172008/decorated-chocolate-truffle-cake-half-kg-eggless_1.jpg",
    // "https://www.fnp.com/images/pr/x/v20221221172008/decorated-chocolate-truffle-cake-half-kg-eggless_2.jpg",
    // "https://www.fnp.com/images/pr/x/v20221221172008/decorated-chocolate-truffle-cake-half-kg-eggless_3.jpg",
    // "https://www.fnp.com/images/pr/x/v20221221172008/decorated-chocolate-truffle-cake-half-kg-eggless_4.jpg",
  ];

  const products = [];

  const onSubmit = (data) => {
    console.log("data: ", data);
    alert("data: ", JSON.stringify(data));
  };
  console.log("values", methods.getValues());
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="md:hidden relative h-screen px-52 bg-gray-100">
            <MobileHeader />
            <ImageCarousel
              images={data?.data?.imageLink ?? []}
              onImageClick={() => setIsModalOpen(true)}
            />
            <ProductDetails
              key={"mobileProductDetails"}
              data={data?.data ?? {}}
              title="Decorated Chocolate Truffle Cake Half Kg Egg..."
              rating={5}
              reviews={1256}
              price={575}
              taxInfo="Inclusive of all taxes"
              timeLeft="01:25:30"
            />

            <ActionButtons />

            <ImageModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              imageSrc={data?.data?.imageLink?.[0] ?? images[0]}
            />
          </div>
          <div className="hidden md:flex flex-col justify-start items-center py-10">
            <div className=" flex gap-5 w-full ">
              <div className=" sticky top-4 self-start">
                <ImageCarousel
                  autoSlide={false}
                  images={data?.data?.imageLink ?? []}
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
                  price={575}
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
              <ProductCarousel
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
              />
            </div>
          </div>
        </form>
      </FormProvider>
      <DevTool control={methods.control} /> {/* set up the dev tool */}
    </>
  );
};

export default ProductDetail;
