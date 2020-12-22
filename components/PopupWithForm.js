import  Popup  from './Popup.js';
import { selectors } from '../utils/data.js';

export default class PopupWithForm extends Popup {
  constructor({ submiter, selector }) {
    super(selector);
    this._submiter = submiter;
    this._popupForm = this._popup.querySelector(selectors.popupForm);
    this._handleSubmit = () => {
      this._submiter(this._getInputValues());
    }
  } 

  _getInputValues() {
    this._inputs = this._popup.querySelectorAll(selectors.popupInput);
    this._inputValues = {};

    this._inputs.forEach(input => this._inputValues[input.name] = input.value);

    return this._inputValues
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleMousedownClose);
    this._popupForm.addEventListener('submit', this._handleSubmit); 
  }

  close() {
    this._popup.classList.remove(selectors.popupIsOpenedClass);
    this._popup.querySelector(selectors.popupForm).reset();
    this._removeEventListeners();
  }
  
  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleMousedownClose);
    this._popupForm.addEventListener('submit', this._handleSubmit); 
  }
}