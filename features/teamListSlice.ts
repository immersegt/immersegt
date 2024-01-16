import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface TeamProps {
    id: string,
    name: string,
    description: string,
    members: Array<string>,
    declared: boolean
}

interface UserProps {
    id: string,
    name: string
}

interface TeamListState {
    teams: Array<TeamProps>,
    users: Array<UserProps>
}

const initialState: TeamListState = {
    teams: [],
    users: [],
}

export const teamListSlice = createSlice({
    name: 'teamList',
    initialState,
    reducers: {
        loadTeams: (state, action: PayloadAction<Array<TeamProps>>) => {
            state.teams = action.payload;
        },
        addTeams: (state, action: PayloadAction<Array<TeamProps>>) => {
            state.teams = state.teams.concat(action.payload);
        },
        clearTeams: (state) => {
            state.teams = [];
        },
        loadUsers: (state, action: PayloadAction<Array<UserProps>>) => {
            state.users = action.payload;
        },
        clearUsers: (state) => {
            state.users = [];
        }
    }
})


export const { loadTeams, addTeams, clearTeams, loadUsers, clearUsers } = teamListSlice.actions;

export default teamListSlice.reducer;