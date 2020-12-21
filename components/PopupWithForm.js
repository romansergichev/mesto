import  Popup  from './Popup.js';
import { selectors } from '../utils/data.js';

export default class PopupWithForm extends Popup {
  constructor({ submiter, selector }) {
    super(selector);
    this._submiter = submiter;
  } 

  _getInputValues() {
    this._inputs = this._popup.querySelectorAll(selectors.popupInput);
    this._inputValues = {};

    this._inputs.forEach(input => this._inputValues[input.name] = input.value);

    return this._inputValues
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(selectors.closeButton);
    const popupForm = this._popup.querySelector(selectors.popupForm);
    
    closeButton.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleMousedownClose);
    popupForm.addEventListener('submit', () => {
      this._submiter(this._getInputValues());
    }); 
  }

  close() {
    this._popup.classList.remove(selectors.popupIsOpenedClass);
    this._popup.querySelector(selectors.popupForm).reset();
    this.removeEventListeners();
  }
}