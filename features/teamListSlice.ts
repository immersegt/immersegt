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
        loadTeams: (state) => {
            state.teams = [];
        },
        clearTeams: (state) => {
            state.teams = [];
        }
    }
})


export const { loadTeams, clearTeams } = teamListSlice.actions;

export default teamListSlice.reducer;