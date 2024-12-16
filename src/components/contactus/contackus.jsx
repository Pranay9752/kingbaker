// src/App.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <div className="bg-[#7d8035] w-full py-3 px-5 text-white flex justify-start items-center">
      <svg
          onClick={() => navigate(-1)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        <div className="text-lg font-bold">King Baker</div>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl bg-white mt-10 p-5 rounded-lg shadow-lg">
        {/* Header */}
        <motion.div
          className="text-xl font-semibold mb-6 border-b pb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Details
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Section */}
          <div>
            <div className="space-y-3">
              
              {/* <motion.button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded w-full md:w-auto hover:bg-gray-400"
                whileHover={{ scale: 1.05 }}
              >
                FAQs
              </motion.button> */}
            </div>

            <div className="mt-6 space-y-4">
              <div className="text-lg">
                <span className="font-medium">Phone:</span> +91 7217250250
              </div>
              <div className="text-lg">
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:support@kingbakers.com" className="text-blue-600">
                  support@kingbakers.com
                </a>
              </div>
              
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <span className="font-bold text-red-600">
                  Visit Us:
                </span>
                <p className="text-sm">
                1st Floor Hotel King City Novelty Chock Roorkee Road, Muzaffarnagar, Uttar Pradesh, 251001
                </p>
              </div>
             
            </div>
            <motion.button
                onClick={() => navigate("/")}
                className="bg-orange-500 text-white px-4 py-2 rounded w-full md:w-auto hover:bg-orange-700 mt-10"
                whileHover={{ scale: 1.05 }}
              >
                Continue Shopping
              </motion.button>
          </div>

          {/* Right Section */}
          {/* <div className="flex flex-col items-center justify-center space-y-4">
            <motion.button
              className="bg-yellow-500 text-white px-6 py-3 rounded w-full hover:bg-yellow-600"
              whileHover={{ scale: 1.05 }}
            >
              Order Related Issue?
            </motion.button>
            <motion.button
              className="bg-blue-500 text-white px-6 py-3 rounded w-full hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
            >
              General Query
            </motion.button>
          </div> */}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 bg-gray-200 w-full py-4">
        <div className="text-center">100% Safe and Secure Payments</div>
        <div className="text-center mt-2">
          Follow us on
          <div className="flex justify-center space-x-3 mt-2">
            <a href="#" className="text-blue-600">
              Facebook
            </a>
            <a href="#" className="text-pink-600">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
