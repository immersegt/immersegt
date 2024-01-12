import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface TeamState {
    teamId: string,
    teamName: string,
    teamDescription: string
}

const initialState: TeamState = {
    teamId: "",
    teamName: "",
    teamDescription: ""
}

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setTeamId: (state, action: PayloadAction<string>) => {
            state.teamId = action.payload;
        },
        setTeamName: (state, action: PayloadAction<string>) => {
            state.teamName = action.payload;
        },
        setTeamDescription: (state, action: PayloadAction<string>) => {
            state.teamDescription = action.payload;
        },
        clearTeam: (state) => {
            state.teamId = "";
            state.teamName = "";
            state.teamDescription = "";
        }
    }
})


export const { setTeamId, setTeamName, setTeamDescription, clearTeam } = teamSlice.actions;

export default teamSlice.reducer;