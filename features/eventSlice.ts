import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { Session } from "@supabase/gotrue-js/src/lib/types";

interface EventState {
    events: Array<Object>,
}

const initialState: EventState = {
    events: []
}

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<Array<Object>>) => {
            state.events = action.payload;
        },
        clearEvents: (state) => {
            state.events = [];
        }
    }
})

export const { setEvents, clearEvents } = eventSlice.actions;

export default eventSlice.reducer;