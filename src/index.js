import './styles/index.css'

// Импорты классов
import PopupWithForm from './components/PopupWithForm'
import UserInfo from './components/UserInfo'
import FormValidator from './components/FormValidator'
import Api from './components/api'
import Card from './components/cards'
import Section from './components/Section'
import PopupWithImage from './components/PopupWithImage'

// Формы попапов
import { popupProfileForm, popupAvatarForm, popupAddCardForm } from './components/variables.js'
// Данные попапаПрофиля
import { popupProfileName, popupProfileSubname } from './components/variables.js'
// ЭвентЛистенеры
import { profileEditButton, profileAvatar, addCardButton } from './components/variables.js'
// Данные об аккаунте
import { token, baseUrlAddress } from './components/variables.js'

//Селекторы
const cardSelector = '#place-template';
const popupImageSelector = '.popup_type_image';
const placesSelector = '.places';

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

const userInfoLogic = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar')

// Получаем данные о профиле с сервера
let userData
userInfoLogic
  .getUserInfo(api)
  .then((data) => {
    userInfoLogic.setUserInfo(data)
    userInfoLogic.setUserAvatar(data)
    userData = data
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

const cardPopupLogic = new PopupWithForm('.popup_type_add-card', (evt, values) => {
  //Калбек
  //Для завершения необходим переработанный объект карт и секции.
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

// Проставляем слушатели закрытия
profilePopupLogic.setEventListeners()
avatarPopupLogic.setEventListeners()
cardPopupLogic.setEventListeners()

// Проставляем слушатели открытия
profileEditButton.addEventListener('click', () => {
  profilePopupLogic.open()
  popupProfileName.value = sessionStorage.getItem('popupProfileName')
  popupProfileSubname.value = sessionStorage.getItem('popupProfileAbout')
})
addCardButton.addEventListener('click', cardPopupLogic.open.bind(cardPopupLogic))
profileAvatar.addEventListener('click', avatarPopupLogic.open.bind(avatarPopupLogic))

//Карточки

const cardsArray = new Section({
  renderer: (data) => {
    const card = createNewCard(data);
    const cardElement = card.createPlace();
    cardsArray.addItem(cardElement);
  }
}, placesSelector);

const createNewCard = (data) => {
  const card = new Card(data, placeSettings, cardSelector, userData, openPopup, checkLike, deleteCard )
  return card
}

const popupImage = new PopupWithImage(popupImageSelector);
function openPopup(name, link,src) {
  popupImage.open(name, link,src)
}

function checkLike (methodName, cardId, card) {
  api.loadCardLikeOnServer(methodName, cardId) 
  .then((data) => {
    card.setLikesCount(data);
  })
  .catch((err) => {
    console.log(err);
  })
}

function deleteCard (id, element) {
  api.deleteServerCard(id).then(() => {
    element.remove();   
  }); 
}

api.getCardsFromServer()
  .then((res) => {
    cardsArray.renderCards(res)
  })
  .catch((err) => console.log(err))





 
// Запрос карточек и данных с сервера
// Promise.all([getProfileFromServer(), getCardsFromServer()])
//   .then(([profileData, cardsArray]) => {
//     // Установка данных пользователя
//     profileTitle.textContent = profileData.name
//     profileSubtitle.textContent = profileData.about
//     profileAvatar.src = profileData.avatar
//     getId(profileData._id)
//     // Отрисовка карт
//     renderPlaces(cardsArray)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
