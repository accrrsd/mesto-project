export const popupImage = document.querySelector('.popup_type_image')
export const popupAddCard = document.querySelector('.popup_type_add-card')
export const popupProfile = document.querySelector('.popup_type_profile')
export const popupAvatar = document.querySelector('.popup_type_avatar-edit')
// Триггеры попапов
export const profileEditButton = document.querySelector('#profile-edit')
export const addCardButton = document.querySelector('#add-card')
export const profileAvatar = document.querySelector('.profile__avatar')

// Профиль
export const profileTitle = document.querySelector('.profile__title')
export const profileSubtitle = document.querySelector('.profile__subtitle')

// Контейнер мест
export const placeContainer = document.querySelector('.places')

//Данные из попапов
// Профиль
export const popupProfileName = popupProfile.querySelector('input[name="name"]')
export const popupProfileSubname = popupProfile.querySelector('input[name="about"]')
export const popupProfileForm = popupProfile.querySelector('form[name="profile-set"]')

// Карточка
export const popupAddCardName = popupAddCard.querySelector('input[name="name"]')
export const popupAddCardUrl = popupAddCard.querySelector('input[name="link"]')
export const popupAddCardForm = popupAddCard.querySelector('form[name="card-set"]')

// Картинка
export const popupImageTitle = popupImage.querySelector('.popup__title')
export const popupImagePicture = popupImage.querySelector('.popup__picture')

// Аватарка
export const popupAvatarUrl = popupAvatar.querySelector('input[name="avatar"]')
export const popupAvatarForm = popupAvatar.querySelector('form[name="avatar-set"]')

// Данные пользователя
export const cohortId = 'plus-cohort-8'
export const token = '749be577-3087-4ee3-ace3-b4e48a9a8c49'
export const serverAddress = 'https://mesto.nomoreparties.co'
export const baseUrlAddress = `${serverAddress}/v1/${cohortId}/`
