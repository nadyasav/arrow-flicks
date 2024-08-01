import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './moviesSlice';
import movieSingleSlice from './movieSingleSlice';
import genresListSlice from './genresListSlice';
import ratedSlice from './ratedSlice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    movie: movieSingleSlice.reducer,
    genresList: genresListSlice.reducer,
    rated: ratedSlice.reducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
