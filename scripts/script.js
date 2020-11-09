const initialPost = [
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
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const popupCloseEditButton = popupCloseButton[0];
const popupCloseAddPostButton = popupCloseButton[1];
const formEdit = document.querySelector('.popup__form_type_edit');
const formName = document.querySelector('.popup__input_type_name');
const formDescription = document.querySelector('.popup__input_type_description');
const formAddPost = document.querySelector('.popup__form_type_add-post');
const formPlace = document.querySelector('.popup__input_type_place');
const formLink = document.querySelector('.popup__input_type_link');
const photoModal = document.querySelector('.photo-modal');
const modalCloseButton = document.querySelector('.photo-modal__close-button')
const modalImage = document.querySelector('.photo-modal__image');
const modalTitle = document.querySelector('.photo-modal__title');
const postsList = document.querySelector('.posts__list');
const postTemplate = document.querySelector('#post-template').content;


function addInfoToInput() {
  formName.value = userName.textContent;
  formDescription.value = profileDescription.textContent;  
}

function openEditPopup() {
  popupEditProfile.classList.add('popup_opened');
  addInfoToInput();
} 

function openAddPostPopup() {
  popupAddPost.classList.add('popup_opened');
}

function closePopup() {
  popupEditProfile.classList.remove('popup_opened') || popupAddPost.classList.remove('popup_opened');
}



function closePhotoModal() {
  photoModal.classList.remove('photo-modal_opened');
}

function submitEditForm (evt) {
  evt.preventDefault();
  userName.textContent = formName.value; 
  profileDescription.textContent = formDescription.value;
  closePopup();
}

function addPost (place, link) {
  const post = postTemplate.cloneNode(true);
  const postImage = post.querySelector('.post__image');
  const postTitile = post.querySelector('.post__title');
  const postLikeButton = post.querySelector('.post__like-button');
  const postDeleteButton = post.querySelector('.post__delete');
  postImage.src = link;
  postImage.alt = place;
  postTitile.textContent = place;
  postImage.addEventListener('click', function openPhotoModal() {
    photoModal.classList.add('photo-modal_opened');
    modalImage.src = link;
    modalImage.alt = place;
    modalTitle.textContent = place;
  });
  postLikeButton.addEventListener('click', evt => evt.target.classList.toggle('post__like-button_active'));
  postDeleteButton.addEventListener('click', () => {
    const postToBeDeleted = postDeleteButton.closest('.post');
    postToBeDeleted.remove();
  })
  postsList.prepend(post);
}

function submitAddPostForm (evt) {
  evt.preventDefault();
  addPost(formPlace.value, formLink.value);
  closePopup();  
  formLink.value = '';
  formPlace.value = '';
}



initialPost.forEach(item => addPost(item['name'], item['link']));
editButton.addEventListener('click', openEditPopup);
popupCloseEditButton.addEventListener('click', closePopup);
popupCloseAddPostButton.addEventListener('click', closePopup);
modalCloseButton.addEventListener('click', closePhotoModal);
addButton.addEventListener('click', openAddPostPopup);
formEdit.addEventListener('submit', submitEditForm);
formAddPost.addEventListener('submit',submitAddPostForm);
