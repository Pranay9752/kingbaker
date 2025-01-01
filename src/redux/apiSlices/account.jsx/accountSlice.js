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
    getOrderOfUser: builder.query({
      query: ({user_id}) => ({
        url: `user/getOrderOfVendor?user_id=${user_id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  //GET
  useGetProfileQuery,
  useGetOrderOfUserQuery,
  //POST
  useLoginUserMutation,
  useCreateUserMutation,
  useCheckEmailMutation,
} = accountApi;
