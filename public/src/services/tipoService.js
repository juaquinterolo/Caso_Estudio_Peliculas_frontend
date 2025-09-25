import apiClient from './api';

export const getTipos = () => apiClient.get('/tipos');
export const createTipo = (data) => apiClient.post('/tipos', data);
export const updateTipo = (id, data) => apiClient.put(`/tipos/${id}`, data);
export const deleteTipo = (id) => apiClient.delete(`/tipos/${id}`);