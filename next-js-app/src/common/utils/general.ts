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
