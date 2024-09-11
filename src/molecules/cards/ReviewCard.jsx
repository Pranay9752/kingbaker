import React from "react";

const ReviewCard = ({ key, review, className }) => (
  <div
    className={`bg-white rounded-lg shadow-md border px-4 py-2  mx-2 text-left ${className}`}
  >
    <div className="flex items-center mb-2 w-[250px]">
      <div className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-2">
        {review?.initial ?? "U"}
      </div>
      <div>
        <p className="font-semibold">{review?.name ?? `User`}</p>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`size-5 ${
                i < review.rating ? "text-[#ffd01b]" : "text-gray-300"
              }`}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          ))}
          <span className="ml-1 text-sm text-gray-600">{review.rating ?? 0}</span>
        </div>
      </div>
    </div>
    <p className="text-gray-700 mb-2 text-sm line-clamp-3">{review.reviews}</p>
    <p className="text-sm text-gray-500">{review.date}</p>
    <p className="text-sm text-gray-500">Delivered At: {review.deliveredAt}</p>
    <p className="text-sm text-gray-500">Occasion: {review.occasion}</p>
  </div>
);

export default ReviewCard;
