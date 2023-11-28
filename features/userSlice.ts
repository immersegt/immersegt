import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface UserState {
    name: string,
    username: string,
    hashPassword: string,
    id: string
}

const initialState: UserState = {
    name: "",
    username: "",
    hashPassword: "",
    id: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setHashPassword: (state, action: PayloadAction<string>) => {
            state.hashPassword = action.payload;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        logout: (state) => {
            state.name = "";
            state.username = "";
            state.hashPassword = "";
            state.id = "";
        }
    }
})

export const { setName, setUsername, setHashPassword, setId, logout } = userSlice.actions;

export const selectName = (state: RootState) => state.user.name;

export default userSlice.reducer;