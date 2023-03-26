import { callApi } from "@/common/services/Axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import itemDTO from "../shared/data";

type InitialState = {
  // loading: boolean;
  heads: object[];
  items: itemDTO[];
  formInput: itemDTO;
};

const initialState: InitialState = {
  heads: [],
  items: [],
  formInput: {
    name: "",
    code: "",
    head: 0,
    status: false,
    id: 0,
  },
};

export const fetchHeads = createAsyncThunk<object[]>(
  "item/getAllHeads",
  async (): Promise<object[]> => {
    let response: any = await callApi("simple/heads", "get");

    if (response.data) {
      console.log("heads:", response.data);
      return response.data;
    } else {
      console.log("Error occurred: " + response.message);
    }
    return [];
  }
);

export const fetchItems = createAsyncThunk<itemDTO[]>(
  "item/getAllItems",
  async (): Promise<itemDTO[]> => {
    let response: any = await callApi("simple/items", "get");

    if (response.data) {
      console.log("items:", response.data);
      return response.data;
    } else {
      console.log("Error occurred: " + response.message);
    }
    return [];
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setForm(state, action: PayloadAction<itemDTO>) {
      state.formInput = action.payload;
    },
    setHeads(state, action: PayloadAction<object[]>) {
      state.heads = action.payload;
    },
    setItems(state, action: PayloadAction<itemDTO[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchHeads.pending, (state) => {
    //   state.loading = true;
    // });

    builder.addCase(fetchHeads.fulfilled, (state, action) => {
      // state.loading = false;
      state.heads = action.payload;
    });

    builder.addCase(fetchItems.fulfilled, (state, action) => {
      // state.loading = false;
      state.items = action.payload;
    });
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;
