import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './moviesSlice';
import movieSingleSlice from './movieSingleSlice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    movie: movieSingleSlice.reducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
