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
      .then(this._checkResponse) 
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        headers: {
          authorization: `${this._authKey}`
        },
        method: 'GET'
      }
    )
    .then(this._checkResponse) 
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
    .then(this._checkResponse) 
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
    .then(this._checkResponse)
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
    .then(this._checkResponse)
  }

  likePost(isLiked, cardId) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        headers: {
          authorization: `${this._authKey}`
        },
        method: 'DELETE'
      })
      .then(this._checkResponse)
    }
    else {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        headers: {
          authorization: `${this._authKey}`
        },
        method: 'PUT'
      })
      .then(this._checkResponse)
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
    .then(this._checkResponse)
  }
}