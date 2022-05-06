import Popup from './Popup'

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector)
    this._callback = callback
    this._form = this._getElement('form', this._element)
    this._inputList = this._form.querySelectorAll('input')
  }

  _getInputValues() {
    const result = {}
    this._inputList.forEach((input) => {
      result[input.name] = input.value
    })
    return result
  }

  setEventListeners() {
    super.setEventListeners()
    this._element.addEventListener('submit', (e) => {
      e.preventDefault()
      this._submitButton = e.submitter
      const initialText = this._submitButton.textContent
      this._submitButton.textContent = 'Сохранение...'
      this._callback(this._getInputValues())
        .then(() => {
          this.close()
        })
        .finally(() => {
          this._submitButton.textContent = initialText
        })
    })
  }

  close() {
    super.close()
    this._form.reset()
  }
}
