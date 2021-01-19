export default class Api {
  constructor (options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authKey = options.headers.authorization;
  }  

  _checkResponse(response) {
    if(response.ok) {
      return response.json()
    }
    else {
      return Promise.reject(`Ошибка ${response.status}`)
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: `${this._authKey}`
        },
        method: 'GET'
      }
    )
      .then(res => this._checkResponse(res)) 
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        headers: {
          authorization: `${this._authKey}`
        },
        method: 'GET'
      }
    )
    .then(res => this._checkResponse(res)) 
  }

  editUserProfile({username, description}) {
    return fetch(`${this._url}/users/me`, {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          name: username,
          about: description
        })
      }
    )
    .then(res => this._checkResponse(res)) 
  }

  setAvatar({link}) {
    return fetch(`${this._url}/users/me/avatar` ,{
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar: link
        })
      }
    )
    .then(res => this._checkResponse(res))
  }

  addNewPost({name, link}) {
    return fetch(`${this._url}/cards`,{
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          name: name,
          link: link
        })
      }
    )
    .then(res => this._checkResponse(res))
  }

  likePost(isLiked, cardId) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        headers: {
          authorization: `${this._authKey}`
        },
        method: 'DELETE'
      })
      .then(res => this._checkResponse(res))
    }
    else {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        headers: {
          authorization: `${this._authKey}`
        },
        method: 'PUT'
      })
      .then(res => this._checkResponse(res))
    }
  }

  deletePost(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        headers: {
          authorization: `${this._authKey}`
        },
        method: 'DELETE'
      }
    )
    .then(res => this._checkResponse(res))
  }

  uploadAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
        headers: {
          authorization: `${this._authKey}`
        },
        method: 'PATCH',
        body: JSON.stringify({
          link: link
        })
      }
    )
    .then(res => this._checkResponse(res))
  }
}