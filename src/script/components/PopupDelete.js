import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
  }

  submitDelete = (_id) => {
    this.open();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      document.getElementById(`${_id}`).remove();
      this._submit(_id);
      this.close();
    })
  }
}
