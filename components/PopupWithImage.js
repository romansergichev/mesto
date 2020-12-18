import  Popup  from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(image, popupSelector) {
    super(popupSelector);
    this._link = image.src;
    this._name = image.alt;
    
  }
  open() {
    this._popup.classList.add('popup_opened');

    this._popup.querySelector('.popup__post-image').src = this._link;
    this._popup.querySelector('.popup__post-image').alt = this._name;
    this._popup.querySelector('.popup__post-title').textContent = this._name;
  }
}