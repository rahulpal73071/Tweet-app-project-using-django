import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:8000" });
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

export const getTweets = () => API.get("/api/twits/");
export const createTweet = (formData, token) =>
  API.post("/api/twits/", formData, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteTweet = (id, token) =>
  API.delete(`/api/twits/${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
