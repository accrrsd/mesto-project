export const popupImage = document.querySelector('.popup_type_image')
export const popupAddCard = document.querySelector('.popup_type_add-card')
export const popupProfile = document.querySelector('.popup_type_profile')

// Триггеры попапов
export const profileEditButton = document.querySelector('#profile-edit')
export const addCardButton = document.querySelector('#add-card')

// Профиль
export const profileTitle = document.querySelector('.profile__title')
export const profileSubtitle = document.querySelector('.profile__subtitle')

// Контейнер мест
export const placeContainer = document.querySelector('.places')

//Данные из попапов
// Профиль
export const popupProfileName = popupProfile.querySelector('input[name="name"]')
export const popupProfileSubname = popupProfile.querySelector('input[name="subname"]')
export const popupProfileForm = popupProfile.querySelector('form[name="profile-set"]')

// Карточка
export const popupAddCardName = popupAddCard.querySelector('input[name="image-name"]')
export const popupAddCardUrl = popupAddCard.querySelector('input[name="url"]')
export const popupAddCardForm = popupAddCard.querySelector('form[name="card-set"]')

// Картинка
export const popupImageTitle = popupImage.querySelector('.popup__title')
export const popupImagePicture = popupImage.querySelector('.popup__picture')

export const initialCards = [
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
