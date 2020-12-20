import  Popup  from './Popup.js';
import { selectors } from '../utils/data.js';

export default class PopupWithForm extends Popup {
  constructor({ submiter }, popupSelector) {
    super(popupSelector);
    this._submiter = submiter;
  } 

  _getInputValues() {
    this._inputs = this._popup.querySelectorAll(selectors.popupInput);

    const inputValues = {};

    this._inputs.forEach(input => inputValues[input.name] = input.value);

    return inputValues
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(selectors.closeButton);
    const popupForm = this._popup.querySelector(selectors.popupForm);

    const handleSubmit = () => this._submiter(this._getInputValues())
    
    closeButton.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleMousedownClose);
    popupForm.addEventListener('submit', handleSubmit); 
  }

  close() {
    this._popup.classList.remove(selectors.popupIsOpenedClass);
    this._popup.querySelector(selectors.popupForm).reset();
    this.removeEventListeners();
  }
}