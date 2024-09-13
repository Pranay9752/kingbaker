import getCookie from "../../../atom/utils/getCookies";
import { apiSlice } from "../apiSlice";

const ListingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    filterDetails: builder.mutation({
      query: (data) => ({
        url: "/product/filterDetails",
        method: "POST",
        body: data,
      }),
    }),
    
  }),

  overrideExisting: false,
});

export const { useFilterDetailsMutation } = ListingApi;
