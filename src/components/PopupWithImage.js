import  Popup  from './Popup.js';
import { selectors } from '../utils/data.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);   
  }
  open(input) {
    super.open();
    
    this._popup.querySelector(selectors.popupImage).src = input.link;
    this._popup.querySelector(selectors.popupImage).alt = input.name;
    this._popup.querySelector(selectors.popupTitle).textContent = input.name;
  }
}