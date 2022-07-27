class MoviesApi {
  constructor() {
    this._url = 'https://api.nomoreparties.co/beatfilm-movies';
    this._get = 'GET';
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res}`);
  }

  getInitialCards() {
    return fetch(`${this._url}`, {
      method: this._get
    })
      .then(this._checkAnswer);
  }
}

const moviesApi = new MoviesApi();
export default moviesApi;