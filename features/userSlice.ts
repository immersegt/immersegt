import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { Session } from "@supabase/gotrue-js/src/lib/types";

interface UserState {
    name: string,
    email: string,
    id: string,
    team_id: string,
    registered: boolean,
    session: Session|null
}

const initialState: UserState = {
    name: "",
    email: "",
    id: "",
    team_id: "",
    registered: false,
    session: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        setTeamId: (state, action: PayloadAction<string>) => {
            state.team_id = action.payload;
        },
        setRegistered: (state, action: PayloadAction<boolean>) => {
            state.registered = action.payload;
        },
        login: (state, action: PayloadAction<Session|null>) => {
            state.session = action.payload;
        },
        logout: (state) => {
            state.name = "";
            state.email = "";
            state.id = "";
            state.team_id = "";
            state.registered = false;
        }
    }
})

export const { setName, setEmail, setId, setTeamId, setRegistered, login, logout } = userSlice.actions;

export const selectName = (state: RootState) => state.user.name;

export default userSlice.reducer;