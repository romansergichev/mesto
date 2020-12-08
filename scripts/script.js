import { Post } from './Post.js';
import { FormValidator } from './FormValidator.js';
import { initialPosts, validationConfig } from './data.js';


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
const editFormValidator = new FormValidator(validationConfig, formEdit);
const addFormValidator = new FormValidator(validationConfig, formAddPost);

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

const getPost = (input, templateSelector) => {
  const post = new Post(input, templateSelector);
  const postElement = post.generateNewPost();
  
  return postElement;
}

function submitAddPostForm () {
  const inputData = {
    name: formPlace.value,
    link: formLink.value
  }

  postsList.prepend(getPost(inputData, '#post-template'));
  closePopup(popupAddPost);
  formAddPost.reset();
}

initialPosts.forEach(place => {
  postsList.append(getPost(place, '#post-template'));
});

editButton.addEventListener('click', () => {
  formName.value = userName.textContent;
  formDescription.value = profileDescription.textContent;

  editFormValidator.resetValidation();
  openPopup(popupEditProfile);
});

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  openPopup(popupAddPost);
});

popupCloseEditButton.addEventListener('click', () => closePopup(popupEditProfile));
popupCloseAddPostButton.addEventListener('click', () => closePopup(popupAddPost));
popupClosePhotoButton.addEventListener('click', () => closePopup(popupPhoto));
formEdit.addEventListener('submit', submitEditForm);
formAddPost.addEventListener('submit',submitAddPostForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

export { openPopup, popupPhoto }