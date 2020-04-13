const editButton = document.querySelector('.buttons__edit');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.form__close');
let profileName = document.querySelector('.profile__name');
let formName = document.querySelector('.form__name');
let profileDescription = document.querySelector('.profile__description');
let formDescription = document.querySelector('.form__description');
const saveButton = document.querySelector('.form__save');

function open() {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

function close() {
  popup.classList.remove('popup_opened');
}

function save() {
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  close();
}

editButton.addEventListener('click', open);
closeButton.addEventListener('click', close);
saveButton.addEventListener('click', save);

