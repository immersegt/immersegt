import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface TeamState {
    name: string
}

const initialState: TeamState = {
    name: "",
}

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    }
})


export const { setName } = teamSlice.actions;

export default teamSlice.reducer;