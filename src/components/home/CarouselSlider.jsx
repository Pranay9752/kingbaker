
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = ({ slides, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0].offsetWidth;
      container.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0].offsetWidth;
      container.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying]);

  const handleManualNavigation = (action) => {
    setIsAutoPlaying(false);
    action();
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div 
      style={data?.boxStyle} 
      className="relative w-full mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-x-auto hide-scrollbar">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 p-4 transition-all duration-500 ease-out"
        >
          {slides.map((slide, index) => (
            <div
              onClick={() => navigate(`/search/${slide.route}`)}
              key={index}
              className="flex-none w-64 cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-48 object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleManualNavigation(prevSlide)}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow hover:bg-white transition-colors z-10"
        aria-label="Previous slide"
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
        onClick={() => handleManualNavigation(nextSlide)}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow hover:bg-white transition-colors z-10"
        aria-label="Next slide"
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
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            } hover:bg-white/90`}
            onClick={() => {
              handleManualNavigation(() => setCurrentIndex(index));
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Add this CSS to your global styles or component styles
// const styles = `
// .hide-scrollbar {
//   -ms-overflow-style: none;  /* IE and Edge */
//   scrollbar-width: none;  /* Firefox */
// }

// .hide-scrollbar::-webkit-scrollbar {
//   display: none;  /* Chrome, Safari and Opera */
// }
// `;

export default Carousel;
// /* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Carousel = ({ slides, data }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();
//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === slides.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? slides.length - 1 : prevIndex - 1
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={data?.boxStyle} className="relative w-full overflow-x-auto mx -auto">
//       <div className="overflow-hidden rounded-lg shadow-lg ">
//         <div
//           className="flex transition-transform duration-500 ease-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {slides.map((slide, index) => (
//             <div
//               onClick={() => navigate(`/search/${slide.route}`)}
//               key={index}
//               className="w-full flex-shrink-0"
//             >
//               <img
//                 src={slide.image}
//                 alt="Placeholder 1"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={prevSlide}
//         className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow hover:bg-white"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           className="size-6"
//         >
//           <path
//             fillRule="evenodd"
//             d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow hover:bg-white"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           className="size-6"
//         >
//           <path
//             fillRule="evenodd"
//             d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>

//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               index === currentIndex ? "bg-white" : "bg-white/50"
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;
