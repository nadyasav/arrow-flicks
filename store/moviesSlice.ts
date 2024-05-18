import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MoviesSearchParams, Movie, RequesStatus, MoviesRes } from '../types/types';
import axios from 'axios';

interface IMoviesSlice {
  movies: Array<Movie>;
  moviesStatus: RequesStatus | '';
}

const initialState: IMoviesSlice = {
  movies: [],
  moviesStatus: '',
};

export const fetchMovies = createAsyncThunk<MoviesRes, MoviesSearchParams | undefined, { rejectValue: string }>(
  'movies/fetchMovies',
  async (params, { rejectWithValue }) => {
    return await axios
      .get<MoviesRes>('api/movies', { params: { language: 'en-US', ...params } })
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.moviesStatus = RequesStatus.FULFILLED;
        state.movies = action.payload.results;
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

export default moviesSlice;
