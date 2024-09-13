import React, { useEffect } from "react";

const Modal = ({ children, onClose, className = "" }) => {
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'clip';
    document.body.classList.add("hide-scrollbar");
    // Enable scrolling on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove("hide-scrollbar");
    };
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed h-screen hide-scrollbar flex justify-center  items-center top-0 left-0 right-0 z-[9998]  bg-black/25 w-full  overflow-x-hidden overflow-y-auto md:inset-0 max-h-full modal-overlay ${className} `}
    >
      {children}
    </div>
  );
};

export default Modal;
