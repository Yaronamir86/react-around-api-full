class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _customFetch(res) {
    return res.ok ? res.json() : Promise.reject(res.statusText)
  }

  getInitialCards(token) {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(token)}`,
      },
    });
  }

  getUserInfo(token) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(token)}`,
      },
    });
  }

  editProfile({ name, about }, token) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(token)}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  editAvatar(url, token) {
    return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(token)}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar: url,
      }),
    });
  }

  createCards(data, token) {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(token)}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCards(cardId, token) {
    return this._customFetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(token)}`,
      },
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(token)}`,
        },
        method: "PUT",
      });
    } else {
      return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(token)}`,
        },
        method: "DELETE",
      });
    }
  }
}

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;
