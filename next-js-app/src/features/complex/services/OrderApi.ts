import { callApi, ResponseInterface } from '@/common/services/Axios';

const OrderApi = {
  // Get order list from server
  orders: async function (filter: object) {
    let response: any = await callApi('complex/orders', 'get', filter);

    console.log('calling Orders API');

    let orders = [],
      pagination = {
        links: null,
        meta: null,
      };

    if (response.data) {
      orders = response.data;
    } else {
      console.log('Error occurred: ' + response.message);
    }

    if (response.links) {
      pagination.links = response.links;
    }
    if (response.meta) {
      pagination.meta = response.meta;
    }

    return [orders, pagination];
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
