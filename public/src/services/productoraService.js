import api from './api';

export const getProductoras = () => api.get('/productoras');
export const createProductora = (data) => api.post('/productoras', data);
export const updateProductora = (id, data) => api.put(`/productoras/${id}`, data);
export const deleteProductora = (id) => api.delete(`/productoras/${id}`);
