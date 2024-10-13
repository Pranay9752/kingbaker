import { useEffect, useRef, useState } from "react";

const ImageMagnifier = ({ imageSrc, altText }) => {
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top } = imageRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      setMagnifierPosition({ x, y });
    }
  };

  const handleMouseEnter = () => setShowMagnifier(true);
  const handleMouseLeave = () => setShowMagnifier(false);

  return (
    <div className="relative h-[428px] w-[428px]">
      <img
        ref={imageRef}
        src={imageSrc}
        alt={altText}
        onError={(e) => {
                  e.target.src = 'https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg';
                }}
        className="h-full w-full object-cover"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {showMagnifier && (
        <>
          <div
            className="absolute border-2 border-white/80 bg-white/30 pointer-events-none"
            style={{
              left: magnifierPosition.x - 38,
              top: magnifierPosition.y - 38,
              width: "76px",
              height: "76px",
              zIndex:9999
            }}
          />
          <div className="absolute left-full  top-0 border border-gray-300">
            <div
              className="w-[500px] h-[500px] overflow-hidden"
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundPosition: `-${magnifierPosition.x * 10 - 50}px -${
                  magnifierPosition.y * 10 - 50
                }px`,
                backgroundSize: `${imageRef.current?.width * 10}px ${
                  imageRef.current?.height * 10
                }px`,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

const ImageCarousel = ({
  images,
  onImageClick,
  autoSlide = true,
  slideInterval = 3000,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const scrollImages = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 70; // Height of one image button

    if (container) {
      if (direction === "up") {
        container.scrollTop -= scrollAmount;
      } else {
        container.scrollTop += scrollAmount;
      }
    }
  };
  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, slideInterval, images.length]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div
        id="default-carousel"
        className="md:hidden fixed top-14 left-0 right-0 h-1/2"
        data-carousel="slide"
      >
        {/* Carousel wrapper */}
        <div className="relative h-[50vh] overflow-hidden rounded-lg ">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${
                index === currentImageIndex ? "block" : "hidden"
              } duration-700 h-[50vh] ease-in-out`}
              data-carousel-item
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className=" h-[50vh] object-cover aspect-video"
                onClick={() => onImageClick(index)}
                onError={(e) => {
                  e.target.src = 'https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg';
                }}
              />
            </div>
          ))}
        </div>
        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-6 left-1/2 space-x-1 rtl:space-x-reverse bg-black/20 px-2 py-1 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-2 h-2 rounded-full ${
                currentImageIndex === index ? "bg-white" : "bg-gray-400"
              }`}
              aria-current={currentImageIndex === index}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => setCurrentImageIndex(index)}
            ></button>
          ))}
        </div>
      </div>
      <div className="hidden md:flex md:sticky w-fit gap-4  h-[428px]">
        <div className="flex flex-col justify-start items-start gap-1 w-fit">
          <button
            type="button"
            className="w-full bg-gray-700"
            onClick={() => scrollImages("up")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 mx-auto"
            >
              <path
                fillRule="evenodd"
                d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            ref={scrollContainerRef}
            className="h-[388px] overflow-y-auto hide-scrollbar"
          >
            <div className="flex flex-col gap-1 ">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={` h-16 w-16 border-2 overflow-hidden bg-red-500 ${
                    currentImageIndex === index
                      ? "grayscale  border-[#797e42]"
                      : "border-white transparent"
                  }`}
                  aria-current={currentImageIndex === index}
                  aria-label={`Slide ${index + 1}`}
                  data-carousel-slide-to={index}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className=" h-16 object-cover aspect-square"
                    onClick={() => onImageClick(index)}
                    onError={(e) => {
                  e.target.src = 'https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg';
                }}
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="w-full bg-gray-700"
            onClick={() => scrollImages("down")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 mx-auto"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <ImageMagnifier
          onClick={() => onImageClick(index)}
          imageSrc={images[currentImageIndex]}
          altText={`Selected Image`}
        />
      </div>
    </>
  );
};

export default ImageCarousel;

{
  /* Slider controls */
}
{
  /* <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={handlePrevClick}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full  group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={handleNextClick}
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button> */
}
