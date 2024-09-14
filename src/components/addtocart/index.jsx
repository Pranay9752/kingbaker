import { useNavigate } from "react-router-dom";
import { useGetCartItemQuery } from "../../redux/apiSlices/ecom/checkoutApiSlice";
import getCookie from "../../atom/utils/getCookies";

const AddToCartModal = () => {
  const { data, isLoading, isError } = useGetCartItemQuery();
  const navigate = useNavigate();
  console.log("data: ", data);
  return (
    <div className="absolute bg-white rounded-lg shadow-lg w-96 p-4 -translate-x-[calc(100%-30px)]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="font-semibold text-lg">My Cart</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-9 text-green-500"
          >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
        </div>
        {getCookie("isAuth") === "true" ? (
          <>
            <h2 className="text-xl font-semibold mb-2 text-green-700">
              No Item Found!
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2 text-green-700">
              Missing Cart Item?
            </h2>
            <p className="text-sm text-center text-gray-600">
              Login to see items you added previously
            </p>
          </>
        )}
      </div>
      {getCookie("isAuth") !== "true" && (
        <>
          <button
            // onClick={onLogin}
            className="w-full bg-orange-500 text-white py-2 rounded-md mb-3 font-semibold"
          >
            LOGIN
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full text-orange-500 py-2 rounded-md border border-orange-500 font-semibold"
          >
            CONTINUE SHOPPING
          </button>
        </>
      )}
    </div>
  );
};

export default AddToCartModal;
