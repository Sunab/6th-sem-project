import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const api1 = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
    },
    withCredentials: false,
});