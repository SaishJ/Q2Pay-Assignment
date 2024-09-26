import {axiosInstance} from './instance';

const api: any = {};

api.productList = async () => await axiosInstance.get('/products');

api.productDetails = async (id: number) =>
  await axiosInstance.get(`/products/${id}`);

export default api;
