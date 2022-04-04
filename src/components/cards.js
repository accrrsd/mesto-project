import { popupAddCard, popupAddCardName, popupAddCardForm, popupAddCardUrl, popupImagePicture, popupImageTitle, placeContainer, popupImage, findSubmitBtn, popupDelete, popupDeleteForm } from './variables.js'
import { closePopup, openPopup } from './modal.js'
import { toggleButtonBlock } from './validate'
import { buildFetchData } from './api'

const myId = '4d7df922d9711d87040b3058'

//!Не появляется ведро без обновления страницы

// Попап карточек
popupAddCardForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // Локальное создание карточки
  const submitBtn = findSubmitBtn(popupAddCardForm)
  submitBtn.textContent = 'Сохранение...'

  // Отправка карточки на сервер
  buildFetchData('cards', 'jsonPost', { name: popupAddCardName.value, link: popupAddCardUrl.value }).then((res) => {
    const newPlace = createPlace(res.name, res.link, res.name, res._id, res.owner._id, res.likes)
    placeContainer.prepend(newPlace)
    closePopup(popupAddCard)
    popupAddCardForm.reset()
    toggleButtonBlock(submitBtn, 'form__submit_disabled', true)
  })
})

// Создание карточки
function createPlace(name, url, alt, cardId, ownerId, likes) {
  // Шаблон
  const placeTemplate = document.querySelector('#place-template').content

  // Части карточка
  const place = placeTemplate.cloneNode(true)

  const currentPlace = place.querySelector('.place')
  const title = place.querySelector('.place__title')
  const image = place.querySelector('.place__image')

  // Наполнение карточки
  title.textContent = name
  image.src = url
  image.alt = alt ? alt : name

  // #region События карточки

  // Элемент лайка
  const likeButton = currentPlace.querySelector('.place__like')
  const likeCount = currentPlace.querySelector('.place__like-count')

  if (likes) {
    likeCount.textContent = likes.length
    // Проверка на уже поставленные лайки
    if (likes.length === 0) {
      likeCount.textContent = ''
    }
    if (likes.length > 0) {
      if (likes.find((like) => like._id === myId)) {
        likeButton.classList.add('place__like_active')
      }
    }
  }

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('place__like_active')

    // Отправляем или удаляем лайк с сервера
    const method = likeButton.classList.contains('place__like_active') ? 'jsonPut' : 'jsonDelete'
    buildFetchData(`cards/likes/${cardId}`, method).then(() => {
      buildFetchData('cards', 'jsonGet').then((serverCards) => {
        // Получаем обновленные данные с сервера
        const equalCard = serverCards.find((card) => card._id === cardId)
        likeCount.textContent = equalCard.likes.length
      })
    })
  })
  // Удалить
  if (ownerId === myId) {
    const deletePlaceButton = currentPlace.querySelector('.place__trash')
    deletePlaceButton.style.display = 'block'
    deletePlaceButton.addEventListener('click', () => {
      openPopup(popupDelete)
      popupDeleteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const submitBtn = findSubmitBtn(popupDelete)
        submitBtn.textContent = 'Удаление...'

        // Удаляем конкретную карточку
        popupDelete.addEventListener('submit', deleteCard)
        popupDelete.params = cardId
        closePopup(popupDelete)
        function deleteCard(e) {
          const localCardId = e.currentTarget.params
          buildFetchData(`cards/${localCardId}`, 'jsonDelete').then(() => {
            currentPlace.remove()
            closePopup(popupDelete)
            submitBtn.textContent = 'Удалить'
            popupDelete.removeEventListener('submit', deleteCard)
          })
        }
      })
    })
  }
  // Открыть картинку
  image.addEventListener('click', () => {
    popupImagePicture.src = image.src
    popupImagePicture.alt = image.alt
    popupImageTitle.textContent = title.textContent

    openPopup(popupImage)
  })
  //#endregion

  return place
}

// Отрисовка мест
export function renderPlaces(massiveCards) {
  placeContainer.innerHTML = ''
  massiveCards.forEach((card) => {
    // console.log(card)
    placeContainer.append(createPlace(card.name, card.link, card.name, card._id, card.owner._id, card.likes))
  })
}
