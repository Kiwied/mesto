const editButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.form__close');
let profileName = document.querySelector('.profile__name');
let formName = document.querySelector('.form__input_name');
let profileDescription = document.querySelector('.profile__description');
let formDescription = document.querySelector('.form__input_description');
const saveButton = document.querySelector('.form__save');

function open() {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

function close() {
  popup.classList.remove('popup_opened');
}

function save(e) {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  close();
}

editButton.addEventListener('click', open);
closeButton.addEventListener('click', close);
saveButton.addEventListener('click', save);

