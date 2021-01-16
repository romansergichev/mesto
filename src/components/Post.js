import { selectors } from '../utils/data.js';

class Post {
  constructor({data, handleImageClick}, template) {
    this._name = data.name;
    this._link = data.link;
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
    this._post.querySelector(selectors.postLikeButton).addEventListener('click', this._like.bind(this));

    this._post.querySelector(selectors.postImage).addEventListener('click', this._handleImageClick);
  }

  _like () {
    this._post.querySelector(selectors.postLikeButton).classList.toggle(selectors.postLikeButtonIsActive);
  }
}

export { Post }