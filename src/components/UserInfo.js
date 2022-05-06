export default class UserInfo {
  constructor(nameSelector, subnameSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector)
    this._subname = document.querySelector(subnameSelector)
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name
    this._subname.textContent = about
    this._avatar.src = avatar
    this._id = _id
  }
}
