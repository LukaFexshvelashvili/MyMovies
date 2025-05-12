import { api } from "./axios";
export async function add_comment(_: unknown, formData: FormData) {
  const movie_id = formData.get("movie_id");
  const user_id = formData.get("user_id");
  const reply_id = formData.get("reply_id") ? formData.get("reply_id") : null;
  const comment_input = formData.get("comment_input");
  const { data } = await api.post(
    `/actions/comment`,
    {
      movie_id,
      user_id,
      comment_input,
      reply_id,
    },
    {
      withCredentials: true,
    }
  );
  return data;
}
export async function loginRequest(_: unknown, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  const { data } = await api.post(
    `/auth/login`,
    {
      nickname: username,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return data;
}
export async function delete_comment(comment_id: number, user_id: number) {
  const { data } = await api.post(
    `/actions/delete_comment`,
    { comment_id, user_id },
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function getUser() {
  const { data } = await api.get(`/user/data`, {
    withCredentials: true,
  });
  return data;
}

export async function registerRequest(_: unknown, formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const repeat_password = formData.get("repeat_password");
  if (password !== repeat_password) {
    return { status: 3 };
  }
  const { data } = await api.post(`/auth/register`, {
    nickname: username,
    email,
    password,
  });
  return data;
}
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

export async function fetchMovies(filters: object) {
  const { data } = await api.get(`/actions/fetch`, {
    params: filters,
  });
  return data;
}
export async function fetchComments(params: object) {
  const { data } = await api.get(`/movie/get_comments`, {
    params,
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
