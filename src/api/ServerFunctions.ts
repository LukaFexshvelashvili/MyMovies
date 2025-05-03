import { api } from "./axios";

export async function fetchQuickSearch(query: string) {
  const { data } = await api.get(`/actions/quick_search`, {
    params: { title: query },
  });
  return data;
}
export async function fetchSearch(filters: object) {
  const { data } = await api.get(`/actions/search`, {
    params: filters,
  });
  return data;
}
export async function fetchMovie(id: number) {
  const { data } = await api.get(`/movie/get`, {
    params: { id: id },
  });
  return data;
}

export async function fetchMoviesList(history?: string[]) {
  const { data } = await api.get("/list/home", {
    params: {
      watch_history: history ? JSON.stringify(history) : null,
    },
  });
  return data;
}
