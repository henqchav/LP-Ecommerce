import { axios } from '../utils/requestUtils';

export const getOrders = () => {
  return axios.get('/orders')
    .then(response => response.data);
};

export const getOrderByCode = (orderCode) => {
  return axios.get(`/orders/by_code/${orderCode}`)
    .then(response => response.data);
};

export const createOrder = (orderData) => {
  return axios.post('/orders', orderData)
    .then(response => response.data);
};

export const deleteOrder = (orderId) => {
  return axios.delete(`/orders/${orderId}`)
    .then(response => response.status === 204);
};

export const changeOrder = async (orderId, status) => {
  
  const response = await axios.put(`/orders/${orderId}`, {
    status: status,
  });
  console.log(response.data)
  return response.data;
};