import { Action } from "@reduxjs/toolkit";
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from "redux-persist";
import { BASE_URL } from '../../redux/app/constants';

type RootState = any // normally inferred from state

function isHydrateAction(action: Action): action is Action<typeof REHYDRATE> & {
  key: string
  payload: RootState
  err: unknown
} {
  return action.type === REHYDRATE
}

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const authApi = createApi({
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }): any {
    return isHydrateAction(action) && action.key === reducerPath ? action.payload : undefined;
  },

  tagTypes: ["Player"],
  endpoints: () => ({}),
});
