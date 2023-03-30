import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import CommonApi from '../services/CommonApi';
import {
  BuyerDTO,
  CustomerDTO,
  defaultFilterParams,
  defaultOrderInput,
  FilterDTO,
  OrderDTO,
  OrderSummaryDTO,
  ProductDTO,
} from './../shared/data';

type OrderState = {
  isLoading: boolean;
  customers: CustomerDTO[];
  buyers: BuyerDTO[];
  products: ProductDTO[];
  orders: OrderSummaryDTO[];
  orderPagination: any;
  orderFormInput: OrderDTO;
  filterParams: FilterDTO;
};

const initialState: OrderState = {
  isLoading: false,
  customers: [],
  buyers: [],
  products: [],
  orders: [],
  orderFormInput: defaultOrderInput,
  orderPagination: {},
  filterParams: defaultFilterParams,
};

/**
 * ------------------------------------
 * Asynchronous Thunk Operation - START
 * ------------------------------------
 */

/**
 * Get product array list
 */
export const fetchProducts = createAsyncThunk(
  'order/getProducts',
  async thunkAPI => {
    return CommonApi.products();
  }
);

/**
 * Get customer array list
 */
export const fetchCustomers = createAsyncThunk(
  'order/getCustomers',
  async thunkAPI => {
    return CommonApi.customers();
  }
);

/**
 * Get buyer array list
 */
export const fetchBuyers = createAsyncThunk(
  'order/getBuyers',
  async thunkAPI => {
    return CommonApi.buyers();
  }
);

// ----------------------------------
// Asynchronous Thunk Operation - END
// ----------------------------------

/**
 * ------------------------------------------------------------
 * Order Store Slice Creation - START
 * ------------------------------------------------------------
 */
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading (state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setFilterForm (state, action: PayloadAction<FilterDTO>) {
      state.filterParams = action.payload;
    },
    setOrderForm (state, action: PayloadAction<OrderDTO>) {
      state.orderFormInput = action.payload;
    },
    setOrders (state, action: PayloadAction<OrderSummaryDTO[]>) {
      state.orders = action.payload;
    },
    setOrderPagination (state, action: PayloadAction<any>) {
      state.orderPagination = action.payload;
    },
    setCustomers (state, action: PayloadAction<CustomerDTO[]>) {
      state.customers = action.payload;
    },
    setBuyers (state, action: PayloadAction<BuyerDTO[]>) {
      state.buyers = action.payload;
    },
    setProducts (state, action: PayloadAction<ProductDTO[]>) {
      state.products = action.payload;
    },
  },

  ////////////////////////////
  /// Extra Reducer Functions
  ////////////////////////////
  extraReducers: builder => {
    // Set loading parameter to true if item list not fetched yet
    builder.addCase(fetchCustomers.pending, state => {
      state.isLoading = true;
      console.log('customer pending');
    });

    // Set buyers parameter upon API call is finished
    builder.addCase(fetchBuyers.fulfilled, (state: any, action) => {
      state.buyers = action.payload;
    });

    // Set customers parameter upon API call is finished
    builder.addCase(fetchCustomers.fulfilled, (state: any, action) => {
      state.isLoading = false;
      state.customers = action.payload;
      console.log('customer completed');
    });

    builder.addCase(fetchCustomers.rejected, (state: any) => {
      state.isLoading = false;
      console.log('customer rejected');
    });

    // Set buyers parameter upon API call is finished
    builder.addCase(fetchProducts.fulfilled, (state: any, action) => {
      state.products = action.payload;
    });
  },
});
// -----------------------------------------------------------
// Order Store Slice Creation - END
// -----------------------------------------------------------

export const orderActions = orderSlice.actions;
export default orderSlice;
