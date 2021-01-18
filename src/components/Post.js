import { selectors } from '../utils/data.js';

class Post {
  constructor({data, handleImageClick}, template) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._templateSelector = template;
    this._handleImageClick = handleImageClick;
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

  generateNewPost () {
    this._post = this._getTemplate();
    const postImage = this._post.querySelector(selectors.postImage);
    this._setListeners();
    this._renderLikes();

    postImage.src = this._link;
    postImage.alt = this._name;

    this._post.querySelector(selectors.postTitle).textContent = this._name;

    return this._post;
  }

  _setListeners () {
    this._post.querySelector(selectors.postLikeButton).addEventListener('click', this._like.bind(this));
    this._post.querySelector(selectors.postImage).addEventListener('click', this._handleImageClick);
  }

  _renderLikes () {
    if(this._likes.length > 0) {
      this._post.querySelector(selectors.postLikeCounter).textContent = this._likes.length;
    }
  }

  _like () {
    const likeButton = this._post.querySelector(selectors.postLikeButton);
    const LikeCounter = this._post.querySelector(selectors.postLikeCounter);

    likeButton.classList.toggle(selectors.postLikeButtonIsActive);

    // if (likeButton.classList.contains(selectors.postLikeButtonIsActive)){
    //   LikeCounter.textContent = `${this._likes.length + 1}`;
    // }
    // else {
    //   if (LikeCounter.textContent === '1') {
    //     LikeCounter.textContent = '';
    //   }
    //   else {
    //     LikeCounter.textContent = `${this._likes.length}`;
    //   }
    // }
  }
}

export { Post }