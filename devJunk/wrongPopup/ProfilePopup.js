import { Popup } from './Popup.js'
import { profileTitle, profileSubtitle } from './variables'

class ProfilePopup extends Popup {
  constructor(selector) {
    super(selector)
    this._name = this._element.querySelector('input[name="name"]')
    this._subname = this._element.querySelector('input[name="subname"]')
    this._form = this._element.querySelector('form[name="profile-set"]')
  }
  open() {
    super.open()
    this._name.value = profileTitle.textContent
    this._subname.value = profileSubtitle.textContent
  }

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

export const profilePopupObject = new ProfilePopup('.popup_type_profile')

//!!! Объект не закончен, нужна работа с объектно-ориентированным API, который пока не готов.
