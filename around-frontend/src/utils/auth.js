export const BASE_URL = "http://localhost:3001";

//let node_env = "production";

//let BASE_URL =
//  node_env === "production"
//    ? "https://api.yaron-amir.students.nomoredomainssbs.ru"
//    : "http://localhost:3000";

const customFetch = (url, headers) => {
  return fetch(url, headers)
      .then((res) => {
          if (res.ok) {
              return res.json();
          } else {
              throw Error(res.statusText);
          }
      })
      .catch((err) => console.log(err));
};

export const register = (email, password) => {
  return customFetch(`${BASE_URL}/signup`, {
    method: "POST",
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
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
};

export const checkToken = (token) => {
  return customFetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};
