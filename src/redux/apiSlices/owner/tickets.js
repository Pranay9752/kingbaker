import getCookie from "../../../atom/utils/getCookies";
import { apiSlice } from "../apiSlice";

const OwnerTicketAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTicketOfVendor: builder.query({
      query: () => ({
        url: `owner/getTicketOfVendor?owner_id=${getCookie("_id")}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTicketOfVendorQuery,
} = OwnerTicketAPI;
