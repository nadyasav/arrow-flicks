import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './moviesSlice';
import movieSingleSlice from './movieSingleSlice';
import genresListSlice from './genresListSlice';
import filtersSlice from './filtersSlice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    movie: movieSingleSlice.reducer,
    genresList: genresListSlice.reducer,
    filters: filtersSlice.reducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
