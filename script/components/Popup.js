export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  open() {
    this._setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close = () => {
    this._removeEventListeners();
    this._popup.classList.remove('popup_opened');
  }

  _setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close');
    this._closeButton.addEventListener('click', this.close);
    this._popup.addEventListener('click', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEventListeners() {
    this._closeButton.removeEventListener('click', this.close);
    this._popup.removeEventListener('click', this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
