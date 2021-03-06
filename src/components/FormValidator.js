class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors
    this._form = form
  }

  _showError(formElement, inputElement, errorMessage, selectors) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(selectors['inputErrorClass']);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors['errorClass']);
  }
  
  _hideError(formElement, inputElement, selectors) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(selectors['inputErrorClass']);
    errorElement.classList.remove(selectors['errorClass']);
    errorElement.textContent = '';
  }

  _checkValidity(formElement, inputElement, selectors) {
    if (!inputElement.validity.valid) {
      this._showError(formElement, inputElement, inputElement.validationMessage, selectors);
    }
    else {
      this._hideError(formElement, inputElement, selectors);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleButtonState(inputList, buttonElement, selectors) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(selectors['inactiveButtonClass']);
      buttonElement.setAttribute('disabled', true);
    }
    else {
      buttonElement.classList.remove(selectors['inactiveButtonClass']);
      buttonElement.removeAttribute('disabled', true);
    }
  } 

  _setEventListeners(formElement, selectors ) {
    const inputList = Array.from(formElement.querySelectorAll(selectors['inputSelector']));
    const submitButtonElement = formElement.querySelector(selectors['submitButtonSelector']);

    this._toggleButtonState(inputList, submitButtonElement, selectors);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(formElement, inputElement, selectors);
        this._toggleButtonState(inputList, submitButtonElement, selectors);
      })
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault()
    });
    this._setEventListeners(this._form, this._selectors);
  }

  resetValidation() {
    const inputs = Array.from(this._form.querySelectorAll(this._selectors['inputSelector']));
    const submitButton = this._form.querySelector(this._selectors['submitButtonSelector']);

    inputs.forEach(input => this._hideError(this._form, input, this._selectors));
    this._toggleButtonState(inputs, submitButton, this._selectors);
  }
}

export { FormValidator }