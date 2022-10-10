class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _customFetch = (url, headers) =>
    fetch(url, headers).then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  //.catch(console.log);

  getInitialCards() {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  editProfile({ name, about }) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  editAvatar(url) {
    return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: url,
      }),
    });
  }

  createCards(data) {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCards(cardId) {
    return this._customFetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "PUT",
      });
    } else {
      return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "DELETE",
      });
    }
  }
}

const api = new Api({
  baseUrl: "https://api.yaron-amir.students.nomoredomainssbs.ru",
});

export default api;
