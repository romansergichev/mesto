let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');
let userName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let editName = document.querySelector('.popup__input_type_name');
let editDescription = document.querySelector('.popup__input_type_description');
let editForm = document.querySelector('.popup__form');
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

let postsList = document.querySelector('.posts__list');

//Добавить посты на страницу при загрузке страницы.
initialPost.forEach(function(item) {
  const postTemplate = document.querySelector('#post-template').content;
  const post = postTemplate.cloneNode(true);

  post.querySelector('.post__image').src = item['link'];
  post.querySelector('.post__image').alt = item['name'];
  post.querySelector('.post__title').textContent = item['name'];

  postsList.append(post);
});

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

