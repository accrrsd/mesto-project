import { Popup } from './Popup'
export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this._image = this._getElement('.popup__picture', this._element)
    this._imageTitle = this._getElement('.popup__title', this._element)
  }
  open(src, textContent, alt) {
    super.open()
    this._image.src = src
    this._imageTitle.textContent = textContent
    if (alt) {
      this._image.alt = alt
    }
  }
}

// this._image = this._element.querySelector('.popup__picture')
// this._imageTitle = this._element.querySelector('.popup__title')
