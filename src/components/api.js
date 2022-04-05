// Токен и ид
export const cohortId = 'plus-cohort-8'
export const token = '749be577-3087-4ee3-ace3-b4e48a9a8c49'
export const serverAddress = 'https://mesto.nomoreparties.co'
export const baseUrlAddress = `${serverAddress}/v1/${cohortId}/`

/**
 *
 * @param {url} specifyUrl Уточняющая ссылка
 * @param {name} configType Имя типа конфига
 * @param {body} inBody Тело операции
 * @returns
 */

export const buildFetchData = (specifyUrl, configType, inBody) => {
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

  if (inBody) {
    types[configType].body = JSON.stringify(inBody)
  }

  return fetch(baseUrlAddress + specifyUrl, types[configType])
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
      return res.json()
    })
    .catch((err) => console.log(err))
}
