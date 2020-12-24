export default class UserInfo {
  constructor(name, description){
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }
  
  setUserInfo({username, description}) {
    this._name.textContent = username;
    this._description.textContent = description;
  }
}