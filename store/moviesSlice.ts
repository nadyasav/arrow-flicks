import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MoviesSearchParams, Movie, RequesStatus, MoviesRes, Language } from '../types/types';
import axios from 'axios';
import { getTotalPages } from '../utils/getTotalPages';

interface IMoviesSlice {
  movies: Array<Movie>;
  moviesStatus: RequesStatus | '';
  page: number;
  totalPages: number;
}

const initialState: IMoviesSlice = {
  movies: [],
  moviesStatus: '',
  page: 1,
  totalPages: 1,
};

export const fetchMovies = createAsyncThunk<MoviesRes, MoviesSearchParams | undefined, { rejectValue: string }>(
  'movies/fetchMovies',
  async (params, { rejectWithValue }) => {
    return await axios
      .get<MoviesRes>('api/movies', { params: { language: Language.EN, ...params } })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue('failed to fetch data');
        }
      });
    }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.moviesStatus = RequesStatus.FULFILLED;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        const total = action.payload.total_pages;
        state.totalPages = getTotalPages(total);
    });
    builder.addCase(fetchMovies.pending, (state) => {
        state.moviesStatus = RequesStatus.PENDING;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
        console.error('movies/fetchMovies: ', action.payload)
        state.moviesStatus = RequesStatus.REJECTED;
    });
  },
});

export const { setPage } = moviesSlice.actions;
export default moviesSlice;
