import Popup from './Popup'

export default class PopupWithSubmit extends Popup {
  constructor(selector) {
    super(selector)
  }
  setCallback(callback) {
    this._callback = callback
  }
  setSubmitListener() {
    if (this._callback) {
      this._element.addEventListener('submit', this._callback)
    }
  }
  removeSubmitListener() {
    if (this._callback) {
      this._element.removeEventListener('submit', this._callback)
      delete this._callback
    }
  }
}
