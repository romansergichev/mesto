import { selectors } from '../utils/data.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(selectors.closeButton);
    this._escClose = this._handleEscClose.bind(this);
    this._mousedownClose = this._handleMousedownClose.bind(this);
  }

  open() {
    this._popup.classList.add(selectors.popupIsOpenedClass);
    document.addEventListener('keydown', this._escClose);
    this._popup.addEventListener('mousedown', this._mousedownClose);
  }

  close() {
    this._popup.classList.remove(selectors.popupIsOpenedClass);
    this._removeEventListeners();
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleMousedownClose (evt) {
    if(evt.target.classList.contains(selectors.popupClass)){
      this.close()
    }
  }
  
  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._escClose);
    this._popup.removeEventListener('mousedown', this._mousedownClose);
  }

  renderLoading (isLoading) {
    this._submitButton = this._popup.querySelector(selectors.submitSelector)
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    }

    else {
      this._submitButton.textContent = 'Сохранить'
    }


  } 
}