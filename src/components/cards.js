// import { popupAddCard, popupAddCardName, popupAddCardForm, popupAddCardUrl, popupImagePicture, popupImageTitle, placeContainer, popupImage } from './variables.js'
// import { closePopup, openPopup } from './modal.js'
// import { toggleButtonBlock } from './validate'
// import { postCardOnServer, deleteServerCard, loadCardLikeOnServer } from './api.js'

// let myId

export default class Card {
  constructor(data, cardSelector, openPopup, checkLike, deleteCard) {
    this._cardSelector = cardSelector;
    this._data = data;
    this._name = data.name;
    this._url = data.url;
    this._likes = data.likes;
    this._openPopup = openPopup;
    this._checkLike = checkLike;
    this._deleteCard = deleteCard;
    // this
  }

  _getCardElement() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  }

  getOwnerId(id){
    this._ownerId = id;
  }

  createPlace() {
    this._element = this._getCardElement();
    this._element.querySelector('.place__title').textContent = this._name;
    this._element.querySelector('.place__image').src = this._url;
    this._element.querySelector('.place__image').alt = this._name;
    this._element.querySelector('.place__like-count').textContent = this._likes;

    this._setEventListeners();

  }

  _setEventListeners() {
    // ------
    this._image = this._element.querySelector('.place__image');
    this._image.addEventListener('click', () => {
      this._openPopup(this._url, this._name);
    })

    // -------
    this._likeCount = this._element.querySelector('.place__like-count')
    this._like = this._element.querySelector('.place__like'); 
    this._like.addEventListener('click', () => {
      this._like.classList.toggle('place__like_active');

      if (this._like.classList.contains('place__like_active')) {
        this._checkLike('DELETE', this._data._cardId)
      }
      else {
        this._checkLike('PUT', this._data._cardId)
      }
      
    })

    //---------
    this._trash = this._element.querySelector('.place__trash');
    this._trash.addEventListener('click', () => {
      this._deleteCard(this._data._cardId);
    })
  }

}

// Попап карточек
// popupAddCardForm.addEventListener('submit', (e) => {
//   e.preventDefault()
//   // Локальное создание карточки
//   const submitBtn = e.submitter
//   submitBtn.textContent = 'Сохранение...'

//   // Отправка карточки на сервер
//   postCardOnServer({ name: popupAddCardName.value, link: popupAddCardUrl.value })
//     .then((res) => {
//       const newPlace = createPlace(res.name, res.link, res.name, res._id, res.owner._id, res.likes)
//       placeContainer.prepend(newPlace)
//       closePopup(popupAddCard)
//       popupAddCardForm.reset()
//       toggleButtonBlock(submitBtn, 'form__submit_disabled', true)
//     })
//     .catch((err) => console.log(err))
//     .finally(() => {
//       submitBtn.textContent = 'Сохранить'
//     })
// })

// Создание карточки
// function createPlace(name, url, alt, cardId, ownerId, likes) {
//   // Шаблон
//   const placeTemplate = document.querySelector('#place-template').content

//   // Части карточка
//   const place = placeTemplate.cloneNode(true)

//   const currentPlace = place.querySelector('.place')
//   const title = place.querySelector('.place__title')
//   const image = place.querySelector('.place__image')

//   // Наполнение карточки
//   title.textContent = name
//   image.src = url
//   image.alt = alt ? alt : name

  // #region События карточки

  // Элемент лайка
  // const likeButton = currentPlace.querySelector('.place__like')
  // const likeCount = currentPlace.querySelector('.place__like-count')

  // if (likes) {
  //   // Проверка на уже поставленные лайки
  //   if (likes.length > 0) {
  //     likeCount.textContent = likes.length
  //     if (likes.find((like) => like._id === myId)) {
  //       likeButton.classList.add('place__like_active')
  //     }
  //   }
  // }

  // likeButton.addEventListener('click', () => {
  //   // Отправляем или удаляем лайк с сервера
  //   // Обратный метод, т.к сначала мы отправляем, а потом переключаем
  //   const method = likeButton.classList.contains('place__like_active') ? 'jsonDelete' : 'jsonPut'

  //   loadCardLikeOnServer(method, cardId)
  //     .then((res) => {
  //       likeButton.classList.toggle('place__like_active')
  //       likeCount.textContent = res.likes.length > 0 ? res.likes.length : ''
  //     })
  //     .catch((err) => console.log(err))
  // })
  // Удалить
  // if (ownerId === myId) {
  //   const deletePlaceButton = currentPlace.querySelector('.place__trash')
  //   deletePlaceButton.style.display = 'block'
  //   deletePlaceButton.addEventListener('click', () => {
  //     deleteServerCard(cardId)
  //       .then(() => {
  //         currentPlace.remove()
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   })
  // }
  // Открыть картинку
  // image.addEventListener('click', () => {
  //   popupImagePicture.src = image.src
  //   popupImagePicture.alt = image.alt
  //   popupImageTitle.textContent = title.textContent

  //   openPopup(popupImage)
  // })
  //#endregion

  // return place
// }

// Техническая функция, если ID присваивать напрямую - будет странная ошибка с Babel
// export function getId(idHandler) {
//   myId = idHandler
// }

// Отрисовка мест
// export function renderPlaces(cardArray) {
//   placeContainer.innerHTML = ''
//   cardArray.forEach((card) => {
//     // console.log(card)
//     placeContainer.append(createPlace(card.name, card.link, card.name, card._id, card.owner._id, card.likes))
//   })
// }
