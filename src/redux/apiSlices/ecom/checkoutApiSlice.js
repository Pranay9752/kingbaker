import getCookie from "../../../atom/utils/getCookies";
import { apiSlice } from "../apiSlice";

const CheckoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (data) => ({
        url: "/user/addAddress",
        method: "POST",
        body: data,
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/createOrder",
        method: "POST",
        body: data,
      }),
    }),
    placeOrder: builder.mutation({
      query: ({ order_id }) => ({
        url: `/order/placeOrder?_id=${order_id}`,
        method: "POST",
      }),
    }),
    getAddress: builder.query({
      query: () => ({
        url: `/user/getAddress/`, // + getCookie("user_id"),
        method: "GET",
        params: {
          user_id: getCookie("user_id"),
        },
      }),
    }),
    getOccation: builder.query({
      query: () => ({
        url: `/occation/getOccation/`, // + getCookie("user_id"),
        method: "GET",
      }),
    }),
    getCartItem: builder.query({
      query: () => ({
        url: `/order/getCartItem`, // + getCookie("user_id"),
        method: "GET",
        params: {
          user_id: getCookie("_id"),
        },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddAddressMutation,
  useCreateOrderMutation,
  usePlaceOrderMutation,
  useGetAddressQuery,
  useGetOccationQuery,
  useGetCartItemQuery,
} = CheckoutApi;
