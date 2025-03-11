// const scrollToDiv = (id) => {
//   const element = document.getElementById(id);
//   console.log('element: ', element);
//     if (!element) return;

//     const elementPosition = element.offsetTop - 100;
//     const startPosition = window.pageYOffset;
//     const distance = elementPosition - startPosition;
//     const duration = 1000;
//     let start = null;

//     const animation = (currentTime) => {
//         if (!start) start = currentTime;
//         const progress = currentTime - start;
//         const easeInOutCubic = (t) => t < 0.5 
//             ? 4 * t * t * t 
//             : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            
//         const run = easeInOutCubic(progress / duration);
//         window.scrollTo(0, startPosition + distance * run);

//         if (progress < duration) {
//             requestAnimationFrame(animation);
//         }
//     };

//     requestAnimationFrame(animation);
// };
// export default scrollToDiv

import { scroller } from 'react-scroll';

const scrollToDiv = (id) => {
  console.log('scrolling to: ', id);
  
  scroller.scrollTo(id, {
    duration: 1000,
    delay: 0,
    smooth: true,
    // offset: -100, // Same offset as your original function
    // You can also customize the easing function to match your easeInOutCubic
    easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  });
};

export default scrollToDiv;