import { initialCards, popupAddCard, popupAddCardName, popupAddCardForm, popupAddCardUrl, popupImagePicture, popupImageTitle, placeContainer, popupImage} from "./variables.js";
import {closePopup, openPopup} from "./modal.js"


// Карточка
popupAddCardForm.addEventListener('submit', e => {
  e.preventDefault()
  const newPlace = createPlace(
    popupAddCardName.value,
    popupAddCardUrl.value,
    popupAddCardName.value
  )

  placeContainer.prepend(newPlace)

  closePopup(popupAddCard)
  popupAddCardName.value = ''
  popupAddCardUrl.value = ''
})


// Создание карточки
function createPlace(name, url, alt) {
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
  // Лайк
  const likeButton = currentPlace.querySelector('.place__like')
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('place__like_active')
  })

  // Удалить
  const deletePlaceButton = currentPlace.querySelector('.place__trash')
  deletePlaceButton.addEventListener('click', () => {
    currentPlace.remove()
    return
  })
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
export function renderPlaces() {
  placeContainer.innerHTML = ''
  initialCards.forEach(card => {
    placeContainer.append(createPlace(card.name, card.link, card.name))
  })
}