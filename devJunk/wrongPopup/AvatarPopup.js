import { Popup } from './Popup.js'

class AvatarPopup extends Popup {
  constructor(selector) {
    super(selector)
    this._url = this._element.querySelector('input[name="url"]')
    this._form = this._element.querySelector('form[name="avatar-set"]')
  }

  // Обновление данных на сервере
  _updateListener() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      const submitBtn = e.submitter
      submitBtn.textContent = 'Сохранение...'
    })
  }

  serverUpdate() {
    //? Место для обновленного API.
  }
}

export const avatarPopupObject = new AvatarPopup('.popup_type_avatar-edit')
