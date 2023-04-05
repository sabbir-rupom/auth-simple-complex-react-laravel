import { getUserToken } from '@/features/auth/services/AuthService';
import axios from 'axios';
import { BASE_URL } from '../shared/data';

export interface ResponseInterface {
  data: object | null;
  message: string | null;
  result: boolean;
}

export const callApi = async (
  route: string,
  method: string = 'get',
  data: object = {},
  hasFile: boolean = false
) => {
  let api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
      Accept: 'application/json',
      'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
      // 'X-Requested-With': 'XMLHttpRequest',
    },
  });

  let response = null;

  try {
    if (method.toLowerCase() === 'get') {
      response = await api.get(route, data);
    } else if (method.toLowerCase() === 'put') {
      response = await api.put(route, data);
    } else if (method.toLowerCase() === 'delete') {
      response = await api.delete(route, data);
    } else {
      response = await api.post(route, data);
    }
  } catch (error: any) {
    return axiosData(error.response);
  }

  return axiosData(response);
};

export const axiosData = (response: any): ResponseInterface => {
  let resData = response.data;

  if (resData) {
    if (resData.result) {
      return resData;
    } else {
      return {
        data: null,
        message: resData.message ?? 'Response error',
        result: false,
      };
    }
  } else {
    return {
      data: null,
      message: 'Response error',
      result: false,
    };
  }
};
