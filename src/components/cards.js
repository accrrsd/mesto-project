// import { popupAddCard, popupAddCardName, popupAddCardForm, popupAddCardUrl, popupImagePicture, popupImageTitle, placeContainer, popupImage } from './variables.js'
// import { closePopup, openPopup } from './modal.js'
// import { toggleButtonBlock } from './validate'
// import { postCardOnServer, deleteServerCard, loadCardLikeOnServer } from './api.js'

// let myId

export default class Card {
  constructor(data, placeSettings, cardSelector, userData, openPopup, checkLike, deleteCard) {
    this._cardSelector = cardSelector;
    this._data = data;
    this._name = data.name;
    this._url = data.link;
    this._userData = userData;
    this._openPopup = openPopup;
    this._checkLike = checkLike;
    this._deleteCard = deleteCard;
    this._placeSettings = placeSettings;
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
   
    // this._element.querySelector('.place__image').src = this._url;
    // this._element.querySelector('.place__image').alt = this._name;
    // this._element.querySelector('.place__like-count').textContent = this._likes;

    this._placeTitle = this._element.querySelector(this._placeSettings.placeTitle);
    this._placeImage = this._element.querySelector(this._placeSettings.placeImage);
    this._placeLikeCount = this._element.querySelector(this._placeSettings.placeLikeCount);
    this._placeLike = this._element.querySelector(this._placeSettings.placeLike);
    this._placeTrash = this._element.querySelector(this._placeSettings.placeTrash);
    this._placeTitle.textContent = this._name;
    this._placeImage.src = this._url;
    this._placeImage.alt = this._name;
    this._placeTrash = this._element.querySelector(this._placeSettings.placeTrash);

    this.setLikesCount(this._data);
    this._setEventListeners();

    return this._element;

  }

  setLikesCount(data) {
    this._likes = data.likes.length;
    this._placeLikeCount.textContent = data.likes.length;

    if (data.likes.some((currentLike) => currentLike._id == this._userData._id) == true) {
        this._placeLike.classList.add('place__like_active');
    }
  }

  _deleteCard() {

  }

  _setEventListeners() {
    
    this._placeImage.addEventListener('click', () => {
      this._openPopup(this._url, this._name);
    })

    this._placeLike.addEventListener('click', () => {
      

      if (this._placeLike.classList.contains('place__like_active')) {
        this._checkLike('DELETE', this._data._id, this)
      }
      else {
        this._checkLike('PUT', this._data._id, this)
      }

      this._placeLike.classList.toggle('place__like_active');

      this.setLikesCount(this._data);
      
    })

    this._placeTrash.addEventListener('click', () => {
      this._deleteCard(this._data._id);
    })

    if (this._data._ownerId == this._userData._id) {
      this._placeTrash.style.display = 'block';
    }

    

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
