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
const modalImage = document.querySelector('.popup__post-image');
const modalTitle = document.querySelector('.popup__post-title');
const postsList = document.querySelector('.posts__list');
const postTemplate = document.querySelector('#post-template').content;

function openPopup (element){
    element.classList.add('popup_opened');
}

function closePopup (element){
    element.classList.remove('popup_opened');
}

function submitEditForm (evt) {
  evt.preventDefault();
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

function submitAddPostForm (evt) {
  evt.preventDefault();
  const post = addPost(formPlace.value, formLink.value);
  postsList.prepend(post);
  closePopup(popupAddPost);
  formLink.value = '';
  formPlace.value = '';
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
popupCloseEditButton.addEventListener('click', () => closePopup(popupEditProfile));
popupCloseAddPostButton.addEventListener('click', () => closePopup(popupAddPost));
popupClosePhotoButton.addEventListener('click', () => closePopup(popupPhoto));
formEdit.addEventListener('submit', submitEditForm);
formAddPost.addEventListener('submit',submitAddPostForm);