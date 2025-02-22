import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Carousel = ({ slides, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const navigate = useNavigate();
  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === slides.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? slides.length - 1 : prevIndex - 1
  //   );
  // };

  const nextSlide = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  const prevSlide = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };


  // useEffect(() => {
  //   const interval = setInterval(nextSlide, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div
      style={data?.boxStyle}
      className="relative w-full overflow-x-auto mx -auto"
    >
      {/* <div className="overflow-hidden rounded-lg shadow-lg ">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              onClick={() => navigate(`/search/${slide.route}`)}
              key={index}
              className="w-full  h-[22svh] md:h-fit   flex-shrink-0"
            >
              <img
                src={slide.image}
                alt="Placeholder 1"
                className="w-full h-full object-fill"
              />
            </div>
          ))}
        </div>
      </div> */}
      <Swiper
        ref={swiperRef}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ el: ".swiper-pagination", type: "progressbar" }}
        modules={[Pagination, Autoplay]}
        className="swiper-container -z-0"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            onClick={() => navigate(`/search/${slide.route}`)}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[22svh] md:h-fit object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow hover:bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow hover:bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
