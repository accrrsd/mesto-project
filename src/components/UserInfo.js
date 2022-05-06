// export default class UserInfo {
//   constructor(nameSelector, subnameSelector, avatarSelector) {
//     this._name = this._getElement(nameSelector)
//     this._subname = this._getElement(subnameSelector)
//     this._avatar = this._getElement(avatarSelector)
//   }

//   _getElement(selector, parentElem) {
//     return parentElem ? parentElem.querySelector(selector) : document.querySelector(selector)
//   }

//   getUserInfo(api) {
//     return api.getProfileFromServer()
//   }
//   setUserInfo({ name, about }, api) {
//     this._name.textContent = name
//     this._subname.textContent = about
//     if (api) {
//       return api.loadProfileOnServer({ name, about })
//     }
//   }

//   setUserAvatar({ avatar }, api) {
//     this._avatar.src = avatar
//     if (api) {
//       return api.loadAvatarOnServer({ avatar })
//     }
//   }
// }

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

  // setUserInfo(name, about, avatar) {
  //   const info = {}
  //   if (name) {
  //     info[name] = name
  //   }
  //   if (about) {
  //     info[about] = about
  //   }
  //   if (avatar) {
  //     info[avatar] = avatar
  //   }
  //   return info
  // }
}
