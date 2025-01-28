import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG } from "../../config/api.config";
import { LoginRequest, LoginResponse, User } from "../../types/api.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: API_CONFIG.endpoints.login,
        method: "POST",
        body: credentials,
      }),
    }),
    getUserProfile: builder.query<User, void>({
      query: () => ({
        url: API_CONFIG.endpoints.profile,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserProfileQuery } = authApi;

export default authApi;
