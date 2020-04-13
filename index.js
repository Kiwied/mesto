let btnEdit = document.querySelector('.buttons__edit');
let popup = document.querySelector('.popup');
let btnClose = document.querySelector('.form__close');

function open() {
  popup.classList.add('popup_opened');
}

function close() {
  popup.classList.remove('popup_opened');
}

btnEdit.addEventListener('click', open);
btnClose.addEventListener('click', close);
