import { createSlice } from '@reduxjs/toolkit';
import { IFilters } from '../types/types';
import { SORT_BY_DEFAULT_KEY } from '../constants/constants';

const initialState: IFilters = {
    filters: {
      withGenres: undefined,
      primaryReleaseYear: undefined,
      voteAverageLte: undefined,
      voteAverageGte: undefined,
      sortBy: SORT_BY_DEFAULT_KEY
    }
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {...state.filters,...action.payload};
    },
    resetFilters: (state) => {
      state.filters = {
        withGenres: undefined,
        primaryReleaseYear: undefined,
        voteAverageLte: undefined,
        voteAverageGte: undefined,
        sortBy: SORT_BY_DEFAULT_KEY,
      }
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice;
