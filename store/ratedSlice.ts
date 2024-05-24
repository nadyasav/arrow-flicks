import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequesStatus, MovieSingle, RatedId, IFetchRatedResData, FetchRatedParams } from '../types/types';
import axios from 'axios';
import { getLocalStorage } from '../utils/getLocalStorage';
import { RatedMoviesRequest } from '../services/ratedMovies';

interface IRatedSlice {
  ratedIds: Array<RatedId>;
  ratedStatus: RequesStatus | '';
  ratedMovies: IFetchRatedResData;
}

const initialState: IRatedSlice = {
  ratedIds: typeof window === "undefined" ? [] : getLocalStorage('ratedMovies'),
  ratedStatus: '',
  ratedMovies: {
    movies: [],
    page: 1,
    totalPages: 1
  }
};

export const fetchRatedMovie = createAsyncThunk<MovieSingle, string, { rejectValue: string }>(
  'rated/fetchRatedMovie',
  async (id, { rejectWithValue }) => {
    return await axios
      .get<MovieSingle>(`../api/movies/${id}`, { params: { id } })
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

export const fetchRatedMovies = createAsyncThunk<IFetchRatedResData, FetchRatedParams, { rejectValue: string }>(
  'rated/fetchRatedMovies',
  async (data, { getState, rejectWithValue }) => {
    const { rated } = getState() as { rated: IRatedSlice };
    const res = await RatedMoviesRequest([...rated.ratedIds], {...data});
    return res.status === RequesStatus.REJECTED ? rejectWithValue('failed to fetch data') : res.data;
  }
);

const ratedSlice = createSlice({
  name: 'rated',
  initialState,
  reducers: {
    resetRatedMovies: (state) => {
      state.ratedMovies.movies = [];
    },
    setPage: (state, action) => {
      state.ratedMovies.page = action.payload;
    },
    addRated: (state, action) => {
      const index = state.ratedIds.findIndex((item) => item.id == action.payload.id);
      if (index > -1) {
        state.ratedIds[index].rating = action.payload.rating;
      } else {
        state.ratedIds.push(action.payload);
      }
      localStorage.ratedMovies = JSON.stringify(state.ratedIds);
    },
    removeRatedById: (state, action) => {
      const index = state.ratedIds.findIndex((item) => item.id == action.payload);
      if (index > -1) {
        state.ratedIds.splice(index, 1);
      }
      localStorage.ratedMovies = JSON.stringify(state.ratedIds);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRatedMovies.fulfilled, (state, action) => {
        state.ratedStatus = RequesStatus.FULFILLED;
        state.ratedMovies = action.payload;
    });
    builder.addCase(fetchRatedMovies.pending, (state) => {
        state.ratedStatus = RequesStatus.PENDING;
    });
    builder.addCase(fetchRatedMovies.rejected, (state, action) => {
        state.ratedStatus = RequesStatus.REJECTED;
        console.error('rated/fetchRatedMovies: ', action.payload)
    });
  },
});

export const { resetRatedMovies, setPage, addRated, removeRatedById } = ratedSlice.actions;
export default ratedSlice;
