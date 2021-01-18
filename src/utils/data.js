export const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '41ef509f-c882-46a6-b392-9507337e8b9c',
    'Content-Type': 'application/json'
  }
};

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const selectors = {
    profileAvatar: '.profile__avatar',
    profileName: '.profile__name',
    profileDescription: '.profile__description',
    postTemplate: '#post-template',
    userPostTemplate: '#user-post-template',
    postsList: '.posts__list',
    popupClass: 'popup',
    popupIsOpenedClass: 'popup_opened',
    closeButton: '.popup__close-button',
    popupEdit: '.popup_type_edit',
    popupAddPost: '.popup_type_add-post',
    popupWithImage: '.popup_type_photo',
    popupAvatar: '.popup_type_edit-avatar',
    popupConfirm: '.popup_type_confirm',
    popupForm: '.popup__form',
    popupConfirmForm: '.popup__form_type_confirm',
    popupInput: '.popup__input',
    popupImage: '.popup__post-image',
    popupTitle: '.popup__post-title',
    post: '.post',
    imageClass: 'post__image',
    postImage: '.post__image',
    postTitle: '.post__title',
    postLikeButton: '.post__like-button',
    postLikeCounter: '.post__like-counter',
    postLikeButtonIsActive: 'post__like-button_active',
    postDeleteButton: '.post__delete'
}

export const editButton = document.querySelector('.profile__edit');
export const editAvatar = document.querySelector('.profile__edit-avatar');
export const addButton = document.querySelector('.profile__add-button');
export const formEdit = document.querySelector('.popup__form_type_edit');
export const formAvatar = document.querySelector('.popup__form_type_edit-avatar');
export const formConfirm = document.querySelector('.popup__form_type_confirm');
export const formName = document.querySelector('.popup__input_type_name');
export const formDescription = document.querySelector('.popup__input_type_description');
export const formAddPost = document.querySelector('.popup__form_type_add-post');