import React, { useState } from "react";
import MobileHeader from "../../molecules/header/MobileHeader";
import ImageCarousel from "../../molecules/carousal/imagecarousel";
import ProductDetails from "./productDetails";
import ActionButtons from "../../molecules/ActionButtons";
import ImageModal from "./modals/imageModal";

// Main Component
const ProductDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = [
    "https://www.fnp.com/images/pr/x/v20221221172008/decorated-chocolate-truffle-cake-half-kg-eggless_1.jpg",
    "https://www.fnp.com/images/pr/x/v20221221172008/decorated-chocolate-truffle-cake-half-kg-eggless_2.jpg",
    "https://www.fnp.com/images/pr/x/v20221221172008/decorated-chocolate-truffle-cake-half-kg-eggless_3.jpg",
    "https://www.fnp.com/images/pr/x/v20221221172008/decorated-chocolate-truffle-cake-half-kg-eggless_4.jpg",
  ];

  return (
    <>
      <div className="md:hidden relative h-screen px-52 bg-gray-100">
        <MobileHeader />
        <ImageCarousel
          images={images}
          onImageClick={() => setIsModalOpen(true)}
        />
        <ProductDetails
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
          imageSrc={images[0]}
        />
      </div>
      <div className="hidden md:flex flex-col justify-start items-center py-10">
        <div className="grid grid-cols-2 gap-5 w-full bg-pink-200">
          <ImageCarousel
            autoSlide={false}
            images={images}
            onImageClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
