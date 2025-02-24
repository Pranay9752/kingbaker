import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-8 mt-2">
      <div className="container mx-auto px-4">
        {/* Features Section */}
        <div className="flex flex-wrap justify-between mb-8">
          <div className="w-full sm:w-1/2 md:w-1/4 text-center mb-4">
            {/* <svg className="w-8 h-8 mx-auto mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 mx-auto mb-2 text-blue-500"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
            </svg>
            <h3 className="font-semibold mb-1">Nationwide Delivery</h3>
            <p className="text-sm">We deliver gifts to over 70 countries</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 text-center mb-4">
            <svg
              className="w-8 h-8 mx-auto mb-2 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <h3 className="font-semibold mb-1">100% Safe & Secure Payments</h3>
            <p className="text-sm">Pay using secure payment methods</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 text-center mb-4">
            <svg
              className="w-8 h-8 mx-auto mb-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <h3 className="font-semibold mb-1">Dedicated Help Center</h3>
            <p className="text-sm">
              <Link
                to={"mailto:support@kingbakers.in"}
                className="text-blue-500 hover:underline"
              >
                Chat with us
              </Link>
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 text-center mb-4">
            <div className="flex justify-center mb-2">
              <svg
                className="w-8 h-8 text-green-500 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.532.532 0 0 0-.79.15l-1.88 3.24a11.647 11.647 0 0 0-8.86 0L5.65 5.6a.532.532 0 0 0-.79-.15c-.3.16-.42.54-.26.85l1.84 3.18A11.712 11.712 0 0 0 1 20h22a11.712 11.712 0 0 0-5.4-10.52z" />
              </svg>
              <svg
                className="w-8 h-8 text-gray-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Shop on the go</h3>
            <p className="text-sm">Download mobile app</p>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap mb-8">
          <div className="w-full sm:w-1/2 md:w-1/5 mb-4">
            <h4 className="font-bold mb-2">POLICY INFO</h4>
            <ul className="text-sm">
              <li>
                <a href="#" className="hover:text-gray-800">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5 mb-4">
            <h4 className="font-bold mb-2">ABOUT COMPANY</h4>
            <ul className="text-sm">
              <li>
                <a href="#" className="hover:text-gray-800">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">
                  News Room
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="w-full sm:w-1/2 md:w-1/5 mb-4">
                        <h4 className="font-bold mb-2">BUSINESS</h4>
                        <ul className="text-sm">
                            <li><a href="#" className="hover:text-gray-800">Decoration Services</a></li>
                            <li><a href="#" className="hover:text-gray-800">Corporate Service</a></li>
                            <li><a href="#" className="hover:text-gray-800">Affiliate Program</a></li>
                            <li><a href="#" className="hover:text-gray-800">Retails Stores</a></li>
                            <li><a href="#" className="hover:text-gray-800">Franchise</a></li>
                        </ul>
                    </div> */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-4">
            <h4 className="font-bold mb-2">NEED HELP ?</h4>
            <ul className="text-sm">
              <li>
                <Link to={"/contact-us"} className="hover:text-gray-800">
                  Contact Us
                </Link>
              </li>
              {/* <li><a href="#" className="hover:text-gray-800">FAQs</a></li> */}
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/5 mb-4">
            <h4 className="font-bold mb-2">USEFUL LINKS</h4>
            <ul className="text-sm">
              <li>
                <a href="#" className="hover:text-gray-800">
                  Quotes N Wishes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">
                  Flower Astrology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">
                  Article Hub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">
                  Care Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="mb-8">
          <h4 className="font-bold mb-2">SUBSCRIBE</h4>
          <div className="flex w-1/4">
            <input
              type="email"
              placeholder="Email"
              className="flex-grow border border-gray-300 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
              SUBMIT
            </button>
          </div>
          <p className="text-sm mt-2">
            Get updates on promotions and offers coupons.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between pt-8 border-t border-gray-200">
          <p className="text-sm">
            &copy; 1994-2024 kingbaker.com. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              to={"https://www.linkedin.com/in/udit-kinger-263a31229"}
              className="text-blue-600 hover:text-blue-800"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link
              to={"https://twitter.com/@fnpking"}
              className="text-blue-400 hover:text-blue-600"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </Link>
            <Link
              to={"https://pin.it/P93vHmD"}
              className="text-red-600 hover:text-red-800"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </Link>
            <Link
              to={"http://www.instagram.com/kingbakers_mzn"}
              className="text-pink-600 hover:text-pink-800"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
