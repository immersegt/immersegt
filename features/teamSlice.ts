import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface TeamState {
    teamId: string,
    teamName: string,
    teamDescription: string,
    members: Array<string>,
    declared: boolean
}

const initialState: TeamState = {
    teamId: "",
    teamName: "",
    teamDescription: "",
    members: [],
    declared: false
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
        setMembers: (state, action: PayloadAction<Array<string>>) => {
            state.members = action.payload;
        },
        setDeclared: (state, action: PayloadAction<boolean>) => {
            state.declared = action.payload;
        },
        clearTeam: (state) => {
            state.teamId = "";
            state.teamName = "";
            state.teamDescription = "";
            state.members = [];
        }
    }
})


export const { setTeamId, setTeamName, setTeamDescription, setMembers, setDeclared, clearTeam } = teamSlice.actions;

export default teamSlice.reducer;