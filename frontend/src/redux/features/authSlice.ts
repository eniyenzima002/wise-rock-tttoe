import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Socket } from "socket.io-client";

export interface AuthState {
    id: string | null;
    username: string | null;
    token: string | null;
    onlineUser: string[] | null;
    socketService: Socket | null | any
    playerResult: string | null
}

const initialState: AuthState = {
    id: null,
    username: null,
    token: null,
    onlineUser: null,
    socketService: null,
    playerResult: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ id: string, username: string, token: string }> ) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        logout: (state) => {
            localStorage.clear();
            state.id = null;
            state.username = null;
            state.token = null;
            state.socketService = null
        },
        setOnlineUser: (state, action: PayloadAction<{ onlineUser: string[] | null}>) => {
            state.onlineUser = action.payload.onlineUser
        },
        setSocketService: (state, action: PayloadAction<{ socketService: Socket | null }>) => {
            state.socketService = action.payload.socketService
        },
        setPlayerResult: (state, action: PayloadAction<{ playerResult: string }>) => {
            state.playerResult = action.payload.playerResult
        }
    },
});


export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logout, setOnlineUser, setSocketService } = authSlice.actions;

export default authSlice.reducer;

