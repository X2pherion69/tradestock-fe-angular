export const setTokenToLocalStorage = (token: string) =>
  localStorage.setItem('token', token);

export const getTokenFromLocalStorage = () => localStorage.getItem('token');

export const removeTokenFromLocalStorage = () =>
  localStorage.removeItem('token');
