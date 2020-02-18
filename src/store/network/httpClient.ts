import axios from 'axios';
import { stringify } from 'qs';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  paramsSerializer: (params: object) =>
    stringify(params, {
      arrayFormat: 'comma'
    }),
  headers: {
    'Content-Type': 'application/json'
  },
  transformRequest: (data: {}) => {
    if (!data) {
      return data;
    }

    if (data instanceof FormData) {
      return data;
    }

    return JSON.stringify(data);
  }
});

export default httpClient;
