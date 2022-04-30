import Popup from './Popup'

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector)
    this._callback = callback
    this._form = this._getElement('form', this._element)
  }

  _getInputValues() {
    const valueArray = []
    this._form.querySelectorAll('input').forEach((input) => {
      const obj = {}
      obj[input.name] = input.value
      valueArray.push(obj)
    })
    return valueArray
  }

  setEventListeners() {
    super.setEventListeners()
    //На месте калбека - передаваемая функция, которая работает с апи и then
    this._element.addEventListener('submit', (e) => {
      e.preventDefault()
      const values = Object.fromEntries(
        this._getInputValues().map((n) => {
          const key = Object.keys(n)
          return [key, n[key]]
        })
      )
      this._callback(e, values)
    })
  }

  close() {
    super.close()
    this._form.reset()
  }
}
