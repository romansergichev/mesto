import {selectors} from '../utils/data.js'

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  appendItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderLikes (post, data, userdata) {
    this._post = post
    this._likes = data.likes
    this._isLiked = JSON.stringify(this._likes).includes(JSON.stringify(userdata))

    if(this._likes.length > 0) {
      this._post.querySelector(selectors.postLikeCounter).textContent = this._likes.length; 
    }

    if (this._isLiked) {
      this._post.querySelector(selectors.postLikeButton).classList.add(selectors.postLikeButtonIsActive)
    }
  }

  renderPosts(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }   
}