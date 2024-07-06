import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequesStatus, MovieSingle, ErrorRes } from '../types/types';
import axios from 'axios';

interface IMovieSingleSlice {
  movie: MovieSingle | null;
  movieStatus: RequesStatus | '';
  movieStatusCode: number;
}

const initialState: IMovieSingleSlice = {
  movie: null,
  movieStatus: '',
  movieStatusCode: 200,
};

export const fetchMovie = createAsyncThunk<MovieSingle, string, { rejectValue: ErrorRes }>(
  'movie/fetchMovie',
  async (id, { rejectWithValue }) => {
    return await axios
      .get<MovieSingle>(`../api/movies/${id}`, { params: { id, append_to_response: 'videos' } })
      .then((res) => res.data)
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
    },
    {
        condition: (_, { getState }) => {
        const { movie } = getState() as { movie: IMovieSingleSlice };
        if (movie.movieStatus === RequesStatus.PENDING) {
            return false;
        }
        return true;
        },
    }
);

const movieSingleSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    resetMovie: (state) => {
      state.movie = null;
      state.movieStatus = '';
      state.movieStatusCode = 200;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
        state.movieStatus = RequesStatus.FULFILLED;
        state.movie = action.payload;
    });
    builder.addCase(fetchMovie.pending, (state) => {
        state.movieStatus = RequesStatus.PENDING;
    });
    builder.addCase(fetchMovie.rejected, (state, action) => {
        console.error('movie/fetchMovie: ', action.payload)
        state.movieStatus = RequesStatus.REJECTED;
        if(action.payload) {
          if(action.payload.status_code === 34) {
            state.movieStatusCode = 404;
          } else {
            state.movieStatusCode = action.payload.status_code;
          }
        }
    });
  },
});

export const { resetMovie } = movieSingleSlice.actions;
export default movieSingleSlice;
