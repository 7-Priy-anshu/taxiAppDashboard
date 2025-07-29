import axios from "axios";
const BASE_URL = import.meta.env.VITE_API;

export const getApi = async (url, config) => {
  const res = await axios.get(`${BASE_URL}${url}`, config);
  return res;
};

export const getApiAuth = async (url, config = {}) => {
  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
  const res = await axios.get(`${BASE_URL}${url}`, {
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const postApi = async (url, payload, config = {}) => {
  const res = await axios.post(`${BASE_URL}${url}`, payload, config);
  return res;
};

export const postApiAuth = async (url, payload, config = {}) => {
  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

  const res = await axios.post(`${BASE_URL}${url}`, payload, {
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};


export const postApiFormData = async (url, formData, config = {}) => {
  const res = await axios.post(`${BASE_URL}${url}`, formData, config);
  return res;
};

export const postApiAuthFormData = async (url, formData, config = {}) => {
  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

  const res = await axios.post(`${BASE_URL}${url}`, formData, {
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

