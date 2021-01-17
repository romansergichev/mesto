import '../pages/index.css'
import { Post } from '../components/Post.js';
import { FormValidator } from '../components/FormValidator.js';
import UserPost from '../components/UserPost.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
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


api.getInitialCards()
  .then(result => {
    console.log(result)
    posts.renderPosts(result)
  })

api.getUserInfo()
  .then(result => {
    console.log(result)
    document.querySelector(selectors.profileAvatar).src = result.avatar
    document.querySelector(selectors.profileName).textContent = result.name
    document.querySelector(selectors.profileDescription).textContent = result.about
    console.log(result._id)
  })

// api.editUserProfile('Makoto Tsukimoto', 'Ping-pong player')
//   .then(result => console.log(result))

// api.addNewPost('Нотр-Дам', 'https://pbs.twimg.com/media/C-RJmqPXkAA8d7z.jpg')
//   .then(result => console.log(result))

// api.setAvatar('https://i.imgur.com/hNhF25g.jpg')
//   .then(result => console.log(result));

const posts = new Section({
  renderer: (item) => {
    console.log(item)
    const post = getPost(item, selectors.postTemplate);
    posts.appendItem(post);
  }
}, selectors.postsList);

const popupAvatar = new PopupWithForm({
  submiter: (inputValues) => {
    console.log(inputValues)
    api.setAvatar(inputValues)
      .then(result => {
        userInfo.setAvatar(result);
      })
    popupAvatar.close();
  },
  selector: selectors.popupAvatar
});

const popupEdit = new PopupWithForm({ 
  submiter: (inputValues) => {
    api.editUserProfile(inputValues)
      .then(result => userInfo.setUserInfo({
        username: result.name,
        description: result.about
      }))
    popupEdit.close();
  },
  selector: selectors.popupEdit
});

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

const popupWithImage = new PopupWithImage(selectors.popupWithImage);

const getPost = (input, templateSelector) => {
  console.log(input);
  const post = 
    new Post({
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

const getUserPost = (input, templateSelector) => {
  const post = new UserPost({
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

editAvatar.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  popupAvatar.open()
})

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

popupAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
// initialPostsList.renderPosts();
avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
addFormValidator.enableValidation();