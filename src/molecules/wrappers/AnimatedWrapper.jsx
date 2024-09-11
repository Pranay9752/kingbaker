import React from "react";
import { motion } from "framer-motion";

const AnimatedWrapper = ({
  children,
  direction,
  closeModal,
  isbottom = false,
}) => {
  const animationVariants = {
    up: {
      initial: { opacity: 0, y: "100%", scale: isbottom ? 1 : 0.5 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: "100%", scale: isbottom ? 1 : 0.5 },
      transition: { duration: 0.3 },
    },
    left: {
      initial: { opacity: 0, x: "100%", scale: 0.5 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: "100%", scale: 0.5 },
      transition: { duration: 0.3 },
    },
  };
  const variants = animationVariants[direction];

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={variants.transition}
    >
      {/* {children} */}
      {React.cloneElement(children, { closeModal })}
    </motion.div>
  );
};

export default AnimatedWrapper;
