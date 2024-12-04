import { authApi } from './api.service';
import { GAME_URL } from '../../redux/app/constants';

interface GameRoom {
  playerId: string | null;
  roomName: string;
}

interface GameResult {
  id: string | null;
  resultMsg: string;
}

export const tournamentApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ------- SIDEBAR PLAYERS ------- */
    getPlayers: builder.query({
      query: () => `${GAME_URL}/players`,
      providesTags: ['Player'],
    }),

    /* ------- GET PLAYER ROOM ------- */
    playerRoom: builder.query({
      query: (id) => `${GAME_URL}/room/${id}`,
      providesTags: ['Player'],
    }),

    /* ------- GET PLAYER RESULT ------- */
    playerResult: builder.query({
      query: (id) => `${GAME_URL}/result/${id}`,
      providesTags: ['Player'],
    }),

    /* ------- GET PLAYER RESULT ------- */
    playerTournament: builder.query({
      query: (id) => `${GAME_URL}/game/${id}`,
      providesTags: ['Player'],
    }),

    /* ------- CREATE OR JOIN A ROOM ------- */
    createRoom: builder.mutation<void, GameRoom>({
      query: ({ playerId, ...roomName }) => ({
        url: `${GAME_URL}/${playerId}`,
        method: 'POST',
        body: roomName,
      }),
      invalidatesTags: ['Player'],
    }),

    joinRoom: builder.mutation<void, GameRoom>({
      query: ({ playerId, ...roomName }) => ({
        url: `${GAME_URL}/join/${playerId}`,
        method: 'POST',
        body: roomName,
      }),
      invalidatesTags: ['Player'],
    }),

    /* ------- CREATE A RESULT ------- */
    createResult: builder.mutation<void, GameResult>({
      query: ({ id, ...result }) => ({
        url: `${GAME_URL}/results/${id}`,
        method: 'POST',
        body: result,
      }),
      invalidatesTags: ['Player'],
    }),
  }),
});

export const {
  useGetPlayersQuery,
  usePlayerRoomQuery,
  usePlayerResultQuery,
  usePlayerTournamentQuery,
  useCreateRoomMutation,
  useJoinRoomMutation,
  useCreateResultMutation,
} = tournamentApi;
