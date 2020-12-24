import  Popup  from './Popup.js';
import { selectors } from '../utils/data.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); 
    this._image = this._popup.querySelector(selectors.popupImage);
    this._title = this._popup.querySelector(selectors.popupTitle);
  }
  open(input) {
    super.open();
    
    this._image.src = input.link;
    this._image.alt = input.name;
    this._title.textContent = input.name;
  }
}