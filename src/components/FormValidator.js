export default class FormValidator {
  constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formElement) {
    this._form = formElement
    this._inputSelector = inputSelector
    this._submitButtonSelector = submitButtonSelector
    this._inactiveButtonClass = inactiveButtonClass
    this._inputErrorClass = inputErrorClass
    this._errorClass = errorClass
    this._inputs = Array.from(formElement.querySelectorAll(inputSelector))
    this._submitBtn = formElement.querySelector(submitButtonSelector)
  }
  enableValidation() {
   // const inputs = Array.from(this._form.querySelectorAll(this._inputSelector))
    //const submitBtn = this._form.querySelector(this._submitButtonSelector)
    this.toggleButtonBlock(
      this._submitBtn,
      this._inputs.some((input) => !input.validity.valid)
    )
    // Вешаем валидацию
   this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValid(input)
        this.toggleButtonBlock(
          this._submitBtn,
          this._inputs.some((input) => !input.validity.valid)
        )
      })
    })
  }
  _checkValid(input) {
    if (!input.validity.valid) {
      this._showValidationError(input, input.validationMessage)
    } else {
      this._hideValidationError(input)
    }
  }
  toggleButtonBlock(elem, invalid) {
    if (invalid) {
      elem.classList.add(this._inactiveButtonClass)
      elem.disabled = true
    } else {
      elem.classList.remove(this._inactiveButtonClass)
      elem.disabled = false
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
}
