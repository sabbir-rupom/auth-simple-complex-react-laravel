import { ResponseInterface } from '@/services/Axios';

export const convertDate = (date: Date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
};

export const convertDayJsDate = (date: any) => {
  let dt = new Date(date);
  dt.setDate(dt.getDate() + 1);
  let [year, month, day] = dt
    .toISOString()
    .substring(0, 10)
    .split('-')
    .map(x => parseInt(x, 10));
  let newDate = `${year}-${month}-${day}`;
  return newDate;
};

export const complexApiResult = (response: ResponseInterface) => {
  if (response.data) {
    return response.data;
  } else {
    console.log('Error occurred: ' + response.message);
  }
  return [];
};
