import { callApi, ResponseInterface } from '@/common/services/Axios';
import itemDTO from '../shared/data';

export const ItemApi = {
  // Get array of Item heads
  heads: async function () {
    let response: any = await callApi('simple/heads', 'get');

    console.log('calling Heads API');

    if (response.data) {
      return response.data;
    } else {
      console.log('Error occurred: ' + response.message);
    }
    return [];
  },

  // Get item details
  get: async function (id: number) {
    let { data, message }: ResponseInterface = await callApi(
      'simple/items/' + id,
      'get'
    );

    if (data) {
      return data;
    } else {
      console.log('Error occurred: ' + message);
    }
    return null;
  },

  // Get all items
  getAll: async function (cancel = false) {
    let { data, message }: ResponseInterface = await callApi(
      'simple/items',
      'get'
    );
    console.log('calling Items API');
    if (data) {
      return data;
    } else {
      console.log('Error occurred: ' + message);
    }
    return [];
  },

  // Search item list with keyword
  search: async function (search: string, cancel = false) {
    let { data, message }: ResponseInterface = await callApi(
      `simple/items/?term=${search}`,
      'get'
    );

    if (data) {
      return data;
    } else {
      console.log(message);
    }

    return [];
  },

  // Create or update item
  save: async function (item: itemDTO, cancel = false) {
    let url = 'simple/items' + (item.id > 0 ? `/${item.id}` : '');
    let method = item.id > 0 ? 'put' : 'post';

    const { result, data, message }: ResponseInterface = await callApi(
      url,
      method,
      item
    );

    if (!result) {
      console.log(message);
    }

    return result;
  },
};
