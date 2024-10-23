import { apiSlice } from "../apiSlice";

const OwnerTicketAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTicketOfVendor: builder.query({
      query: () => ({
        url: `owner/getTicketOfVendor?owner_id=6718b65ecd48abaa7b95e285`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTicketOfVendorQuery,
} = OwnerTicketAPI;
