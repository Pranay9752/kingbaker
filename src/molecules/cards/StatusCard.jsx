import { useNavigate } from "react-router-dom";
import { encryptData } from "../../atom/utils/encryption";
const SVGIcon = () => {
  return (
    <svg
      fill="#16a34a"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 588.601 588.6"
      xmlSpace="preserve"
      className="h-3 w-3 md:h-6 md:w-6 text-green-600"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path d="M359.031,537.786c0.781,0.053,1.551,0.115,2.342,0.115h178.2c20.841,0,37.8-16.964,37.8-37.8V86.999 c0-20.838-16.959-37.8-37.8-37.8h-178.2c-0.791,0-1.561,0.076-2.342,0.124V0L11.228,46.417v494.564L359.031,588.6V537.786z M361.373,70.804h178.2c8.933,0,16.2,7.269,16.2,16.2v413.097c0,8.934-7.268,16.2-16.2,16.2h-178.2 c-0.802,0-1.571-0.11-2.342-0.232v-118.82h179.729V229.851H359.031V71.046C359.802,70.928,360.571,70.804,361.373,70.804z M443.818,356.749v35.1h-84.154v-35.1H443.818z M359.664,310.848V275.75h84.154v35.098H359.664z M533.361,275.75v35.098h-84.144 V275.75H533.361z M449.218,270.351V235.25h84.144v35.101H449.218z M533.361,356.749v35.1h-84.144v-35.1H533.361z M77.688,339.167 l-7.159-16.168c-2.906-6.181-4.77-10.758-6.961-15.853l-0.232-0.005c-1.616,5.01-3.57,9.486-5.967,15.467l-6.373,15.436 l-19.375-0.817l21.756-42.837l-20.994-42.124l19.514-0.545l6.719,15.66c2.294,5.255,4.023,9.5,5.875,14.401h0.221 c1.859-5.576,3.365-9.481,5.342-14.573l6.684-16.179l20.849-0.577l-22.734,43.563l23.955,46.032L77.688,339.167z M163.284,342.774 l-54.388-2.289v-90.337l19.251-0.54v74.271l35.137,1.019V342.774z M198.492,345.684c-10.832-0.464-21.347-3.744-26.552-6.908 l4.24-17.598c5.647,3.117,14.423,6.355,23.588,6.64c10.017,0.301,15.356-3.739,15.356-10.136c0-6.085-4.628-9.635-16.206-13.975 c-15.709-5.732-25.758-14.528-25.758-28.326c0-16.176,13.242-28.938,35.754-29.592c11.017-0.316,19.256,1.788,25.187,4.271 l-5.05,18.151c-3.986-1.849-11.021-4.522-20.574-4.369c-9.424,0.145-13.948,4.509-13.948,9.514c0,6.141,5.374,8.846,17.843,13.587 c17.418,6.46,25.769,15.636,25.769,29.646C238.151,333.25,225.224,346.839,198.492,345.684z M310.311,348.964l-10.035-19.195 c-4.063-7.33-6.661-12.751-9.73-18.789h-0.322c-2.251,5.911-4.986,11.185-8.34,18.246l-8.864,18.156l-26.892-1.128l30.201-50.352 l-29.138-49.599l27.092-0.752l9.368,18.457c3.204,6.199,5.605,11.211,8.192,17.004h0.324c2.587-6.597,4.693-11.219,7.465-17.247 l9.354-19.175l29.331-0.817l-31.957,51.706l33.677,54.729L310.311,348.964z"></path>
        </g>
      </g>
    </svg>
  );
};

const StatusCard = ({ title, today, tomorrow, future }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center lg:flex-none bg-white shadow-lg rounded-lg p-4 lg:p-0 mb-4 ">
      {/* Title and Icon */}
      <div className="flex items-center space-x-4 lg:w-1/4 lg:p-4 lg:border-r">
        <h3 className="text-lg font-semibold text-gray-700 capitalize">
          {title}
        </h3>
        <div className="bg-green-100 p-2 rounded-full">
          {/* Icon (assuming it's an external link icon) */}

          <SVGIcon />
        </div>
      </div>

      {/* Status Counts */}
      <div className="flex space-x-6  lg:w-full h-full lg:space-x-0 lg:grid grid-cols-3 lg:divide-x">
        <div
          onClick={() =>
            today?.today &&
            navigate(
              `/admin/order-list/tod/${title}/${encodeURIComponent(
                encryptData(today?.order_id)
              )}`
            )
          }
          className="flex flex-col items-center h-full lg:bg-green-100 lg:p-3"
        >
          <span className="text-sm lg:font-medium text-gray-500">Today</span>
          <span className="text-lg lg:text-xl font-semibold text-green-600">
            {today?.today ?? 0}
          </span>
        </div>
        <div
          onClick={() =>
            tomorrow?.tomorrow &&
            navigate(
              `/admin/order-list/tom/${title}/${encodeURIComponent(
                encryptData(tomorrow?.order_id)
              )}`
            )
          }
          className="flex flex-col items-center lg:p-3 lg:bg-yellow-100"
        >
          <span className="text-sm lg:font-medium text-gray-500">Tomorrow</span>
          <span className="text-lg lg:text-xl font-semibold text-yellow-600">
            {tomorrow?.tomorrow ?? 0}
          </span>
        </div>
        <div
          onClick={() =>
            future?.future &&
            navigate(
              `/admin/order-list/fut/${title}/${encodeURIComponent(
                encryptData(future?.order_id)
              )}`
            )
          }
          className="flex flex-col items-center lg:p-3 lg:bg-red-100"
        >
          <span className="text-sm lg:font-medium text-gray-500">Future</span>
          <span className="text-lg lg:text-xl font-semibold text-red-600">
            {future?.future ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
