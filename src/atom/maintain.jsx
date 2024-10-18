// src/components/MaintenancePage.js
import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logoking.png";
const MaintenancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="mb-8"
      >
        <img
          src={logo} // Add your logo file here
          alt="Brand Logo"
          className=" h-52"
        />
      </motion.div>

      {/* Maintenance Message Section */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        className="text-4xl font-bold text-gray-800"
      >
        We’ll Be Back Soon!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
        className="text-lg text-gray-600 mt-4"
      >
        .
      </motion.p>

      {/* Animated Loading/Spinner */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="mt-10"
      >
        <svg
          className="animate-spin h-8 w-8 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l-1.412 1.412A9.953 9.953 0 0112 22v-4a6 6 0 00-6-6z"
          ></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default MaintenancePage;
