import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/',
});

export {axiosInstance};
