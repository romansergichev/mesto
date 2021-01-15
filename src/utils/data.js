import Api from '../components/Api.js'

export const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '41ef509f-c882-46a6-b392-9507337e8b9c',
    'Content-Type': 'application/json'
  }
};

// export const initialPosts = [
//   {
//       name: 'Архыз',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//       name: 'Челябинская область',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//       name: 'Иваново',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//       name: 'Камчатка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//       name: 'Холмогорский район',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//       name: 'Байкал',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const selectors = {
    profileName: '.profile__name',
    profileDescription: '.profile__description',
    postTemplate: '#post-template',
    postsList: '.posts__list',
    popupClass: 'popup',
    popupIsOpenedClass: 'popup_opened',
    closeButton: '.popup__close-button',
    popupEdit: '.popup_type_edit',
    popupAddPost: '.popup_type_add-post',
    popupWithImage: '.popup_type_photo',
    popupForm: '.popup__form',
    popupInput: '.popup__input',
    popupImage: '.popup__post-image',
    popupTitle: '.popup__post-title',
    post: '.post',
    imageClass: 'post__image',
    postImage: '.post__image',
    postTitle: '.post__title',
    postLikeButton: '.post__like-button',
    postLikeButtonIsActive: 'post__like-button_active',
    postDeleteButton: '.post__delete',

}

export const editButton = document.querySelector('.profile__edit');
export const addButton = document.querySelector('.profile__add-button');
export const formEdit = document.querySelector('.popup__form_type_edit');
export const formName = document.querySelector('.popup__input_type_name');
export const formDescription = document.querySelector('.popup__input_type_description');
export const formAddPost = document.querySelector('.popup__form_type_add-post');