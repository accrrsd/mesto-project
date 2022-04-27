export class FormValidator {
  constructor({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, element) {
    this.formSelector = formSelector
    this.inputSelector = inputSelector
    this.submitButtonSelector = submitButtonSelector
    this.inactiveButtonClass = inactiveButtonClass
    this.inputErrorClass = inputErrorClass
    this.errorClass = errorClass

    this._element = element
  }
  enableValidation(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {}
  _checkValid(form, input, inputErrorClass, errorClass) {}
  _toggleButtonBlock(elem, blockButtonClass, invalid) {}
  _showValidationError(form, input, errorMassage, inputError, errorClass) {}
  _hideValidationError(form, input, inputError, errorClass) {}
}
