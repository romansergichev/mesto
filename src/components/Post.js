import { selectors } from '../utils/data.js';

class Post {
  constructor({userdata, data, handleImageClick, handleLikeClick}, template) {
    this._userdata = userdata;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._templateSelector = template;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate () {
    const postTemplate = document
    .querySelector(this._templateSelector)
    .content.querySelector(selectors.post)
    .cloneNode(true);

    return postTemplate;
  }

  getPostId() {
    return this._id
  }

  isLiked(userData) {
    return  JSON.stringify(this._likes).includes(JSON.stringify(userData))
  }

  generateNewPost () {
    this._post = this._getTemplate();
    const postImage = this._post.querySelector(selectors.postImage);
    this._setListeners();

    postImage.src = this._link;
    postImage.alt = this._name;

    this._post.querySelector(selectors.postTitle).textContent = this._name;

    return this._post;
  }

  _setListeners () {
    this._likeButton = this._post.querySelector(selectors.postLikeButton)
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._likeButton.classList.contains(selectors.postLikeButtonIsActive))
    });
    this._post.querySelector(selectors.postImage).addEventListener('click', this._handleImageClick);
  }

  like (postData) {
    const likeButton = this._post.querySelector(selectors.postLikeButton);
    const LikeCounter = this._post.querySelector(selectors.postLikeCounter);
    this._likes = postData.likes.length

    if (this._likes === 0) {
      LikeCounter.textContent = ''
    } else {
      LikeCounter.textContent = this._likes
    }
    
    likeButton.classList.toggle(selectors.postLikeButtonIsActive);
  }
}

export { Post }