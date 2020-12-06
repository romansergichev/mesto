import { Post } from './post.js';

const initialPosts = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const userName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddPost = document.querySelector('.popup_type_add-post');
const popupCloseEditButton = document.querySelector('.popup__close-button_type_edit');
const popupCloseAddPostButton = document.querySelector('.popup__close-button_type_add-post');
const popupClosePhotoButton = document.querySelector('.popup__close-button_type_photo');
const formEdit = document.querySelector('.popup__form_type_edit');
const formName = document.querySelector('.popup__input_type_name');
const formDescription = document.querySelector('.popup__input_type_description');
const formAddPost = document.querySelector('.popup__form_type_add-post');
const formPlace = document.querySelector('.popup__input_type_place');
const formLink = document.querySelector('.popup__input_type_link');
const popupPhoto = document.querySelector('.popup_type_photo');
const postsList = document.querySelector('.posts__list');
const postTemplate = document.querySelector('#post-template').content;

const hideValidationErrors = (popupElement) => {
  const popupInputs = popupElement.querySelectorAll('.popup__input');
  const inputErrors = popupElement.querySelectorAll('.popup__input-error');

  inputErrors.forEach(inputError => {
    inputError.classList.remove('popup__input-error_active');
    inputError.textContent = '';
  });
  popupInputs.forEach(input => input.classList.remove('popup__input_type_error'));
}

const diasbleSubmitButton =  (popupElement) => {
  const submitButton = popupElement.querySelector('.popup__submit-button');

  submitButton.classList.add('popup__submit-button_disabled');
}

function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');

  popupElement.addEventListener('mousedown', closeOnMousedown);
  document.addEventListener('keydown',  closeOnEscape);
}

function closePopup (popupElement) {
  popupElement.classList.remove('popup_opened');

  popupElement.removeEventListener('mousedown', closeOnMousedown);
  document.removeEventListener('keydown',closeOnEscape);
}

const closeOnEscape = evt => {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const closeOnMousedown = evt => {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function submitEditForm () {
  userName.textContent = formName.value; 
  profileDescription.textContent = formDescription.value;

  closePopup(popupEditProfile);
}

function submitAddPostForm () {
  const postData = {
    name: formPlace.value,
    link: formLink.value
  }
  const post = new Post(postData);
  const postElement = post.generateNewPost();

  postsList.prepend(postElement);
  closePopup(popupAddPost);
  formAddPost.reset();
}

initialPosts.forEach(place => {
  const newPostTemplate = postTemplate.querySelector('.post').cloneNode(true);
  const post = new Post(place, newPostTemplate);
  const postElement = post.generateNewPost();

  postsList.append(postElement);
});

editButton.addEventListener('click', () => {
  formName.value = userName.textContent;
  formDescription.value = profileDescription.textContent;

  hideValidationErrors(popupEditProfile);
  diasbleSubmitButton(popupEditProfile);
  openPopup(popupEditProfile);
});

addButton.addEventListener('click', () => {
  hideValidationErrors(popupAddPost);
  diasbleSubmitButton(popupAddPost);
  openPopup(popupAddPost);
});

popupCloseEditButton.addEventListener('click', () => closePopup(popupEditProfile));
popupCloseAddPostButton.addEventListener('click', () => closePopup(popupAddPost));
popupClosePhotoButton.addEventListener('click', () => closePopup(popupPhoto));
formEdit.addEventListener('submit', submitEditForm);
formAddPost.addEventListener('submit',submitAddPostForm);

export { openPopup, popupPhoto }