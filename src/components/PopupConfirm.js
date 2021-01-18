import  Popup  from './Popup.js';
import { selectors } from '../utils/data.js';

export default class PopupConfirm extends Popup {
  constructor(selector) {
    super(selector)
    this._popupForm = document.querySelector(selectors.popupConfirmForm);
  }
  handleDeleteRequest(handler) {
    this._deleteHandler = handler;
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteHandler();
    })
  }
}