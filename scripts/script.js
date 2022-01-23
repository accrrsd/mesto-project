const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

// Попапы
const popupImage = document.querySelector('.popup_type_image')
const popupAddCard = document.querySelector('.popup_type_add-card')
const popupProfile = document.querySelector('.popup_type_profile')

// Профиль
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

// Контейнер мест
const placeContainer = document.querySelector('.places')

// #region Данные из попапов
// Профиль
const popupProfileName = popupProfile.querySelector('input[name="name"]')
const popupProfileSubname = popupProfile.querySelector('input[name="subname"]')
const popupProfileForm = popupProfile.querySelector('form[name="profile-set"]')

// Карточка
const popupAddCardName = popupAddCard.querySelector('input[name="image-name"]')
const popupAddCardUrl = popupAddCard.querySelector('input[name="url"]')
const popupAddCardForm = popupAddCard.querySelector('form[name="card-set"]')

// Картинка
const popupImageTitle = popupImage.querySelector('.popup__title')
const popupImagePicture = popupImage.querySelector('.popup__picture')
//#endregion

// Триггеры
const profileEditButton = document.querySelector('#profile-edit')
const addCardButton = document.querySelector('#add-card')
const popupCloseButtons = document.querySelectorAll('.popup__close')

// Ивенты открытия
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile)
})

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard)
})

// Ивент закрытия
popupCloseButtons.forEach(close => {
  close.addEventListener('click', () => {
    closePopup(close.closest('.popup_opened'))
  })
})

//#region Евент принятия

// Профиль
popupProfileForm.addEventListener('submit', e => {
  e.preventDefault()
  profileTitle.textContent = popupProfileName.value
  profileSubtitle.textContent = popupProfileSubname.value

  closePopup(popupProfile)
})

// Карточка
popupAddCardForm.addEventListener('submit', e => {
  e.preventDefault()
  initialCards.unshift({
    name: popupAddCardName.value,
    link: popupAddCardUrl.value,
  })
  renderPlaces()

  closePopup(popupAddCard)
  popupAddCardName.value = ''
  popupAddCardUrl.value = ''
})
//#endregion

// Данные попапа профиля
popupProfileName.value = profileTitle.textContent
popupProfileSubname.value = profileSubtitle.textContent

// Открытие
function openPopup(popup) {
  popup.classList.add('popup_opened')
}

// Закрытие
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

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
function renderPlaces() {
  placeContainer.innerHTML = ''
  initialCards.forEach(card => {
    placeContainer.append(createPlace(card.name, card.link, card.name))
  })
}

renderPlaces()
