import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GenresList, RequesStatus } from '../types/types';
import axios from 'axios';

interface IGenresListRes {
  genres: GenresList;
}

interface IGenresListSlice {
    genresList: GenresList;
    genresListStatus: RequesStatus | '';
}

const initialState: IGenresListSlice = {
    genresList: [],
    genresListStatus: '',
};

export const fetchGenresList = createAsyncThunk<IGenresListRes, void, { rejectValue: string }>(
  'genresList/fetchGenresList',
  async (_, { rejectWithValue }) => {
    return await axios
      .get<IGenresListRes>('api/genres')
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
        const { genresList } = getState() as { genresList: IGenresListSlice };
        if (genresList.genresListStatus === RequesStatus.PENDING) {
            return false;
        }
        return true;
        },
    }
);

const genresListSlice = createSlice({
  name: 'genresList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenresList.fulfilled, (state, action) => {
        state.genresListStatus = RequesStatus.FULFILLED;
        state.genresList = action.payload.genres;
    });
    builder.addCase(fetchGenresList.pending, (state) => {
        state.genresListStatus = RequesStatus.PENDING;
    });
    builder.addCase(fetchGenresList.rejected, (state, action) => {
        console.error('genresList/fetchGenresList: ', action.payload)
        state.genresListStatus = RequesStatus.REJECTED;
    });
  },
});

export default genresListSlice;
