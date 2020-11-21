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
  inputList.forEach( inputElement =>{
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, selectors);
    })
  })
}

const enableValidation = selectors => { 
  const formList = Array.from(document.querySelectorAll(selectors['formSelector']));
  formList.forEach(formElement => {
    setEventListeners(formElement, selectors);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});