export default class UserInfo {
  constructor(name, description){
    this._nameSelector = name;
    this._descriptionSelector = description;
  }

  getUserInfo() {
    return {
      name: document.querySelector(this._nameSelector).textContent,
      description: document.querySelector(this._descriptionSelector).textContent
    }
  }
  
  setUserInfo(name, description) {
    document.querySelector(this._nameSelector).textContent = name;
    document.querySelector(this._descriptionSelector).textContent = description;
  }
}