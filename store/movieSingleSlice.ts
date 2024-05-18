import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequesStatus, MovieSingle } from '../types/types';
import axios from 'axios';

interface IMovieSingleSlice {
  movie: MovieSingle | null;
  movieStatus: RequesStatus | '';
}

const initialState: IMovieSingleSlice = {
  movie: null,
  movieStatus: '',
};

export const fetchMovie = createAsyncThunk<MovieSingle, string, { rejectValue: string }>(
  'movie/fetchMovie',
  async (id, { rejectWithValue }) => {
    return await axios
      .get<MovieSingle>(`../api/movies/${id}`, { params: { id, append_to_response: 'videos' } })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue('failed to fetch data');
        }
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
    });
  },
});

export const { resetMovie } = movieSingleSlice.actions;
export default movieSingleSlice;
