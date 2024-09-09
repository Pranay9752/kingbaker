import { useEffect, useRef, useState } from "react";

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
    const scrollAmount = 64; // Height of one image button

    if (container) {
      if (direction === 'up') {
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
      <div className="hidden md:flex w-full gap-4  h-[428px]">
        <div className="flex flex-col justify-start items-start gap-1 w-fit">
          <button type="button" className="w-full bg-gray-700">
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
          <div className="h-[388px] flex flex-col overflow-auto">
            {[
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
              ...images,
            ].map((image, index) => (
              <div
                key={index}
                type="button"
                className={` h-16 w-16 border-2 overflow-hidden ${
                  currentImageIndex === index
                    ? "grayscale  border-[#797e42]"
                    : "border-transparent"
                }`}
                aria-current={currentImageIndex === index}
                aria-label={`Slide ${index + 1}`}
                data-carousel-slide-to={index}
                onClick={() => setCurrentImageIndex(index % 3)}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className=" h-16 object-cover aspect-square"
                  onClick={() => onImageClick(index)}
                />
              </div>
            ))}
          </div>
          <button type="button" className="w-full bg-gray-700">
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
        <div>
          <img
            src={images[currentImageIndex]}
            alt={`Selected Image`}
            className=" h-full object-cover aspect-square"
            onClick={() => onImageClick(index)}
          />
        </div>
      </div>
      <div className="hidden md:flex w-full gap-4 h-[428px]">
      <div className="flex flex-col justify-start items-start gap-1 w-fit">
        <button
          type="button"
          className="w-full bg-gray-700 p-2"
          onClick={() => scrollImages('up')}
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
          className="h-[388px] flex flex-col overflow-y-scroll"
        >
          {[...images,...images,...images].map((image, index) => (
            <button
              key={index}
              type="button"
              className={`h-16 w-16 border-2 overflow-hidden ${
                currentImageIndex === index
                  ? "grayscale border-[#797e42]"
                  : "border-transparent"
              }`}
              aria-current={currentImageIndex === index}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => onImageClick(index)}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="h-16 object-cover aspect-square"
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="w-full bg-gray-700 p-2"
          onClick={() => scrollImages('down')}
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
      <div>
        <img
          src={images[currentImageIndex]}
          alt={`Selected Image`}
          className="h-full object-cover aspect-square"
        />
      </div>
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
