import '../pages/index.css'
import { Post } from '../components/Post.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { 
  initialPosts,
  validationConfig,
  selectors,
  editButton,
  addButton,
  formEdit,
  formName,
  formDescription,
  formAddPost,
  postsList
} from '../utils/data.js';

const editFormValidator = new FormValidator(validationConfig, formEdit);
const addFormValidator = new FormValidator(validationConfig, formAddPost);
const userInfo = new UserInfo(selectors.profileName, selectors.profileDescription);

const initialPostsList = new Section({
  items: initialPosts,
  renderer: (item) => {
    const post = getPost(item, selectors.postTemplate)
    initialPostsList.appendItem(post);
  }
}, selectors.postsList);

const popupEdit = new PopupWithForm({ 
  submiter: (inputValues) => {
    userInfo.setUserInfo(inputValues)
    popupEdit.close();
  },
  selector: selectors.popupEdit
});

const popupAdd = new PopupWithForm({
  submiter: (inputValues) => {
    postsList.prepend(getPost(inputValues, selectors.postTemplate));
    popupAdd.close();
  },
  selector: selectors.popupAddPost
});

const getPost = (input, templateSelector) => {
  const post = new Post({
    data: input,
    handleImageClick: (evt) => {
      if (evt.target.classList.contains(selectors.imageClass)) {
        const popupWithImage = new PopupWithImage(evt.target, selectors.popupWithImage);
        popupWithImage.setEventListeners();
        popupWithImage.open();
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

  popupEdit.setEventListeners();
  editFormValidator.resetValidation();
  popupEdit.open();

});

addButton.addEventListener('click', () => {
  popupAdd.setEventListeners();
  addFormValidator.resetValidation();
  popupAdd.open();
});

initialPostsList.renderPosts();
editFormValidator.enableValidation();
addFormValidator.enableValidation();