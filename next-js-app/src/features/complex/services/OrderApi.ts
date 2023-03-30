import { callApi, ResponseInterface } from '@/common/services/Axios';

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

    if (data) {
      return data;
    } else {
      console.log('Error occurred: ' + message);
    }
    return null;
  },

  // Create new order
  create: async function (order: any) {
    const { result, message }: ResponseInterface = await callApi(
      'complex/orders',
      'post',
      order
    );

    if (!result) {
      console.log(message);
    }

    return result;
  },

  // Update order by ID
  update: async function (id: number, order: any) {
    const { result, message }: ResponseInterface = await callApi(
      'complex/orders/' + id,
      'put',
      order
    );

    if (!result) {
      console.log(message);
    }

    return result;
  },

  // Delete order by ID
  delete: async function (id: number) {
    let { result, message }: ResponseInterface = await callApi(
      'complex/orders/' + id,
      'delete'
    );

    if (result) {
      console.log('Success: ' + message);
    } else {
      console.log('Error occurred: ' + message);
    }

    return result;
  },
};

export default OrderApi;
