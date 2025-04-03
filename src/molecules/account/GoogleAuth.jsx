import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../../config";
import {
  useCreateUserMutation,
  useLoginUserMutation,
} from "../../redux/apiSlices/account.jsx/accountSlice";
import setCookie from "../../atom/utils/setCookies";
import getCookie from "../../atom/utils/getCookies";
import { useCreateOrderMutation } from "../../redux/apiSlices/ecom/checkoutApiSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ScreenLoader from "../../atom/loader/screenLoader";

function GoogleAuth() {
  const [loginUser, { isLoading: loginUserLoading }] = useLoginUserMutation();
  const [createUser, { isLoading: createUserLoading }] =
    useCreateUserMutation();
  const [createOrder, { isLoading: createOrderLoading }] =
    useCreateOrderMutation();

  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = user?.uid; // Get secure token

      const userData = {
        address: "",
        city: "",
        country: "",
        countryCode: "+91",
        dateOfAnniversary: "",
        dob: user?.birthdate || "",
        email: user?.email || "",
        gender: "NA",
        isExistingUser: !(result?._tokenResponse?.isNewUser || false),
        mobile: user?.phoneNumber || "",
        name: user?.displayName || "",
        google_token: token,
        login_type: "Google",
        password: token,
        pincode: "",
        title: user?.title || "Mr",
        username: user?.displayName || "",
      };

      let response;
      if (userData.isExistingUser) {
        response = await loginUser({
          email: userData.email,
          login_type: "Google",
          google_token: token,
        }).unwrap();
      } else {
        await createUser({ user_details: userData });
        response = await loginUser({
          email: userData.email,
          login_type: "Google",
          google_token: token,
        }).unwrap();
      }

      handlePostLoginTasks(response);
    } catch (error) {
      console.error("Google Auth Error: ", error);
      toast.error("Authentication failed");
    }
  };

  const handlePostLoginTasks = async (response) => {
    const { user_id, email, authcode, message, _id, role } =
      response?.data || {};
    setAuthenticationCookies({
      user: email,
      user_id,
      email,
      authcode,
      isAuth: true,
      _id,
      role,
    });
    console.log("first");
    await processCartOrders(_id);
    console.log("second");
    await processBuyNowOrder(_id);
    console.log("third");
    toast.success(message || "Operation successful");
    handleNavigation(role);
  };

  const setAuthenticationCookies = (data) => {
    Object.entries(data).forEach(([key, value]) => setCookie(key, value));
    setCookie("isAuth", true);
  };

  const processCartOrders = async (userId) => {
    const cartCookie = getCookie("cart", true);
    const cartOrder = cartCookie
      ? typeof cartCookie == "object"
        ? cartCookie
        : JSON.parse(cartCookie)
      : [];

    if (Array.isArray(cartOrder) && cartOrder.length > 0)
      await Promise.all(
        cartOrder.map(async (element) => {
          const newOrder = constructOrderPayload(element, userId);
          try {
            await createOrder(newOrder);
          } catch (error) {
            console.error("Cart Order Error: ", error);
          }
        })
      );
    setCookie("cart", [], true);
  };

  const processBuyNowOrder = async (userId) => {
    const buyNow = getCookie("buynow", true);
    if (!buyNow || typeof buyNow !== "object") return;

    try {
      const newOrder = constructOrderPayload(buyNow, userId);
      const response = await createOrder(newOrder);
      setCookie("buynow", "", true);
      navigate("/checkout/details");
    } catch (error) {
      console.error("Buy Now Order Error: ", error);
    }
  };

  const constructOrderPayload = (orderItem, userId) => {
    const { addons, mainItem } = orderItem;
    const productDetails = mainItem?.productDetails?.[0] ?? {};
    return {
      user_id: userId,
      order_status: "PENDING",
      payment_status: "PENDING",
      location: mainItem?.location ?? {},
      pincode: getCookie("pincode") ? parseInt(getCookie("pincode")) : 12345,
      delivery_details: {
        product_id: productDetails?._id,
        delivery_address: null,
        message_on_product: mainItem?.message_on_product ?? "",
        imgaes_on_product: mainItem?.imgaes_on_product ?? "",
        is_message: mainItem?.is_message,
        is_image: mainItem?.is_image,
        is_veg: mainItem?.is_veg,
        special_request: mainItem?.special_request ?? "",
        delivary_date: mainItem.shipping.delivary_date,
        shipping: mainItem.shipping,
        addOn:
          addons?.map((addOn) => ({
            addOn_id: addOn?.id,
            count: addOn?.quantity ?? 0,
          })) ?? [],
      },
    };
  };

  const handleNavigation = (role) => {
    console.log("role: ", role);
    if (role === "Vendor") {
      navigate("/admin/dashboard");
    } else if (role === "Owner") {
      navigate("/owner/vendors");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <ScreenLoader
        isLoading={createUserLoading || loginUserLoading || createOrderLoading}
      />

      <button
        onClick={handleGoogleAuth}
        aria-label="Sign in with Google"
        className="flex items-center gap-3 rounded-md p-0.5 pr-3 transition-colors duration-300 w-fit mx-auto hover:bg-[#5195ee] bg-[#1a73e8] "
      >
        <div className="flex items-center justify-center bg-white w-9 h-9 rounded-l">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <title>Sign in with Google</title>
            <desc>Google G Logo</desc>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285f4" // Google logo blue
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34a853" // Google logo green
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#fbbc05" // Google logo yellow
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#ea4335" // Google logo red
            />
          </svg>
        </div>

        <span className="text-sm text-white tracking-wider">
          Sign in with Google
        </span>
      </button>
    </>
  );
}

export default GoogleAuth;
