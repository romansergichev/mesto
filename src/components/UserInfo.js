export default class UserInfo {
  constructor({name, description, avatar}){
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
    this._userId = ''
  }

  getUserId () {
    return this._userId
  }

  getUserInfo () {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
      avatar: this._avatar,
      id: this._userId
    }
  }
  
  setUserInfo ( data ) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._avatar.src = data.avatar;
    this._userId = data._id;
  }
}