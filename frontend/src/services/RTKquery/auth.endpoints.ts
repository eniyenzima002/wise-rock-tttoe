import { authApi } from './api.service';
import { AUTH_URL } from '../../redux/app/constants';

export const authUserApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body: {
        email: string;
        password: string;
        confirmPassword: string;
      }) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }),
    }),

    login: builder.mutation({
      query: (body: { username: string; password: string }) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      }),
    }),

    getAuthPlayer: builder.query({
      query: () => `${AUTH_URL}/player`,
      providesTags: ['Player'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAuthPlayerQuery,
} = authUserApi;
