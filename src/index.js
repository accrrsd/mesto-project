import './styles/index.css'

// Импорты классов
import Api from './components/Api'
import UserInfo from './components/UserInfo'
import Section from './components/Section'
import Card from './components/Card'
import FormValidator from './components/FormValidator'
import PopupWithForm from './components/PopupWithForm'
import PopupWithImage from './components/PopupWithImage'
import PopupWithSubmit from './components/PopupWithSubmit'

// Данные попапаПрофиля
import { popupProfileName, popupProfileSubname } from './components/utils/constants'
// ЭвентЛистенеры
import { profileEditButton, profileAvatar, addCardButton } from './components/utils/constants'
//Селекторы
import { cardSelector, popupImageSelector, placesSelector, popupSubmitSelector } from './components/utils/constants'
// Настройки
import { apiOptions, placeSettings, validationSettings } from './components/utils/constants'

const api = new Api(apiOptions)
const formValidators = {}

// Создание и активация валидаторов
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.parentNode.getAttribute('name')
    formValidators[formName] = validator
    validator.enableValidation()
  })
}
enableValidation(validationSettings)

// Создание логики данных пользователя
const userInfoLogic = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar')

// Получаем данные с сервера
let userData
api
  .getProfileFromServer()
  .then((data) => {
    userInfoLogic.setUserInfo(data)
    userData = data

    api
      .getCardsFromServer()
      .then((res) => {
        cardsArray.renderCards(res)
      })
      .catch((err) => console.log(err))
  })
  .catch((err) => {
    console.log(err)
    userData = {
      name: 'Жак-Ив Кусто',
      about: 'Исследователь океана',
    }
  })
  .finally(() => {
    sessionStorage.setItem('popupProfileName', userData.name)
    sessionStorage.setItem('popupProfileAbout', userData.about)
  })

// Отправляем данные о профиле на сервер
const profilePopupLogic = new PopupWithForm('.popup_type_profile', (values) => {
  return api
    .loadProfileOnServer(values)
    .then((data) => {
      userInfoLogic.setUserInfo(data)
      sessionStorage.setItem('popupProfileName', data.name)
      sessionStorage.setItem('popupProfileAbout', data.about)
    })
    .catch((err) => console.log(err))
})
// Логика попапа создания карты
const cardPopupLogic = new PopupWithForm('.popup_type_add-card', (values) => {
  return api
    .postCardOnServer(values)
    .then((data) => {
      const card = createNewCard(data)
      const cardElement = card.createPlace()
      cardsArray.addItem(cardElement, 'prepend')
    })
    .catch((err) => {
      console.log(err)
    })
})
// Отправляем данные об аватарке на сервер
const avatarPopupLogic = new PopupWithForm('.popup_type_avatar-edit', (values) => {
  return api
    .loadAvatarOnServer(values)
    .then((data) => {
      userInfoLogic.setUserInfo(data)
    })
    .catch((err) => console.log(err))
})

// Логика попапа подтверждения удаления карты
const popupSubmitDeleteCard = new PopupWithSubmit(popupSubmitSelector)

// Логика попапа открытия картинки
const cardImagePopup = new PopupWithImage(popupImageSelector)

// Проставляем слушатели закрытия
profilePopupLogic.setEventListeners()
avatarPopupLogic.setEventListeners()
cardPopupLogic.setEventListeners()
cardImagePopup.setEventListeners()
popupSubmitDeleteCard.setEventListeners()

// Проставляем слушатели открытия
profileEditButton.addEventListener('click', () => {
  formValidators['profile-set'].resetValidationState()
  profilePopupLogic.open()
  popupProfileName.value = sessionStorage.getItem('popupProfileName')
  popupProfileSubname.value = sessionStorage.getItem('popupProfileAbout')
})
addCardButton.addEventListener('click', () => {
  formValidators['card-set'].resetValidationState()
  cardPopupLogic.open()
})
profileAvatar.addEventListener('click', () => {
  formValidators['avatar-set'].resetValidationState()
  avatarPopupLogic.open()
})

//Карточки
const cardsArray = new Section(
  {
    renderer: (data) => {
      const card = createNewCard(data)
      const cardElement = card.createPlace()
      cardsArray.addItem(cardElement)
    },
  },
  placesSelector
)

const createNewCard = (data) => {
  const card = new Card(data, placeSettings, cardSelector, userData, openPopup, checkLike, deleteCard, popupSubmitDeleteCard, deleteCardCallback)
  return card
}

const deleteCardCallback = (e) => {
  e.preventDefault()
  const submitBtn = e.submitter
  const initText = submitBtn.textContent
  submitBtn.textContent = 'Удаление...'
  return deleteCard(popupSubmitDeleteCard.cardId, popupSubmitDeleteCard.cardElem)
    .then(() => {
      popupSubmitDeleteCard.close()
      delete popupSubmitDeleteCard.cardId
      delete popupSubmitDeleteCard.cardElem
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      submitBtn.textContent = initText
    })
}

function openPopup(name, link, src) {
  cardImagePopup.open(name, link, src)
}

function checkLike(methodName, cardId, card) {
  api
    .loadCardLikeOnServer(methodName, cardId)
    .then((data) => {
      card.setLikesCount(data)
    })
    .catch((err) => {
      console.log(err)
    })
}

function deleteCard(id, element) {
  return api
    .deleteServerCard(id)
    .then(() => {
      element.remove()
    })
    .catch((err) => {
      console.log(err)
    })
}
