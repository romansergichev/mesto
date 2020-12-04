import { openPopup, popupPhoto } from './script.js';

const modalImage = document.querySelector('.popup__post-image');
const modalTitle = document.querySelector('.popup__post-title');

class Post {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate () {
    const postTemplate = document
    .querySelector('#post-template')
    .content
    .querySelector('.post')
    .cloneNode(true);

    return postTemplate;
  }

  generateNewPost () {
    this._element = this._getTemplate();
    this._serListeners();

    this._element.querySelector('.post__image').src = this._link;
    this._element.querySelector('.post__image').alt = this._name;
    this._element.querySelector('.post__title').textContent = this._name;

    return this._element;
  }

  _serListeners () {
    this._element.querySelector('.post__like-button').addEventListener('click', () => this._like());
    this._element.querySelector('.post__delete').addEventListener('click', () => this._delete());
    this._element.querySelector('.post__image').addEventListener('click', () => this._openPhotoPopup());
  }

  _like () {
    this._element.querySelector('.post__like-button').classList.toggle('post__like-button_active');
  }

  _openPhotoPopup () {
    modalImage.src = this._link;
    modalImage.alt = this._name;
    modalTitle.textContent = this._name;
    openPopup(popupPhoto);
  }

  _delete () {
    this._element.querySelector('.post__delete').closest('.post').remove();
  }
}

export { Post }