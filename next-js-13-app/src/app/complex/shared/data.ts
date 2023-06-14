export interface OrderProductDTO {
  id?: any;
  product: number | undefined;
  product_unit: number | undefined;
  product_category: number | undefined;
  quantity: number | undefined;
  unit_price: number | undefined;
}

export const defaultOrderProduct: OrderProductDTO = {
  id: 0,
  product: 0,
  product_unit: 0,
  product_category: 0,
  quantity: 1,
  unit_price: 0,
};

export type OrderDTO = {
  order_number: string;
  buyer: number;
  customer: number;
  customer_address: string;
  order_date: string;
  delivery_date: string;
  delivery_time: string;
  attachment: any;
  remark: string;
  order_products: OrderProductDTO[];
};

export const defaultOrderInput: OrderDTO = {
  order_number: '',
  buyer: 0,
  customer: 0,
  customer_address: '',
  order_date: new Date().toString(),
  delivery_date: new Date().toString(),
  delivery_time: '12:00',
  attachment: null,
  remark: '',
  order_products: [defaultOrderProduct],
};

export type OrderSummaryDTO = {
  buyer_name: string;
  customer_name: string;
  order_date: string;
  delivery_date: string;
  order_number: string;
  total_amount: number;
  created_by: string;
  attachment: null | string;
  id: number;
};

export type CustomerDTO = {
  id: number;
  name: string;
  locations: string[];
};

export type BuyerDTO = {
  id: number;
  name: string;
};

export type UnitDTO = {
  id: number;
  name: string;
  short: string;
};

export type CategoryDTO = {
  id: number;
  category_name: string;
};

export type ProductDTO = {
  id: number;
  sku: string;
  name: string;
  price: number;
  stock: number;
  units: UnitDTO[];
  categories: CategoryDTO[];
};

export type FilterDTO = {
  order_number?: string | null;
  customer?: number | null;
  buyer?: number | null;
  start_date?: string | null;
  end_date?: string | null;
};

export const defaultFilterParams: FilterDTO = {
  order_number: '',
  customer: 0,
  buyer: 0,
  start_date: null,
  end_date: null,
};
