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
let post = '';

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

function addPost (name, link) {
  const postElement = postTemplate.cloneNode(true);
  const postElementImage = postElement.querySelector('.post__image');
  const postElementTitle = postElement.querySelector('.post__title');

  postElementImage.src = link;
  postElementImage.alt = name;
  postElementTitle.textContent = name;
  
  return post = postElement; 
}

function submitAddPostForm (evt) {
  evt.preventDefault();
  addPost(formPlace.value, formLink.value); 
  closePopup(popupAddPost);
  postsList.prepend(post);
  formLink.value = '';
  formPlace.value = '';
}

initialPosts.forEach(place => { 
  addPost(place.name, place.link);
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

document.addEventListener('click', (evt) => {
  const target = evt.target;
  const focusedPost = target.closest('.post');

  if (target.classList.contains('post__image')) { 
    const postImage = focusedPost.querySelector('.post__image');
    const postTitle = focusedPost.querySelector('.post__title');
    
    modalImage.src = postImage.src;
    modalImage.alt = postTitle.textContent;
    modalTitle.textContent = postTitle.textContent;

    openPopup(popupPhoto); 
  }

  if (target.classList.contains('post__delete')) {
    post.remove(); 
  }

  if (target.classList.contains('post__like-button')) {
    target.classList.toggle('post__like-button_active');
  }
});