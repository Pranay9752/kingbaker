import getCookie from "../../../atom/utils/getCookies";
import { apiSlice } from "../apiSlice";

const OwnerOrderAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderOfVendor: builder.query({
      query: () => ({
        url: `owner/getOrderOfVendor?owner_id=${getCookie("_id")}`,
        method: "GET",
      }),
    }),
    updateOrderByOwner: builder.mutation({
      query: ({ orderId, ownerId, vendorId, data }) => ({
        url: `/owner/updateOrder`,
        method: "PATCH",
        params: {
          order_id: orderId,
          owner_id: ownerId,
          vendor_id: vendorId,
        },
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetOrderOfVendorQuery, useUpdateOrderByOwnerMutation } = OwnerOrderAPI;
