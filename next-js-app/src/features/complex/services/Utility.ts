import { ResponseInterface } from '@/common/services/Axios';

export const convertDate = (date: Date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
};

export const complexApiResult = (response: ResponseInterface) => {
  if (response.data) {
    return response.data;
  } else {
    console.log('Error occurred: ' + response.message);
  }
  return [];
};
