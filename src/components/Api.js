export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = {
      authorization: options.token,
      'Content-Type': 'application/json',
    }
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getProfileFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  getCardsFromServer() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  loadProfileOnServer(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse)
  }

  loadAvatarOnServer(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse)
  }

  loadCardLikeOnServer(methodName, cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: methodName,
      headers: this._headers,
    }).then(this._checkResponse)
  }

  postCardOnServer(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse)
  }

  deleteServerCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse)
  }
}
