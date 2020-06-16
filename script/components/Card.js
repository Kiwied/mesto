export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector('.element__image');

    this._cardImageElement.src = this._link;
    this._cardElement.querySelector('.element__title').textContent = this._name;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });

    this._cardElement.querySelector('.element__delete').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
    }, {once: true});

    this._cardImageElement.addEventListener('click', this._handleCardClick);

  }
}
