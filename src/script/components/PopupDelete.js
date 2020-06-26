import Popup from './Popup.js';
import { renderLoading } from "../utils/functions";

export default class PopupDelete extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
  }

  open(_id) {
    this._id = _id;
    this._setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    renderLoading('loading', '#popup__delete');
    this._submit(this._id)
      .then(() => {
        document.getElementById(`${this._id}`).remove();
        this._popup.removeEventListener('submit', this._handleSubmit);
        this.close();
      })
      .catch(err => {
        renderLoading('error', '#popup__delete');
        console.log(err);
      })
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.addEventListener('submit', this._handleSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popup.removeEventListener('submit', this._handleSubmit);
  }
}
