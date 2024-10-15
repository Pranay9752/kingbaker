import getCookie from "../../../atom/utils/getCookies";
import { apiSlice } from "../apiSlice";

const ListingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    filterDetails: builder.mutation({
      query: ({ search_text }) => ({
        url: "/product/filterDetails",
        method: "POST",
        body: {
          search_text,
        },
      }),
    }),
    filterProduct: builder.mutation({
      query: (data) => ({
        url: "/product/filterProduct",
        method: "POST",
        body: data,
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useFilterDetailsMutation, useFilterProductMutation } =
  ListingApi;
