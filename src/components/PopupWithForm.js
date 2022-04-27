import { Popup } from './Popup'

export class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector)
    this._callback = callback
    this.inputValues = this._getInputValues()
  }

  _getInputValues() {
    this._form = this._element.querySelector('.form')
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
    //? На месте калбека - функция отправки из АПИ + всякое взаимодействие по типу "сохранение.."
    this._element.addEventListener('submit', callback)
  }

  close() {
    super.close()
    this._form.reset()
  }
}
