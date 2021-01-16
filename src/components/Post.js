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
    // this._post.insertAdjacentHTML('afterbegin', '<button class="post__delete opacity"></button>');

    console.log(this._post);
    this._serListeners();

    postImage.src = this._link;
    postImage.alt = this._name;

    this._post.querySelector(selectors.postTitle).textContent = this._name;

    return this._post;
  }

  _serListeners () {
    this._post.querySelector(selectors.postLikeButton).addEventListener('click', this._like.bind(this));
    this._post.querySelector(selectors.postDeleteButton).addEventListener('click', this._delete.bind(this));
    this._post.querySelector(selectors.postImage).addEventListener('click', this._handleImageClick);
  }

  _like () {
    this._post.querySelector(selectors.postLikeButton).classList.toggle(selectors.postLikeButtonIsActive);
  }

  _delete () {
    this._post.remove();
    this._post = null;
  }
}

export { Post }