import Popup from './Popup.js';
import { renderLoading } from "../utils/functions.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupSelector = popupSelector;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._formInputs = {};
    this._inputList.forEach((input) => {
      this._formInputs[input.name] = input.value;
    });
    return this._formInputs;
  }

  _handleFormSubmit = (evt) => {
    evt.preventDefault();
    renderLoading('loading', this._popupSelector);
    this._formSubmit(this._getInputValues())
      .then(() => this.close())
      .catch(err => {
        renderLoading('error', this._popupSelector);
        console.log(err);
      })
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.querySelector('form').addEventListener('submit', this._handleFormSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popup.querySelector('form').removeEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._popup.querySelector('form').reset();
  }
}
