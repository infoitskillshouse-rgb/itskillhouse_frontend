// utils/auth.js

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? { token } : null;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
