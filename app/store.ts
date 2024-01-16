import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import teamReducer from '../features/teamSlice';
import teamListReducer from '../features/teamListSlice';
import eventReducer from '../features/eventSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    team: teamReducer,
    teamList: teamListReducer,
    events: eventReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch