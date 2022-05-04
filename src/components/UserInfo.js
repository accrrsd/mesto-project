export default class UserInfo {
  constructor(nameSelector, subnameSelector, avatarSelector) {
    this._name = this._getElement(nameSelector)
    this._subname = this._getElement(subnameSelector)
    this._avatar = this._getElement(avatarSelector)
  }

  _getElement(selector, parentElem) {
    return parentElem ? parentElem.querySelector(selector) : document.querySelector(selector)
  }

  getUserInfo(api) {
    return api.getProfileFromServer()
  }
  setUserInfo({ name, about }, api) {
    this._name.textContent = name
    this._subname.textContent = about
    if (api) {
      return api.loadProfileOnServer({ name, about })
    }
  }

  setUserAvatar({ avatar }, api) {
    this._avatar.src = avatar
    if (api) {
      return api.loadAvatarOnServer({ avatar })
    }
  }
}
