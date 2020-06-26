export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description : this._description.textContent
    }
  }

  setUserInfo(newUserInfo) {
    this._name.textContent = newUserInfo.name;
    this._description.textContent = newUserInfo.about;
    this._avatar.src = newUserInfo.avatar;
    this._ownerId = newUserInfo._id;
  }
}
