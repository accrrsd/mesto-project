export default class UserInfo {
  constructor(nameSelector, subnameSelector, avatarSelector) {
    this.name = this._getElement(nameSelector)
    this.subname = this._getElement(subnameSelector)
    this.avatar = this._getElement(avatarSelector)
  }

  _getElement(selector, parentElem) {
    return parentElem ? parentElem.querySelector(selector) : document.querySelector(selector)
  }

  getUserInfo(api) {
    return api.getProfileFromServer()
  }
  setUserInfo({ name, about }, api) {
    this.name.textContent = name
    this.subname.textContent = about
    if (api) {
      return api.loadProfileOnServer({ name, about })
    }
  }

  setUserAvatar({ avatar }, api) {
    this.avatar.src = avatar
    if (api) {
      return api.loadAvatarOnServer({ avatar })
    }
  }
}
