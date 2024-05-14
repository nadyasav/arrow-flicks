import { createSlice } from '@reduxjs/toolkit';
import { SortBy } from '../types/types';

interface IFilters{
  withGenres: string | undefined;
  primaryReleaseYear: number | undefined;
  voteAverageLte: number | undefined;
  voteAverageGte: number | undefined;
  sortBy: SortBy | undefined;
}

const initialState: IFilters = {
    withGenres: undefined,
    primaryReleaseYear: undefined,
    voteAverageLte: undefined,
    voteAverageGte: undefined,
    sortBy: undefined
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGenres: (state, action) => {
      state.withGenres = action.payload;
    },
    setReleaseYear: (state, action) => {
      state.primaryReleaseYear = action.payload;
    },
    setVoteAverageLte: (state, action) => {
      state.voteAverageLte = action.payload;
    },
    setVoteAverageGte: (state, action) => {
      state.voteAverageGte = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.withGenres = undefined;
      state.primaryReleaseYear = undefined;
      state.voteAverageLte = undefined;
      state.voteAverageGte = undefined;
      state.sortBy = undefined;
    },
  },
});

export const { setGenres } = filtersSlice.actions;
export default filtersSlice;
