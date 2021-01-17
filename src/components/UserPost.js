import {Post} from './Post.js'
import {selectors} from '../utils/data.js'

export default class UserPost extends Post {
  _setListeners() {
    super._setListeners()
    this._post.querySelector(selectors.postDeleteButton).addEventListener('click', this._delete.bind(this));
  }

  _delete () {
    this._post.remove();
    this._post = null;
  }
}