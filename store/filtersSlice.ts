import { createSlice } from '@reduxjs/toolkit';
import { IFilters } from '../types/types';

const initialState: IFilters = {
    withGenres: undefined,
    primaryReleaseYear: undefined,
    voteAverageLte: undefined,
    voteAverageGte: undefined,
    sortBy: "popularity.desc"
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
      state.sortBy = "popularity.desc";
    },
  },
});

export const { setGenres, setVoteAverageGte, setVoteAverageLte, setSortBy, resetFilters } = filtersSlice.actions;
export default filtersSlice;
