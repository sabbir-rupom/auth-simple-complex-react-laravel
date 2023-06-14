import { callApi, ResponseInterface } from '@/services/Axios';
import jsonToFormData from '@ajoelp/json-to-formdata';

const OrderApi = {
  // Get order list from server
  orders: async function (filter: object) {
    const asArray = Object.entries(filter);

    const params: any = asArray.filter(
      ([key, value]) => Boolean(value) === true
    );

    let { data, message, result, ...rest }: any = await callApi(
      'complex/orders?' + new URLSearchParams(params).toString(),
      'get',
      filter
    );

    console.log('calling Orders API');

    let orders = [],
      pagination = {
        links: null,
        meta: null,
      };

    if (data) {
      orders = data;
    } else {
      console.log('Error occurred: ' + message);
    }

    if (rest.links) {
      pagination.links = rest.links;
    }
    if (rest.meta) {
      pagination.meta = rest.meta;
    }

    return [orders, pagination, result];
  },

  // Get order detail by ID
  get: async function (id: number) {
    let { data, message }: ResponseInterface = await callApi(
      'complex/orders/' + id,
      'get'
    );

    return [data, message];
  },

  // Create new order
  create: async function (order: any) {
    const { result, message }: ResponseInterface = await callApi(
      'complex/orders',
      'post',
      jsonToFormData(order),
      true
    );

    return [result, message];
  },

  // Update order by ID
  update: async function (id: number, order: any) {
    order['_method'] = 'put';
    const { result, message, data }: ResponseInterface = await callApi(
      'complex/orders/' + id,
      'post',
      jsonToFormData(order),
      true
    );

    return [result, message, data];
  },

  // Delete order by ID
  delete: async function (id: number) {
    let { result, message }: ResponseInterface = await callApi(
      'complex/orders/' + id,
      'delete'
    );

    return [result, message];
  },

  // Delete order product by Order Product ID
  deleteOrderProduct: async function (id: number) {
    let { result, message }: ResponseInterface = await callApi(
      'complex/orders/products/' + id,
      'delete'
    );

    return [result, message];
  },
};

export default OrderApi;
