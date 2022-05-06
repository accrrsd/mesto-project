export default class Card {
  constructor(data, placeSettings, cardSelector, userData, openPopup, checkLike, deleteCard, submitDelete, callback) {
    this._cardSelector = cardSelector
    this._data = data
    this._name = data.name
    this._url = data.link
    this._userData = userData
    this._openPopup = openPopup
    this._checkLike = checkLike
    this._deleteCard = deleteCard
    this._placeSettings = placeSettings
    this._submitDelete = submitDelete
    this._callback = callback
  }

  _getCardElement() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.place').cloneNode(true)
    return cardElement
  }

  getOwnerId(id) {
    this._ownerId = id
  }

  createPlace() {
    this._element = this._getCardElement()

    this._placeTitle = this._element.querySelector(this._placeSettings.placeTitle)
    this._placeImage = this._element.querySelector(this._placeSettings.placeImage)
    this._placeLikeCount = this._element.querySelector(this._placeSettings.placeLikeCount)
    this._placeLike = this._element.querySelector(this._placeSettings.placeLike)
    this._placeTrash = this._element.querySelector(this._placeSettings.placeTrash)
    this._placeTitle.textContent = this._name
    this._placeImage.src = this._url
    this._placeImage.alt = this._name
    this._placeTrash = this._element.querySelector(this._placeSettings.placeTrash)

    this.setLikesCount(this._data)
    this._setEventListeners()

    return this._element
  }

  setLikesCount(data) {
    this._likes = data.likes.length
    this._placeLikeCount.textContent = data.likes.length > 0 ? data.likes.length : ''

    if (data.likes.some((currentLike) => currentLike._id == this._userData._id) == true) {
      this._placeLike.classList.add('place__like_active')
    } else {
      this._placeLike.classList.remove('place__like_active')
    }
  }

  _setEventListeners() {
    this._placeImage.addEventListener('click', () => {
      this._openPopup(this._url, this._name)
    })

    this._placeLike.addEventListener('click', () => {
      if (this._placeLike.classList.contains('place__like_active')) {
        this._checkLike('DELETE', this._data._id, this)
      } else {
        this._checkLike('PUT', this._data._id, this)
      }
    })

    this._placeTrash.addEventListener('click', () => {
      // Очищаем от прошлых значений
      this._submitDelete.removeSubmitListener()

      this._submitDelete.cardId = this._data._id
      this._submitDelete.cardElem = this._element
      this._submitDelete.setCallback(this._callback)
      this._submitDelete.setSubmitListener()
      this._submitDelete.open()
    })

    if (this._data.owner._id == this._userData._id) {
      this._placeTrash.style.display = 'block'
    }
  }
}
