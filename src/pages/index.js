import '../pages/index.css'
import { Post } from '../components/Post.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { 
  // initialPosts,
  validationConfig,
  selectors,
  editButton,
  addButton,
  formEdit,
  formName,
  formDescription,
  formAddPost,
  options
} from '../utils/data.js';

const api = new Api(options);
const editFormValidator = new FormValidator(validationConfig, formEdit);
const addFormValidator = new FormValidator(validationConfig, formAddPost);
const userInfo = new UserInfo(selectors.profileName, selectors.profileDescription);


api.getInitialCards()
  .then(result => {
    console.log(result)
    const getPosts = new Section({
      items: result,
      renderer: (item) => {
        const post = getPost(item, selectors.postTemplate);
        getPosts.appendItem(post);
      }
    }, selectors.postsList);
    getPosts.renderPosts()
  })

api.getUserInfo()
  .then(result => console.log(result))

api.editUserProfile('Roman Sergichev', 'Praktikum student')
  .then(result => console.log(result))

// api.addNewPost('Нотр-Дам', 'https://pbs.twimg.com/media/C-RJmqPXkAA8d7z.jpg')
//   .then(result => console.log(result))

  
// const initialPostsList = new Section({
//   items: initialPosts,
//   renderer: (item) => {
//     const post = getPost(item, selectors.postTemplate);
//     initialPostsList.appendItem(post);
//   }
// }, selectors.postsList);

const popupEdit = new PopupWithForm({ 
  submiter: (inputValues) => {
    userInfo.setUserInfo(inputValues)
    popupEdit.close();
  },
  selector: selectors.popupEdit
});

const popupAdd = new PopupWithForm({
  submiter: (inputValues) => {
    const post = getPost(inputValues, selectors.postTemplate);
    initialPostsList.prependItem(post);
    popupAdd.close();
  },
  selector: selectors.popupAddPost
});

const popupWithImage = new PopupWithImage(selectors.popupWithImage);

const getPost = (input, templateSelector) => {
  const post = new Post({
    data: input,
    handleImageClick: (evt) => {
      if (evt.target.classList.contains(selectors.imageClass)) {
        popupWithImage.open(input);
      }
    }
   },templateSelector);

  const postElement = post.generateNewPost();

  return postElement;
}

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();

  formName.value = userData.name;
  formDescription.value = userData.description;

  editFormValidator.resetValidation();
  popupEdit.open();

});

addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  popupAdd.open();
});

popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
// initialPostsList.renderPosts();
editFormValidator.enableValidation();
addFormValidator.enableValidation();