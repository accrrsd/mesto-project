import { Popup } from './Popup'
export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this._image = this._element.querySelector('.popup__picture')
    this._imageTitle = this._element.querySelector('.popup__title')
  }
  open(src, textContent, alt) {
    super.open()
    this._image.src = src
    this._image.alt = alt
    this._imageTitle.textContent = textContent
  }
}
