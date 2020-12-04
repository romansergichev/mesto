const showError = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(selectors['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors['errorClass']);
}

const hideError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(selectors['inputErrorClass']);
  errorElement.classList.remove(selectors['errorClass']);
  errorElement.textContent = '';
}

const checkValidity = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, selectors);
  }
  else {
    hideError(formElement, inputElement, selectors);
  }
}

const setEventListeners = (formElement, selectors ) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors['inputSelector']));
  const submitButtonElement = formElement.querySelector(selectors['submitButtonSelector']);
  toggleButtonState(inputList, submitButtonElement, selectors);
  inputList.forEach( inputElement =>{
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, submitButtonElement, selectors);
    })
  })
}

const enableValidation = selectors => { 
  const formList = Array.from(document.querySelectorAll(selectors['formSelector']));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault()
    })
    setEventListeners(formElement, selectors);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors['inactiveButtonClass']);
  }
  else {
    buttonElement.classList.remove(selectors['inactiveButtonClass']);
  }
} 

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});