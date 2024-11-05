import { apiSlice } from "../apiSlice";

const OwnerVendorAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendor: builder.query({
      query: () => ({
        url: `owner/getAllVendor?owner_id=6718b65ecd48abaa7b95e285`,
        method: "GET",
      }),
    }),
    createVendor: builder.mutation({
      query: (data) => ({
        url: "vendor/createVendor",
        method: "POST",
        body: data,
      }),
    }),
    updateOwnerOrVendor: builder.mutation({
      query: (data) => ({
        url: "owner/updateOwnerOrVendor",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllVendorQuery,
  useCreateVendorMutation,
  useUpdateOwnerOrVendorMutation,
} = OwnerVendorAPI;
