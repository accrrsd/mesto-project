import './styles/index.css'
import { profileEditButton, profileTitle, profileSubtitle, profileAvatar, addCardButton, popupAddCard, popupAvatar } from './components/variables.js'
// import { openPopup } from './components/modal.js'
import { enableValidation } from './components/validate.js'
import { getId, renderPlaces } from './components/cards'
// import { openProfilePopup } from './components/profile'
import { getProfileFromServer, getCardsFromServer } from './components/api'

// Объекты
import { profilePopupObject } from './components/ProfilePopup.js'
import { avatarPopupObject } from './components/AvatarPopup'

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_invalid',
  errorClass: 'form__field-error_active',
}

// Включение валидации
enableValidation(validationSettings)

// Ивенты открытия попапов
profileEditButton.addEventListener('click', () => {
  profilePopupObject.open()
})

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard)
})

profileAvatar.addEventListener('click', () => {
  avatarPopupObject.open()
})

// Запрос карточек и данных с сервера
Promise.all([getProfileFromServer(), getCardsFromServer()])
  .then(([profileData, cardsArray]) => {
    // Установка данных пользователя
    profileTitle.textContent = profileData.name
    profileSubtitle.textContent = profileData.about
    profileAvatar.src = profileData.avatar
    getId(profileData._id)
    // Отрисовка карт
    renderPlaces(cardsArray)
  })
  .catch((err) => {
    console.log(err)
  })
