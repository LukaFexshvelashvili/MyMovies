// lib/axios.ts
import axios from "axios";
// baseURL: "http://mymoviesbeta.moviesgo.ge/server/v1",

export const api = axios.create({
  baseURL: "http://localhost/mymovies_server/v1",
  // baseURL: "http://mymoviesbeta.moviesgo.ge/server/v1",

  // baseURL: "http://api.mymovies.cc/v1",
  timeout: 10000,
});
