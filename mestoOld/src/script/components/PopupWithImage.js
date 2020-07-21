import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (evt) => {
    const image = this._popup.querySelector('.popup__image');
    const place = this._popup.querySelector('.popup__place');

    place.textContent = evt.target.alt;
    image.alt = evt.target.alt;
    image.src = evt.target.src;
    super.open();
  }
}
