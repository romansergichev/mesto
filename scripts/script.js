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
const popupList = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddPost = document.querySelector('.popup_type_add-post');
const popupCloseEditButton = document.querySelector('.popup__close-button_type_edit');
const popupCloseAddPostButton = document.querySelector('.popup__close-button_type_add-post');
const popupClosePhotoButton = document.querySelector('.popup__close-button_type_photo');
const submitButtons = document.querySelectorAll('.popup__submit-button');
const formEdit = document.querySelector('.popup__form_type_edit');
const formName = document.querySelector('.popup__input_type_name');
const formDescription = document.querySelector('.popup__input_type_description');
const formAddPost = document.querySelector('.popup__form_type_add-post');
const formPlace = document.querySelector('.popup__input_type_place');
const formLink = document.querySelector('.popup__input_type_link');
const popupPhoto = document.querySelector('.popup_type_photo');
const modalImage = document.querySelector('.popup__post-image');
const modalTitle = document.querySelector('.popup__post-title');
const postsList = document.querySelector('.posts__list');
const postTemplate = document.querySelector('#post-template').content;



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

const closeOnEscape = (evt) => {
  if(document.key === 'Escape') {
    popupList.forEach(popup => closePopup(popup));
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

function openPhotoPopup (image, title) {
  modalImage.src = image;
  modalImage.alt = title;
  modalTitle.textContent = title;
  openPopup(popupPhoto);
}

function toggleLikeButton (likeButton) {
  likeButton.addEventListener('click', () => likeButton.classList.toggle('post__like-button_active'));
}

function deletePost (deleteButton) {
  deleteButton.addEventListener('click', () => deleteButton.closest('.post').remove());
}

function addPost (name, link) {
  const post = postTemplate.cloneNode(true);
  const postImage = post.querySelector('.post__image');
  const postTitle = post.querySelector('.post__title');
  const postLikeButton = post.querySelector('.post__like-button');
  const postDeleteButton = post.querySelector('.post__delete');

  postImage.src = link;
  postImage.alt = name;
  postTitle.textContent = name;

  postImage.addEventListener('click', () => openPhotoPopup(link, name));
  
  toggleLikeButton(postLikeButton);
  deletePost(postDeleteButton);
  
  return post;
}

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

function submitAddPostForm () {
  const post = addPost(formPlace.value, formLink.value);
  postsList.prepend(post);
  closePopup(popupAddPost);
  formAddPost.reset();
}

initialPosts.forEach(place => {
  const post = addPost(place.name, place.link);
  postsList.append(post);
});

editButton.addEventListener('click', () => {
  formName.value = userName.textContent;
  formDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

addButton.addEventListener('click', () => openPopup(popupAddPost));
popupCloseEditButton.addEventListener('click', () => { 
  closePopup(popupEditProfile);
  hideValidationErrors(popupEditProfile);
  diasbleSubmitButton(popupEditProfile);
});
popupCloseAddPostButton.addEventListener('click', () => { 
  closePopup(popupAddPost)
  hideValidationErrors(popupAddPost);
  diasbleSubmitButton(popupAddPost);
});
popupClosePhotoButton.addEventListener('click', () => closePopup(popupPhoto));
formEdit.addEventListener('submit', submitEditForm);
formAddPost.addEventListener('submit',submitAddPostForm);