import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.137:8800/api' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kingsbakerbackend-production.up.railway.app/api' }),
  endpoints: (builder) => ({}),  // No initial endpoints
});

export const { useGetBaseQuery } = apiSlice;