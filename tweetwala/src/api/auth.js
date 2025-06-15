import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

// Auth endpoints
export const register = (userData) => API.post("/auth/users/", userData);
export const login = (data) => API.post("/auth/token/login/", data);
export const logout = (token) =>
  API.post("/auth/token/logout/", null, {
    headers: { Authorization: `Token ${token}` },
  });