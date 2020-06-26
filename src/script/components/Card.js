export default class Card {
  constructor({ name, link, likes, owner, _id }, cardSelector,
              handleCardClick, handleLike, handleDislike, handleDelete)
  {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._handleDelete = handleDelete;
  }

  _getTemplate = () => {
    return document.querySelector(this._cardSelector).content.cloneNode(true);
  }

  generateCard = () => {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector('.element__image');

    this._cardElement.querySelector('.element').id = this._id;
    this._cardImageElement.src = this._link;
    this._cardElement.querySelector('.element__title').textContent = this._name;
    this._cardImageElement.alt = this._name;
    this._cardElement.querySelector('.element__like-counter').textContent = this._likes.length;
    if (this._owner._id !== '93aa0e2478194f00a02fb5e7') {
      this._cardElement.querySelector('.element__delete').classList.add('element__delete_hidden');
    }
    this._likes.forEach(like => {
      if (like._id === '93aa0e2478194f00a02fb5e7') {
        this._cardElement.querySelector('.element__like').classList.add('element__like_active');
      }
    })

    this._setEventListeners();
    return this._cardElement;
  }

  _like = (evt) => {
    if (!evt.target.classList.contains('element__like_active')) {
      this._handleLike(this._id)
        .then(res => {
          evt.target.classList.add('element__like_active');
          this._likes = res.likes;
          evt.target.closest('.element').querySelector('.element__like-counter').textContent = this._likes.length;
        })
        .catch(err => console.log(err))
    } else {
      this._handleDislike(this._id)
        .then(res => {
          evt.target.classList.remove('element__like_active');
          this._likes = res.likes;
          evt.target.closest('.element').querySelector('.element__like-counter').textContent = this._likes.length;
        })
        .catch(err => console.log(err))
    }
  }

  _delete = () => {
    this._handleDelete(this._id);
    this._removeEventListeners();
  }

  _setEventListeners = () => {
    this._cardElement.querySelector('.element__like').addEventListener('click', this._like);
    this._cardElement.querySelector('.element__delete').addEventListener('click', this._delete);
    this._cardImageElement.addEventListener('click', this._handleCardClick);
  }

  _removeEventListeners = () => {
    const cardElement = document.getElementById(`${this._id}`);
    cardElement.querySelector('.element__like').removeEventListener('click', this._like);
    cardElement.querySelector('.element__delete').removeEventListener('click', this._delete);
    cardElement.querySelector('.element__image').removeEventListener('click', this._handleCardClick);
  }
}
