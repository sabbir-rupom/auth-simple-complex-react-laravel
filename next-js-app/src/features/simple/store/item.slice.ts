import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import itemDTO, { defaultItemInput } from '../shared/data';
import ItemApi from './../services/ItemApi';

type ItemState = {
  isLoading: boolean;
  heads: object[];
  items: itemDTO[];
  formInput: itemDTO;
};

const initialState: ItemState = {
  isLoading: false,
  heads: [],
  items: [],
  formInput: defaultItemInput,
};

/**
 * Get item heads array with Redux Thunk
 */
export const fetchHeads = createAsyncThunk<object[]>(
  'item/getAllHeads',
  async (): Promise<object[]> => {
    return ItemApi.heads();
  }
);

/**
 * Get item list with Redux Thunk
 */
export const fetchItems = createAsyncThunk(
  'item/getAllItems',
  async thunkAPI => {
    return ItemApi.getAll();
  }
);

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    // set item form input object
    setItemForm (state, action: PayloadAction<itemDTO>) {
      state.formInput = action.payload;
    },

    // set item list array
    setItemList (state, action: PayloadAction<itemDTO[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    // Set loading parameter to true if item list not fetched yet
    builder.addCase(fetchItems.pending, state => {
      state.isLoading = true;
    });

    // Set heads parameter upon API call is finished
    builder.addCase(fetchHeads.fulfilled, (state: any, action) => {
      state.heads = action.payload;
    });

    // Set items parameter upon API call is finished & set loading parameter to false
    builder.addCase(fetchItems.fulfilled, (state: any, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;
