import { openPopup, popupPhoto } from './script.js';

const modalImage = document.querySelector('.popup__post-image');
const modalTitle = document.querySelector('.popup__post-title');

class Post {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = template;
  }

  _getTemplate () {
    const postTemplate = document
    .querySelector('#post-template')
    .content.querySelector('.post')
    .cloneNode(true);

    return postTemplate;
  }

  generateNewPost () {
    this._post = this._getTemplate();
    const postImage = this._post.querySelector('.post__image');

    this._serListeners();

    postImage.src = this._link;
    postImage.alt = this._name;

    this._post.querySelector('.post__title').textContent = this._name;

    return this._post;
  }

  _serListeners () {
    this._post.querySelector('.post__like-button').addEventListener('click', () => this._like());
    this._post.querySelector('.post__delete').addEventListener('click', () => this._delete());
    this._post.querySelector('.post__image').addEventListener('click', () => this._openPhotoPopup());
  }

  _like () {
    this._post.querySelector('.post__like-button').classList.toggle('post__like-button_active');
  }

  _openPhotoPopup () {
    modalImage.src = this._link;
    modalImage.alt = this._name;
    modalTitle.textContent = this._name;
    openPopup(popupPhoto);
  }

  _delete () {
    this._post.remove();
    this._post = null;
  }
}

export { Post }