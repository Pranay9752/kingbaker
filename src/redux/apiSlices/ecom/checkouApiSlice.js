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
    getAddress: builder.query({
      query: () => ({
        url: `/user/getAddress/`,// + getCookie("user_id"),
        method: "GET",
        params:{
          user_id: getCookie("user_id")
        }
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useAddAddressMutation, useGetAddressQuery } = CheckoutApi;
