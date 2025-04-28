// lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost/mymovies_server/v1",
  timeout: 10000,
});
