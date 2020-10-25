let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');
let userName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let editName = document.querySelector('.popup__input_type_name');
let editDescription = document.querySelector('.popup__input_type_description');
let editForm = document.querySelector('.popup__form');

function addInfoToInput() {
  editName.value = userName.textContent;
  editDescription.value = profileDescription.textContent;  
}

function openPopup() {
  popup.classList.add('popup_opened');
  addInfoToInput();
} 

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmit(event) {
  event.preventDefault();
  userName.textContent = editName.value; 
  profileDescription.textContent = editDescription.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', formSubmit);

