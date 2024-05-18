import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequesStatus, MovieSingle, RatedId } from '../types/types';
import axios from 'axios';
import { getRatedIdsOnPage } from '../utils/getRatedIdsOnPage';
import { getLocalStorage } from '../utils/getLocalStorage';

interface IRatedSlice {
  ratedIds: Array<RatedId>
  ratedMovies: Array<MovieSingle>;
  ratedStatus: RequesStatus | '';
  page: number;
}

const initialState: IRatedSlice = {
  ratedIds: typeof window === "undefined" ? [] : getLocalStorage('ratedMovies'),
  ratedMovies: [],
  ratedStatus: '',
  page: 1
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

export const fetchRatedMovies = createAsyncThunk<Array<MovieSingle>, number>(
  'rated/fetchRatedMovies',
  async (page, { dispatch, getState, rejectWithValue }) => {
    const promices: Array<any> = [];
    const { rated } = getState() as { rated: IRatedSlice };
    const ratedPart = getRatedIdsOnPage(page, rated.ratedIds);

    ratedPart.forEach((item) => promices.push(dispatch(fetchRatedMovie(item.id.toString()))));
    const actions = await Promise.all(promices);
    const rejectedReq = actions.filter((item) => item.meta.requestStatus === 'rejected');
    if(rejectedReq.length > 0) {
      //if(rejectedReq.payload.statusCode == 34){}
      return rejectWithValue('failed to fetch data');
    }
    return actions.map((item) => item.payload);
  });

const ratedSlice = createSlice({
  name: 'rated',
  initialState,
  reducers: {
    resetRated: (state) => {
      state.ratedMovies = [];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    addRated: (state, action) => {
      state.ratedIds.push(action.payload);
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
        console.log(action.payload);
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

export const { resetRated, setPage, addRated, removeRatedById } = ratedSlice.actions;
export default ratedSlice;
