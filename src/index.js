import './styles/index.css'

// Импорты классов
import Api from './components/Api'
import UserInfo from './components/UserInfo'
import Section from './components/Section'
import Card from './components/Cards'
import FormValidator from './components/FormValidator'
import PopupWithForm from './components/PopupWithForm'
import PopupWithImage from './components/PopupWithImage'
import PopupWithSubmit from './components/PopupWithSubmit'

// Формы попапов
import { popupProfileForm, popupAvatarForm, popupAddCardForm } from './components/utils/constants'
// Данные попапаПрофиля
import { popupProfileName, popupProfileSubname } from './components/utils/constants'
// ЭвентЛистенеры
import { profileEditButton, profileAvatar, addCardButton } from './components/utils/constants'
// Данные об аккаунте
import { token, baseUrlAddress } from './components/utils/constants'
//Селекторы
import { cardSelector, popupImageSelector, placesSelector, popupSubmitSelector } from './components/utils/constants'

// Настройки
const apiOptions = {
  baseUrl: baseUrlAddress,
  token: token,
}

const api = new Api(apiOptions)

const placeSettings = {
  placeTitle: '.place__title',
  placeImage: '.place__image',
  placeLikeCount: '.place__like-count',
  placeLike: '.place__like',
  placeTrash: '.place__trash',
}

const validationSettings = {
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__field_invalid',
  errorClass: 'form__field-error_active',
}

// Создание и активация валидаторов
const profileValidator = new FormValidator(validationSettings, popupProfileForm)
const cardValidator = new FormValidator(validationSettings, popupAddCardForm)
const avatarValidator = new FormValidator(validationSettings, popupAvatarForm)

profileValidator.enableValidation()
cardValidator.enableValidation()
avatarValidator.enableValidation()

// Создание логики данных пользователя
const userInfoLogic = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar')

// Получаем данные с сервера
let userData
userInfoLogic
  .getUserInfo(api)
  .then((data) => {
    userInfoLogic.setUserInfo(data)
    userInfoLogic.setUserAvatar(data)
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
const profilePopupLogic = new PopupWithForm('.popup_type_profile', (evt, values) => {
  const submitBtn = evt.submitter
  submitBtn.textContent = 'Сохранение...'
  userInfoLogic
    .setUserInfo(values, api)
    .then((data) => {
      profilePopupLogic.close()
      sessionStorage.setItem('popupProfileName', data.name)
      sessionStorage.setItem('popupProfileAbout', data.about)
      profileValidator.toggleButtonBlock(submitBtn, true)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitBtn.textContent = 'Сохранить'
    })
})
// Логика попапа создания карты
const cardPopupLogic = new PopupWithForm('.popup_type_add-card', (evt, values) => {
  const submitBtn = evt.submitter
  submitBtn.textContent = 'Сохранение...'
  api
    .postCardOnServer(values)
    .then((data) => {
      cardPopupLogic.close()
      cardValidator.toggleButtonBlock(submitBtn, true)

      const card = createNewCard(data)
      const cardElement = card.createPlace()
      cardsArray.addItem(cardElement, 'prepend')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      submitBtn.textContent = 'Сохранить'
    })
})
// Отправляем данные об аватарке на сервер
const avatarPopupLogic = new PopupWithForm('.popup_type_avatar-edit', (evt, values) => {
  const submitBtn = evt.submitter
  submitBtn.textContent = 'Сохранение...'
  userInfoLogic
    .setUserAvatar(values, api)
    .then(() => {
      avatarPopupLogic.close()
      avatarValidator.toggleButtonBlock(submitBtn, true)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitBtn.textContent = 'Сохранить'
    })
})

// Логика попапа подтверждения удаления карты
const popupSubmitDeleteCard = new PopupWithSubmit(popupSubmitSelector)
// Логика попапа открытия картинки
const cardImagePopup = new PopupWithImage(popupImageSelector)

// Проставляем слушатели закрытия
profilePopupLogic.setEventListeners()
avatarPopupLogic.setEventListeners()
cardPopupLogic.setEventListeners()
popupSubmitDeleteCard.setEventListeners()
cardImagePopup.setEventListeners()

// Проставляем слушатели открытия
profileEditButton.addEventListener('click', () => {
  profilePopupLogic.open()
  popupProfileName.value = sessionStorage.getItem('popupProfileName')
  popupProfileSubname.value = sessionStorage.getItem('popupProfileAbout')
})
addCardButton.addEventListener('click', cardPopupLogic.open.bind(cardPopupLogic))
profileAvatar.addEventListener('click', avatarPopupLogic.open.bind(avatarPopupLogic))

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
  const card = new Card(data, placeSettings, cardSelector, userData, openPopup, checkLike, deleteCard, popupSubmitDeleteCard)
  return card
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
  return api.deleteServerCard(id).then(() => {
    element.remove()
  })
}
