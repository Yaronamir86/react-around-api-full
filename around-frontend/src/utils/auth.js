export const BASE_URL = "http://localhost:3000";

//let node_env = "production";

//let BASE_URL =
//  node_env === "production"
//    ? "https://api.yaron-amir.students.nomoredomainssbs.ru"
//    : "http://localhost:3000";

const customFetch = (url, headers) => {
  return fetch(url, headers).then(res =>
    res.ok ? res.json() : Promise.reject(res.statusText)
  );
};

export const register = (email, password) => {
  return customFetch(`${BASE_URL}/signup`, {
    method: "POST",
    crossorigin: true,
        mode: "no-cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
};

export const login = (email, password) => {
  return customFetch(`${BASE_URL}/signin`, {
    method: "POST",
    crossorigin: true,
        mode: "no-cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
};

export const checkToken = token => {
  return customFetch(`${BASE_URL}/users/me`, {
    method: "GET",
    crossorigin: true,
        mode: "no-cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};
