import { Post } from '../components/Post.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialPosts, validationConfig } from '../utils/data.js';
import Section from '../components/Section.js';
import  Popup  from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


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

const userInfo = new UserInfo('.profile__name', '.profile__description')
const userData = userInfo.getUserInfo();
console.log(userInfo.getUserInfo());

const initialPostsList = new Section({
  items: initialPosts,
  renderer: (item) => {
    const post = getPost(item, '#post-template')
    initialPostsList.appendItem(post);
  }
}, '.posts__list');

const popupEdit = new PopupWithForm({ 
    submiter: () => {
      userInfo.setUserInfo(formName.value, formDescription.value)
      // userData.name = formName.value; 
      // userData.description = formDescription.value;
      popupEdit.close();
    },
  },'.popup_type_edit');
const popupAdd = new PopupWithForm({
  submiter: () => {
    const inputData = {
      name: formPlace.value,
      link: formLink.value
    }
  
    postsList.prepend(getPost(inputData, '#post-template'));
    popupAdd.close();
  },
}, '.popup_type_add-post');



// function openPopup (popupElement) {
//   popupElement.classList.add('popup_opened');

//   popupElement.addEventListener('mousedown', closeOnMousedown);
//   document.addEventListener('keydown',  closeOnEscape);
// }

// function closePopup (popupElement) {
//   popupElement.classList.remove('popup_opened');

//   popupElement.removeEventListener('mousedown', closeOnMousedown);
//   document.removeEventListener('keydown',closeOnEscape);
// }

// const closeOnEscape = evt => {
//   if(evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// const closeOnMousedown = evt => {
//   if(evt.target.classList.contains('popup')) {
//     closePopup(evt.target);
//   }
// }



const getPost = (input, templateSelector) => {
  const post = new Post({
    data: input,
    handleImageClick: (evt) => {
      if (evt.target.classList.contains('post__image')) {
        const popupWithImage = new PopupWithImage(evt.target, '.popup_type_photo');
        popupWithImage.open();
        popupWithImage.setEventListeners();
      }
    }
   },templateSelector);
  const postElement = post.generateNewPost();
  
  return postElement;
}



// function submitAddPostForm () {
//   const inputData = {
//     name: formPlace.value,
//     link: formLink.value
//   }

//   postsList.prepend(getPost(inputData, '#post-template'));
//   closePopup(popupAddPost);
//   formAddPost.reset();
// }

// initialPosts.forEach(place => {
//   postsList.append(getPost(place, '#post-template'));
// });

editButton.addEventListener('click', () => {
  formName.value = userData.name;
  formDescription.value = userData.description;

  editFormValidator.resetValidation();
  popupEdit.open();
  popupEdit.setEventListeners();
  // formEdit.addEventListener('submit', submitEditForm);
});

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  popupAdd.open();
  popupAdd.setEventListeners();
  // openPopup(popupAddPost);
});

// popupCloseEditButton.addEventListener('click', () => popup.close());
// popupCloseAddPostButton.addEventListener('click', () => closePopup(popupAddPost));
// popupClosePhotoButton.addEventListener('click', () => closePopup(popupPhoto));
// formEdit.addEventListener('submit', submitEditForm);
// formAddPost.addEventListener('submit',submitAddPostForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

initialPostsList.renderPosts();
// костыль чтобы заработал попап с картинкой
// document.addEventListener('click', )