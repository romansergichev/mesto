let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');

function openPopup() {
  popup.classList.add('popup_opened');
} 

function closePopup() {
  popup.classList.remove('popup_opened');
}


editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);