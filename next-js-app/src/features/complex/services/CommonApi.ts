import { callApi, ResponseInterface } from '@/common/services/Axios';
import { complexApiResult } from './Utility';

const CommonApi = {
  // Get product list from server
  products: async function () {
    let response: ResponseInterface = await callApi('complex/products', 'get');

    console.log('calling Products API');

    return complexApiResult(response);
  },

  // Get customer list from server
  customers: async function () {
    let response: ResponseInterface = await callApi('complex/customers', 'get');

    console.log('calling Customers API');

    return complexApiResult(response);
  },

  // Get buyer list from server
  buyers: async function () {
    let response: ResponseInterface = await callApi('complex/buyers', 'get');

    console.log('calling Buyers API');

    return complexApiResult(response);
  },
};

export default CommonApi;
