import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { method } from "lodash";
import SEO from "../../atom/seo/SEO";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  category: yup.string().required("Please select a category"),
  city: yup.string().required("City is required"),
  comments: yup.string(),
});

const CATEGORIES = [
  {
    name: "Flowers",
    img: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "/search/flowers",
  },
  {
    name: "Cakes",
    img: "https://ocakes.in/storage/app/public/images/item/item-642d56c05ab3b.jpg",
    link: "/search/cakes",
  },
  {
    name: "Plants",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTBaqYd7xad7Qlj4EJPl6VS4VlzcNxILdU_l9o3K3dQj9WoX4Ns8mH_QA9KFsm6LcKY-J2Qs6NATNYAWWhozqMEcUdV8S5-dxjaDmyvoaM",
    link: "/search/plants",
  },
  {
    name: "Chocolates",
    img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ8UV_P-ARbKJrhPFITrzduqEutVvRib3LfxSJWIeXvfN_ITKCNK59mL5FyKrOnG48FiFGJ3gru6pp1R7bSfLDQ4XJtMMFCQwalNz_AFA",
    link: "/search/chocolates",
  },
  {
    name: "Decorations",
    img: "https://m.media-amazon.com/images/I/713bvfjRYtL._AC_UF1000,1000_QL80_.jpg",
    link: "/search/decorations",
  },
  {
    name: "Sweets",
    img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRTxeKuy1Mjc6JJ_Rf0-d8-8HQ3-yuDwZpUAgzP9tV_5ojXTI3OS7JzpaA2pz3dONcGD4ACN_tSSUXFFZAp7tLsbjuQGlGd_o5bLqcDcA",
    link: "/search/sweets",
  },
  {
    name: "Soft Toys",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR8KwVdzXbOaztUCXBkmlXTuEQoXY21JfwEj5j7FIxCI_AIKXWmvtNyhn2lQNWtecGET1BFE64wJtvpwdwTXamx1dCCShpQnS31rGrVXmdTpkBEP4ajGKXVZw",
    link: "/search/soft-toys",
  },
  {
    name: "Greeting Cards",
    img: "https://thecraftgallery.in/cdn/shop/products/a0b3e67b-bc73-48c2-b9c3-43e020575a11.jpg?v=1683719175",
    link: "/search/greeting-cards",
  },
];

const BecomeAPartner = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    reset();
    alert("Form submitted successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
       <SEO title={'Become a partner'} />
      {/* Header */}
      <header className="bg-[#7d8035] text-white p-4 text-center shadow-md flex justify-center items-center">
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

        <div className="mx-auto">
          <h1 className="text-3xl font-bold">Jojo Carts Partners</h1>
          <p className="text-sm mt-1">Join Us to Expand Your Business!</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-12 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Become an Jojo Carts Partner Today!
        </h2>
        <p className="text-lg text-gray-600">
          Partner with Jojo Carts to grow your business with our extensive
          brand network and timely support.
        </p>
        <div className="grid grid-cols-2 md:flex flex-wrap justify-center gap-8 mt-8 max-w-4xl mx-auto">
          {[
            {
              img: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-green-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              ),
              text: "Use of Brand Name",
            },
            {
              img: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              ),
              text: "Website Support",
            },
            {
              img: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 21v-2a4 4 0 00-3-3.87M4 21v-2a4 4 0 013-3.87m10-6a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ),
              text: "Dedicated Support Team",
            },
            {
              img: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 17a1 1 0 100 2 1 1 0 000-2zm-7 0a1 1 0 100 2 1 1 0 000-2zm12-10H4a1 1 0 000 2h12a1 1 0 000-2zm2 5H2a1 1 0 000 2h16a1 1 0 100-2zm1-9H3a1 1 0 000 2h17a1 1 0 000-2z" />
                </svg>
              ),
              text: "Timely Payments",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 text-center flex flex-col justify-center items-center gap-3 "
            >
              {benefit.img}
              <p className="text-gray-700 font-medium">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-lg mx-auto shadow-lg rounded-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Get in Touch with Us
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Fill out the form below to join the Jojo Carts partner program.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("name")}
                type="text"
                placeholder="Contact Name"
                className={`w-full p-3 rounded border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("mobile")}
                type="tel"
                placeholder="Mobile Number"
                className={`w-full p-3 rounded border ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email ID"
                className={`w-full p-3 rounded border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <select
                {...register("category")}
                className={`w-full p-3 rounded border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                <option value="" disabled selected>
                  Category Enquiry
                </option>
                <option value="flowers">Flowers</option>
                <option value="cakes">Cakes</option>
                <option value="decorations">Decorations</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("city")}
                type="text"
                placeholder="Enter City"
                className={`w-full p-3 rounded border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <textarea
                {...register("comments")}
                placeholder="Comments"
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Product Categories */}
      <section className="bg-gray-100 py-10 px-4">
        <h3 className="text-2xl font-bold text-center mb-6">
          Product Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, index) => (
            <div
              key={index}
              className="bg-white shadow rounded overflow-hidden text-center"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-32 object-cover"
              />
              <p className="p-4 font-medium">{category.name}</p>
              <a
                href={category.link}
                className="text-blue-500 hover:underline text-sm"
              >
                Explore {category.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2024 Jojo Carts. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BecomeAPartner;
