class MainApi {
  constructor() {
    this._baseUrl = 'http://localhost:3001';
    this._post = 'POST';
    this._get = 'GET';
    this._delete = 'DELETE';
    this._put = 'PUT';
    this._patch = 'PATCH';
    this._link = 'https://api.nomoreparties.co';
  }

  get _headers() {
    return {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res}`);
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name, password, email })
    })
      .then(this._checkAnswer);
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email })
    })
      .then(this._checkAnswer);
  }


  updateProfile(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: this._patch,
      headers: this._headers,
      body: JSON.stringify({ name, email })
    })
      .then(this._checkAnswer);
  }

  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkAnswer);
  }

  getInitialSavedCards() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers
    })
      .then(this._checkAnswer);
  }

  addSavedCard(card) {
    return fetch(`${this._baseUrl}/movies`, {
      method: this._post,
      headers: this._headers,
      body: JSON.stringify({
        "movieId": card.id,
        "nameRU": card.nameRU,
        "nameEN": card.nameEN,
        "director": card.director,
        "country": card.country,
        "year": card.year,
        "duration": card.duration,
        "description": card.description,
        "trailerLink": card.trailerLink,
        "image": `${this._link}${card.image.url}`,
        "thumbnail": `${this._link}${card.image.formats.thumbnail.url}`
      })
    })
      .then(this._checkAnswer);
  }

  deleteSavedCard(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: this._delete,
      headers: this._headers
    })
      .then(this._checkAnswer);
  }


  // setUserProfile(data) {
  //   return fetch(`${this._url}${this._users}${this._me}`, {
  //     method: this._patch,
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: data.name,
  //       about: data.description
  //     })
  //   })
  //     .then(this._checkAnswer);
  // }



  // deleteCard(id) {
  //   return fetch(`${this._url}${this._cards}/${id}`, {
  //     method: this._delete,
  //     headers: this._headers
  //   })
  //     .then(this._checkAnswer);
  // }

  // addLike(id) {
  //   return fetch(`${this._url}${this._cards}/${id}${this._likes}`, {
  //     method: this._put,
  //     headers: this._headers
  //   })
  //     .then(this._checkAnswer);
  // }

  // deleteLike(id) {
  //   return fetch(`${this._url}${this._cards}/${id}${this._likes}`, {
  //     method: this._delete,
  //     headers: this._headers
  //   })
  //     .then(this._checkAnswer);
  // }

  // updateAvatar(avatar) {
  //   return fetch(`${this._url}${this._users}${this._me}${this._avatar}`, {
  //     method: this._patch,
  //     headers: this._headers,
  //     body: JSON.stringify({ avatar })
  //   })
  //     .then(this._checkAnswer);
  // }






}

const Api = new MainApi();
export default Api;