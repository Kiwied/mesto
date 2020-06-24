export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    this._renderer = options.renderer;
  }

  getInitialCards() {
    let initialCards = [];
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `${this._token}`
      }
    })/*
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((result) => {
        console.log(result);
        initialCards.name = result.name;
        initialCards.link = result.link;
        //return result;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });*/
  }

  renderCards() {
    console.log('123');
    for (let i = 1; i < this.getInitialCards().length; i++) {
      this._renderer(this.getInitialCards()[i]);
      console.log(this.getInitialCards()[i]);
    }
  }
}


