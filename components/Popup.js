import { selectors } from '../utils/data.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(selectors.closeButton);
  }

  open() {
    this._popup.classList.add(selectors.popupIsOpenedClass);
  }

  close() {
    this._popup.classList.remove(selectors.popupIsOpenedClass);
    this._removeEventListeners();
  }

  _handleEscClose = evt =>  {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleMousedownClose = evt => {
    if(evt.target.classList.contains(selectors.popupClass)){
      this.close()
    }
  }
  
  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleMousedownClose);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleMousedownClose);
  }
}