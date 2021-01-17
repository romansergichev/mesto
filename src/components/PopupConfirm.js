import  Popup  from './Popup.js';
import { selectors } from '../utils/data.js';

export default class PopupConfirm extends Popup {
  constructor({ submiter, selector }) {
    super(selector);
    this._submiter = submiter;
    this._popupForm = this._popup.querySelector(selectors.popupForm);
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._submiter);
  }
}