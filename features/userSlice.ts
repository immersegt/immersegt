import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface UserState {
    name: string,
    username: string,
    hash_password: string,
    id: string
}

const initialState: UserState = {
    name: "",
    username: "",
    hash_password: "",
    id: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        }
    }
})

export const { setName } = userSlice.actions;

export const selectName = (state: RootState) => state.user.name;

export default userSlice.reducer;