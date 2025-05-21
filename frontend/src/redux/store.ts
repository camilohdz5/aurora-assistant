import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    // Agrega otros reducers aquí si es necesario
  },
});

// Inferir los tipos \`RootState\` y \`AppDispatch\` del propio store
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch; 