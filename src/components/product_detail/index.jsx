import React, { useState } from 'react';
import MobileHeader from '../../molecules/header/MobileHeader';
import ImageCarousel from '../../molecules/carousal/imagecarousel';
import ProductDetails from './productDetails';
import ActionButtons from '../../molecules/ActionButtons';
import ImageModal from './modals/imageModal';
import { product_detail } from './dummyData';





// Main Component
const ProductDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div className="relative h-screen px-52 bg-gray-100">
            <MobileHeader />
            <ImageCarousel images={product_detail.images} onImageClick={() => setIsModalOpen(true)} />
            <ProductDetails
                title={product_detail?.title ?? 0}
                rating={product_detail?.rating ?? 0}
                reviews={product_detail?.reviews.length ?? 0}
                price={product_detail?.price ?? 0}
                data={product_detail}
                taxInfo="Inclusive of all taxes"
                timeLeft="01:25:30"
            />

            <ActionButtons />

            <ImageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageSrc={product_detail.images[0]}
            />
        </div>
    );
};

export default ProductDetail;