import  Popup  from './Popup.js';
import { selectors } from '../utils/data.js';

export default class PopupWithImage extends Popup {
  constructor(image, popupSelector) {
    super(popupSelector);
    this._link = image.src;
    this._name = image.closest(selectors.post).querySelector(selectors.postTitle).textContent;
    
  }
  open() {
    this._popup.classList.add(selectors.popupIsOpenedClass);

    this._popup.querySelector(selectors.popupImage).src = this._link;
    this._popup.querySelector(selectors.popupImage).alt = this._name;
    this._popup.querySelector(selectors.popupTitle).textContent = this._name;
  }
}