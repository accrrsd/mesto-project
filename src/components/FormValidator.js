export default class FormValidator {
  constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formElement) {
    this._form = formElement
    this._inputSelector = inputSelector
    this._submitButtonSelector = submitButtonSelector
    this._inactiveButtonClass = inactiveButtonClass
    this._inputErrorClass = inputErrorClass
    this._errorClass = errorClass
    this._inputList = Array.from(formElement.querySelectorAll(inputSelector))
    this._submitBtn = formElement.querySelector(submitButtonSelector)
  }
  enableValidation() {
    this._toggleButtonBlock(this._inputList.some((input) => !input.validity.valid))
    // Вешаем валидацию
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValid(input)
        this._toggleButtonBlock(this._inputList.some((input) => !input.validity.valid))
      })
    })
  }
  _toggleButtonBlock(blockState) {
    if (blockState) {
      this._submitBtn.classList.add(this._inactiveButtonClass)
      this._submitBtn.disabled = true
    } else {
      this._submitBtn.classList.remove(this._inactiveButtonClass)
      this._submitBtn.disabled = false
    }
  }
  _checkValid(input) {
    if (!input.validity.valid) {
      this._showValidationError(input, input.validationMessage)
    } else {
      this._hideValidationError(input)
    }
  }
  _showValidationError(input, errorMassage) {
    input.classList.add(this._inputErrorClass)
    const errorSpan = this._form.querySelector(`.${input.id}-error`)
    errorSpan.classList.add(this._errorClass)
    errorSpan.textContent = errorMassage
  }
  _hideValidationError(input) {
    input.classList.remove(this._inputErrorClass)
    const errorSpan = this._form.querySelector(`.${input.id}-error`)
    errorSpan.classList.remove(this._errorClass)
    errorSpan.textContent = ''
  }
  resetValidationState() {
    this._toggleButtonBlock(true)
    this._inputList.forEach((input) => {
      this._hideValidationError(input)
    })
  }
}
