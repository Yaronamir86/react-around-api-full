//export const BASE_URL = "https://yaron-amir.students.nomoredomainssbs.ru";

class Auth {
  constructor({ url, headers }) {
    this.baseUrl = url;
    this.headers = headers;
  }

  _customFetch(url, headers) {
    return fetch(url, headers).then((res) => {
       res.ok ? res.json() : Promise.reject(res.statusText);
    });
  };

  register(email, password) {
    return this._customFetch(`${this.baseUrl}/signup`, {
      method: "POST",
      crossorigin: true,
        mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  }

  checkToken(token) {
    return this._customFetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      crossorigin: true,
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  login(email, password) {
    return this._customFetch(`${this.baseUrl}/signin`, {
      method: "POST",
      crossorigin: true,
        mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((data) => {
      //localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("email", email);
      return data;
    });
  }
}
const auth = new Auth({
  url: "https://api.yaron-amir.students.nomoredomainssbs.ru",
  headers: { "Content-Type": "application/json" },
});

export default auth;