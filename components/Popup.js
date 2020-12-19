export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
  }

  _handleEscClose = evt =>  {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleMousedownClose = evt => {
    if(evt.target.classList.contains('popup')){
      this.close()
    }
  }
  
  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');

    closeButton.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleMousedownClose);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleMousedownClose);
  }
}