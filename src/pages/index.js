import '../pages/index.css'
import { Post } from '../components/Post.js';
import { FormValidator } from '../components/FormValidator.js';
import UserPost from '../components/UserPost.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { 
  validationConfig,
  selectors,
  editButton,
  editAvatar,
  addButton,
  formEdit,
  formAvatar,
  formName,
  formDescription,
  formAddPost,
  options
} from '../utils/data.js';

const api = new Api(options);
const editFormValidator = new FormValidator(validationConfig, formEdit);
const addFormValidator = new FormValidator(validationConfig, formAddPost);
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);
const userInfo = new UserInfo({
  name: selectors.profileName, 
  description: selectors.profileDescription,
  avatar: selectors.profileAvatar
});

const dataPromises = [api.getInitialCards(), api.getUserInfo()];

Promise.all(dataPromises)
  .then(data => {
    const [postsData, userData] = data;
    userInfo.setUserInfo(userData);

    const posts = new Section({
      renderer: (item) => {
        const post = item.owner._id == userData._id
        ? getUserPost(item, selectors.userPostTemplate)
        : getPost(item, selectors.postTemplate);
        posts.renderLikes(post, item, userData)
        posts.appendItem(post);
      }
    }, selectors.postsList);

    const popupAdd = new PopupWithForm({
      submiter: (inputValues) => {
        popupAdd.renderLoading(true)
        api.addNewPost(inputValues)
          .then(result => {
            const post = getUserPost(result, selectors.userPostTemplate);
            posts.prependItem(post);
          })
          .catch(error => console.log(`Ошибка: ${error}`))
          .finally(() => popupEdit.renderLoading(false))
        popupAdd.close();
      },
      selector: selectors.popupAddPost
    });

    const getPost = (input, templateSelector) => {
      const post = new Post({
        userdata: userData,
        data: input,
        handleImageClick: () => popupWithImage.open(input),
        handleLikeClick: (isLiked) => api.likePost(isLiked, post.getPostId())
          .then(data => post.like(data))
          .catch(error => console.log(`Ошибка: ${error}`))
        },templateSelector);
      const postElement = post.generateNewPost();
    
      return postElement;
    }

    const deleteRequest = (post) => {
      popupConfirm.open();
      popupConfirm.handleDeleteRequest(() => {
        api.deletePost(post.getPostId())
          .then(post.delete())
          .then(popupConfirm.close())
          .catch(error => console.log(`Ошибка: ${error}`))
      });
    }

    const getUserPost = (input, templateSelector) => {
      const post = new UserPost({
        data: input,
        handleImageClick: () => popupWithImage.open(input),
        handleLikeClick: (isLiked) => api.likePost(isLiked, post.getPostId())
          .then(data => post.like(data))
          .catch(error => console.log(`Ошибка: ${error}`)),
        handleDeleteClick: () => deleteRequest(post),
      },templateSelector);
      const postElement = post.generateNewPost();
    
      return postElement;
    }

    addButton.addEventListener('click', () => {
      addFormValidator.resetValidation();
      popupAdd.open();
    });
    posts.renderPosts(postsData);

    popupAdd.setEventListeners();
  })
  .catch(error => console.log(`Ошибка: ${error}`))

const popupConfirm = new PopupConfirm(selectors.popupConfirm);
const popupWithImage = new PopupWithImage(selectors.popupWithImage);

const popupAvatar = new PopupWithForm({
  submiter: (inputValues) => {
    popupAvatar.renderLoading(true)
    api.setAvatar(inputValues)
      .then(result => userInfo.setUserInfo(result))
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => popupEdit.renderLoading(false))
    popupAvatar.close();
  },
  selector: selectors.popupAvatar
});

const popupEdit = new PopupWithForm({ 
  submiter: (inputValues) => {
    popupEdit.renderLoading(true)
    api.editUserProfile(inputValues)
      .then(result => userInfo.setUserInfo(result))
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => popupEdit.renderLoading(false))
    popupEdit.close();
  },
  selector: selectors.popupEdit
});

editAvatar.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  popupAvatar.open();
})

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();

  formName.value = userData.name;
  formDescription.value = userData.description;

  editFormValidator.resetValidation();
  popupEdit.open();
});

popupAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupConfirm.setEventListeners();
avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
addFormValidator.enableValidation();