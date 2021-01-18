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
        posts.appendItem(post);
      }
    }, selectors.postsList);

    const popupAdd = new PopupWithForm({
      submiter: (inputValues) => {
        api.addNewPost(inputValues)
          .then(result => {
            const post = getUserPost(result, selectors.userPostTemplate);
            posts.prependItem(post);
          })
        popupAdd.close();
      },
      selector: selectors.popupAddPost
    });

    addButton.addEventListener('click', () => {
      addFormValidator.resetValidation();
      popupAdd.open();
    });

    posts.renderPosts(postsData);


    popupAdd.setEventListeners();
  })

const popupConfirm = new PopupConfirm(selectors.popupConfirm);
const popupWithImage = new PopupWithImage(selectors.popupWithImage);

const popupAvatar = new PopupWithForm({
  submiter: (inputValues) => {
    api.setAvatar(inputValues)
      .then(result => {
        userInfo.setUserInfo(result);
      })
    popupAvatar.close();
  },
  selector: selectors.popupAvatar
});

const popupEdit = new PopupWithForm({ 
  submiter: (inputValues) => {
    api.editUserProfile(inputValues)
      .then(result => userInfo.setUserInfo(result))
    popupEdit.close();
  },
  selector: selectors.popupEdit
});

const handleImagePopup = (evt) => {
  if (evt.target.classList.contains(selectors.imageClass)) {
    popupWithImage.open(input);
  }
}

const getPost = (input, templateSelector) => {
  const post = new Post({
    data: input,
    handleImageClick: handleImagePopup
    },templateSelector);

  const postElement = post.generateNewPost();

  return postElement;
}

const getUserPost = (input, templateSelector) => {
  const post = new UserPost({
    data: input,
    handleImageClick: handleImagePopup,
    handleDeleteClick: () => {
      popupConfirm.open();
      popupConfirm.handleDeleteRequest(() => {
        api.deletePost(post.getPostId())
          .then(post.delete())
          .then(popupConfirm.close());
      });
    }
  },templateSelector);
  const postElement = post.generateNewPost();

  return postElement;
}

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