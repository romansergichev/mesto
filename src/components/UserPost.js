import {Post} from './Post.js'
import {selectors} from '../utils/data.js'

export default class UserPost extends Post {
  constructor({data, handleImageClick, handleDeleteClick}, template) {
    super({data, handleImageClick}, template);
    this._handleDeleteClick = handleDeleteClick;
  }
  _setListeners () {
    super._setListeners()
    this._post.querySelector(selectors.postDeleteButton).addEventListener('click', this._handleDeleteClick);
  }

  delete () {
    this._post.remove();
    this._post = null;
  }
}