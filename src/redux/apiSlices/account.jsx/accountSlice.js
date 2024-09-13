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
        url: "/user/createUser",
        method: "POST",
        body: data,
      }),
    }),
    checkEmail: builder.mutation({
      query: ({ email }) => ({
        url: "/user/checkEmail",
        method: "POST",
        body: { email },
      }),
    }),

    getProfile: builder.query({
      query: ({ email }) => ({
        url: `user/getProfile/` + email,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  //GET
  useGetProfileQuery,

  //POST
  useLoginUserMutation,
  useCreateUserMutation,
  useCheckEmailMutation,
} = accountApi;
