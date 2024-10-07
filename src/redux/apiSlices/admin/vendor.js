import { apiSlice } from "../apiSlice";

const VendorAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getalloatedAndAcceptedOrder: builder.query({
      query: ({vendor_id}) => ({
        url: `vendor/getalloatedAndAcceptedOrder?vendor_id=${vendor_id}`,
        method: "GET",
      }),
    }),
  
  }),
  overrideExisting: false,
});

export const {
  useGetalloatedAndAcceptedOrderQuery,
} = VendorAPI;
