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
  
  setUserInfo({username, description}) {
    document.querySelector(this._nameSelector).textContent = username;
    document.querySelector(this._descriptionSelector).textContent = description;
  }
}