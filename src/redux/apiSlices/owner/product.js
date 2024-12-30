import { apiSlice } from "../apiSlice";

const ProductOrderAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createProduct: builder.mutation({
      query: ({ data }) => ({
        url: `product/createProduct`,
        method: "POST",
        body: data,
      }),
    }),
    uploadImages: builder.mutation({
      query: (formData) => ({
        url: '/uploadimages',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateProductMutation, useUploadImagesMutation  } = ProductOrderAPI;
