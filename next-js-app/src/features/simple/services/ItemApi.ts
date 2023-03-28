import { callApi, ResponseInterface } from '@/common/services/Axios';
import itemDTO from '../shared/data';

const ItemApi = {
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
  getAll: async function () {
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
  search: async function (search: string) {
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
  save: async function (item: itemDTO) {
    let url = 'simple/items' + (item.id > 0 ? `/${item.id}` : '');
    let method = item.id > 0 ? 'put' : 'post';

    const { result, message }: ResponseInterface = await callApi(
      url,
      method,
      item
    );

    if (!result) {
      console.log(message);
    }

    return result;
  },

  delete: async function (id: number) {
    let { result, message }: ResponseInterface = await callApi(
      'simple/items/' + id,
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

export default ItemApi;
