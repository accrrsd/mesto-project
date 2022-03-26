import './styles/index.css';
import {profileEditButton, popupProfile, addCardButton, popupAddCard} from './components/variables.js';
import {openPopup} from './components/modal.js';
import {enableValidation} from './components/validate.js';
import {renderPlaces} from './components/cards';
import './components/profile'

// Включение валидации
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_invalid',
  errorClass: 'form__field-error_active'
})

// Ивенты открытия попапов
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile)
})

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard)
})

// Отрисовка карточек
renderPlaces()