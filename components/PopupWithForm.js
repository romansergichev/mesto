import  Popup  from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ submiter }, popupSelector) {
    super(popupSelector);
    this._submiter = submiter;
  } 

  _getInputValues() {
    const editForm = document.forms['edit-form'];
    const addForm = document.forms['add-post-form'];

    const inputValues = {
      name: editForm.elements['profile-name'].value,
      description: editForm.elements['profile-description'].value,
      title: addForm.elements['new-place'].value,
      link: addForm.elements['place-link'].value
    };

    return inputValues
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    const popupForm = this._popup.querySelector('.popup__form');
    const inputsValues = this._getInputValues();
    console.log(inputsValues);
    
    closeButton.addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleMousedownClose);
    popupForm.addEventListener('submit', this._submiter); 
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.querySelector('.popup__form').reset();
    this.removeEventListeners();
  }
}