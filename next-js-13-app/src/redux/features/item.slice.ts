import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultItemInput } from '@/app/simple/shared/constants';
import itemDTO from '@/app/simple/shared/constants';
import ItemApi from '@/app/simple/services/ItemApi';

type ItemState = {
  isLoading: boolean;
  items: itemDTO[];
  formInput: itemDTO;
};

const initialState: ItemState = {
  isLoading: false,
  items: [],
  formInput: defaultItemInput,
};

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

    // Set items parameter upon API call is finished & set loading parameter to false
    builder.addCase(fetchItems.fulfilled, (state: any, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;
