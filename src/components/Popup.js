export default class Popup {
  constructor(selector) {
    // this._selector = String(selector)
    this._element = this._getElement(selector)
  }

  open() {
    this._element.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleCloseKey.bind(this))
  }

  close() {
    this._element.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleCloseKey.bind(this))
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
      if (this._element.classList.contains('popup_opened')) {
        this.close()
      }
    }
  }
}
