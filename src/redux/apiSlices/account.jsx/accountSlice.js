import { apiSlice } from "../apiSlice";

const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method: "POST",
        body: user,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "user/createUser",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation,useCreateUserMutation } = accountApi;
