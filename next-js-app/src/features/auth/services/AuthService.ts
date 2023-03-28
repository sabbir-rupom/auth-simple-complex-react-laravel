import { callApi, ResponseInterface } from '@/common/services/Axios';

export const checkAuthentication = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userToken') ? true : false;
  } else {
    return false;
  }
};

export const clearSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userToken');
  }
};

export const getUserToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userToken');
  }

  return null;
};

export const saveUserToken = (token: string): boolean => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userToken', token);
    return true;
  }

  return false;
};

export const AuthApi = {
  // Request for user login
  login: async function (form: any) {
    let { data, message, result }: ResponseInterface = await callApi(
      'login',
      'post',
      form
    );

    console.log('calling Login API');

    if (result) {
      return data;
    } else {
      console.log('Error occurred: ' + message);
    }
    return null;
  },

  // Request for user registration
  registration: async function (form: any) {
    let { data, message, result }: ResponseInterface = await callApi(
      'register',
      'post',
      form
    );

    console.log('calling Registration API');

    if (result) {
      return data;
    } else {
      console.log('Error occurred: ' + message);
    }
    return null;
  },

  // Process user logout
  logout: async function () {
    let { result, message }: ResponseInterface = await callApi('logout', 'get');

    console.log('calling Items API');

    if (!result) {
      console.log('Error occurred: ' + message);
    }
    return result;
  },
};
