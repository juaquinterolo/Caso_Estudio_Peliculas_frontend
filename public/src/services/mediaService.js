import api from "./api";

export const getMedia = () => api.get("/media");
export const createMedia = (data) => api.post("/media", data);
export const updateMedia = (id, data) => api.put(`/media/${id}`, data);
export const deleteMedia = (id) => api.delete(`/media/${id}`);
