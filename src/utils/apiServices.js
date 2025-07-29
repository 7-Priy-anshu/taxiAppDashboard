import axios from "axios";
const BASE_URL = import.meta.env.VITE_API;

// Use for get request  
export const getApi = async (url, config) => {
  const res = await axios.get(`${BASE_URL}${url}`, config);
  return res;
};

// Use for Token Based get request  
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

// Use for Post request  
export const postApi = async (url, payload, config = {}) => {
  const res = await axios.post(`${BASE_URL}${url}`, payload, config);
  return res;
};

// Use for Token Based Post request  
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

// Use for Post request(for sending Images)
export const postApiFormData = async (url, formData, config = {}) => {
  const res = await axios.post(`${BASE_URL}${url}`, formData, config);
  return res;
};

// Use for token based Post request(for sending Images)
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

