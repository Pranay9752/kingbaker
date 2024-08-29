import { useState } from "react";

const ImageModal = ({ isOpen, onClose, imageSrc }) => {
    const [zoom, setZoom] = useState(1);

    const handleDoubleClick = () => setZoom(zoom === 1 ? 2 : 1);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-full h-full">
                <img
                    src={imageSrc}
                    alt="Product Zoomed"
                    className="w-full h-full object-contain transition-transform duration-200 ease-in-out"
                    style={{ transform: `scale(${zoom})` }}
                    onDoubleClick={handleDoubleClick}
                />
                <button
                    className="absolute top-4 right-4 text-white text-2xl"
                    onClick={onClose}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default ImageModal;