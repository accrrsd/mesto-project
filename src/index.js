import './styles/index.css';
import {profileEditButton, popupProfile, addCardButton, popupAddCard} from './components/variables.js';
import {openPopup} from './components/modal.js';
import {enableValidation} from './components/validate.js';
import {renderPlaces} from './components/cards';
import {openProfilePopup} from './components/profile'

const validationSettings={
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_invalid',
  errorClass: 'form__field-error_active'
}

// Включение валидации
enableValidation(validationSettings)

// Ивенты открытия попапов
profileEditButton.addEventListener('click', () => {
  openProfilePopup()
})

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard)
})

// Отрисовка карточек
renderPlaces()