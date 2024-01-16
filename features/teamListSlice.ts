import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface TeamListState {
    teams: Array<Object>
}

const initialState: TeamListState = {
    teams: [],
}

export const teamListSlice = createSlice({
    name: 'teamList',
    initialState,
    reducers: {
        loadTeams: (state, action: PayloadAction<Array<Object>>) => {
            state.teams = action.payload;
        },
        addTeams: (state, action: PayloadAction<Array<Object>>) => {
            state.teams = state.teams.concat(action.payload);
        },
        clearTeams: (state) => {
            state.teams = [];
        }
    }
})


export const { loadTeams, addTeams, clearTeams } = teamListSlice.actions;

export default teamListSlice.reducer;