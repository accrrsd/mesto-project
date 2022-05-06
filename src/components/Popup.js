export default class Popup {
  constructor(selector) {
    this._element = this._getElement(selector)
    this._handleCloseKey = this._handleCloseKey.bind(this)
  }

  open() {
    this._element.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleCloseKey)
  }

  close() {
    this._element.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleCloseKey)
  }

  setEventListeners() {
    this._element.addEventListener('click', (e) => {
      if (e.target === this._element || e.target.classList.contains('popup__close')) {
        this.close()
      }
    })
  }

  _getElement(selector, parentElem) {
    return parentElem ? parentElem.querySelector(selector) : document.querySelector(selector)
  }

  _handleCloseKey(e) {
    if (e.key === 'Escape') {
      this.close()
    }
  }
}
