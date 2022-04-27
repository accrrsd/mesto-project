export class UserInfo {
  constructor(nameSelector, subnameSelector) {
    this.name = this._getElement(nameSelector)
    this.subname = this._getElement(subnameSelector)
  }
  _getElement(selector, parentElem) {
    return parentElem ? parentElem.querySelector(selector) : document.querySelector(selector)
  }

  getUserInfo() {
    //? Работа с Апи
  }

  setUserInfo(newName, newSubname) {
    //? Работа с Апи
    this.name.textContent = newName
    this.subname.textContent = newSubname
  }
}
