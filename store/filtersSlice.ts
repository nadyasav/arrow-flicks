import { createSlice } from '@reduxjs/toolkit';
import { IFilters } from '../types/types';
import { SORT_BY_DEFAULT } from '../constants/constants';

const initialState: IFilters = {
    withGenres: undefined,
    primaryReleaseYear: undefined,
    voteAverageLte: undefined,
    voteAverageGte: undefined,
    sortBy: SORT_BY_DEFAULT
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
      state.sortBy = SORT_BY_DEFAULT;
    },
  },
});

export const { setGenres, setVoteAverageGte, setVoteAverageLte, setSortBy, resetFilters, setReleaseYear } = filtersSlice.actions;
export default filtersSlice;
