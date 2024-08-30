import { useEffect, useState } from "react";

const ImageCarousel = ({ images, onImageClick }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="fixed top-14 left-0 right-0 h-1/2">
            <img
                src={images[currentImageIndex]}
                alt="Product"
                className="h-[50vh] object-cover aspect-video"
                onClick={onImageClick}
            />
        </div>
    );
};

export default ImageCarousel;