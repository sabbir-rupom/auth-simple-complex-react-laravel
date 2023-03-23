import { callApi } from '@/common/services/Axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import itemDTO from '../shared/data';

type InitialState = {
  loading: boolean;
  heads: object[];
  items: object[];
  formInput: itemDTO;
};

const initialState: InitialState = {
  loading: false,
  heads: [],
  items: [],
  formInput: {
    name: '',
    code: '',
    head: 0,
    status: false,
    id: 0,
  },
};

export const fetchHeads = createAsyncThunk<object[]>(
  'item/getAllHeads',
  async (): Promise<object[]> => {
    let response: any = await callApi('simple/heads', 'get');

    if (response.data) {
      return response.data;
    } else {
      console.log('Error occurred: ' + response.message);
    }
    return [];
  }
);

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setForm (state, action: PayloadAction<itemDTO>) {
      state.formInput = action.payload;
    },
    setHeads (state, action: PayloadAction<object[]>) {
      state.heads = action.payload;
    },
    setItems (state, action: PayloadAction<object[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchHeads.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchHeads.fulfilled, (state, action) => {
      state.loading = false;
      state.heads = action.payload;
    });
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;
