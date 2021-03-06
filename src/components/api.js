// Токен и ид
export const cohortId = 'plus-cohort-8'
export const token = '749be577-3087-4ee3-ace3-b4e48a9a8c49'
export const serverAddress = 'https://mesto.nomoreparties.co'
export const baseUrlAddress = `${serverAddress}/v1/${cohortId}/`

const jsonHeaders = { authorization: token, 'Content-Type': 'application/json' }
const types = {
  jsonGet: {
    method: 'GET',
    headers: jsonHeaders,
  },
  jsonPatch: {
    method: 'PATCH',
    headers: jsonHeaders,
  },
  jsonPost: {
    method: 'POST',
    headers: jsonHeaders,
  },
  jsonDelete: {
    method: 'DELETE',
    headers: jsonHeaders,
  },
  jsonPut: {
    method: 'PUT',
    headers: jsonHeaders,
  },
}

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const getCardsFromServer = () => {
  const type = types['jsonGet']
  return fetch(baseUrlAddress + 'cards', type).then(checkResponse)
}

export const postCardOnServer = (inBody) => {
  const type = types['jsonPost']
  type.body = JSON.stringify(inBody)
  return fetch(baseUrlAddress + 'cards', type).then(checkResponse)
}

export const deleteServerCard = (cardId) => {
  const type = types['jsonDelete']
  return fetch(baseUrlAddress + `cards/${cardId}`, type).then(checkResponse)
}

export const loadCardLikeOnServer = (method, cardId) => {
  const type = types[method]
  return fetch(baseUrlAddress + `cards/likes/${cardId}`, type).then(checkResponse)
}

export const getProfileFromServer = () => {
  const type = types['jsonGet']
  return fetch(baseUrlAddress + 'users/me', type).then(checkResponse)
}

export const loadProfileOnServer = (inBody) => {
  const type = types['jsonPatch']
  type.body = JSON.stringify(inBody)
  return fetch(baseUrlAddress + 'users/me', type).then(checkResponse)
}
export const loadAvatarOnServer = (inBody) => {
  const type = types['jsonPatch']
  type.body = JSON.stringify(inBody)
  return fetch(baseUrlAddress + 'users/me/avatar', type).then(checkResponse)
}
