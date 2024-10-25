import { apiSlice } from "../apiSlice";

const OwnerOrderAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderOfVendor: builder.query({
      query: () => ({
        url: `owner/getOrderOfVendor?owner_id=6718b65ecd48abaa7b95e285`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrderOfVendorQuery,
} = OwnerOrderAPI;
