import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AnimatedWrapper from "./AnimatedWrapper";
import Modal from "../../atom/popovers/modal";
import { twMerge } from "tailwind-merge";

const ModalWrapper = ({
  isOpen,
  onClose = () => {},
  children,
  className,
  maxHeight,
  key,
  isModal = true,
}) => {
  const screenWidth = useMemo(() => window.innerWidth, [window.innerWidth]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {screenWidth > 768 && isModal ? (
            <Modal onClose={onClose} key={key}>
              <AnimatedWrapper direction={"up"} key={key}>
                <div
                  className={twMerge(
                    "bg-white shadow rounded-lg p-6",
                    className
                  )}
                >
                  {children}
                </div>
              </AnimatedWrapper>
            </Modal>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={onClose}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 40, stiffness: 300 }}
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 p-4 ${className}`}
                style={{ maxHeight: maxHeight ?? "99vh", overflowY: "auto" }}
              >
                {children}
              </motion.div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;
