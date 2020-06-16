import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._formInputs = {};
    this._inputList.forEach((input) => {
      this._formInputs[input.name] = input.value;
    });
    return this._formInputs;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._popup.querySelector('form').reset();
  }
}
