import Card from './Card.js';
import FormValidator from "./FormValidator.js";

const profilePopup = document.querySelector('#popup__profile');
const profileName = document.querySelector('.profile__name');
const editButton = document.querySelector('.profile__edit');
const closeButtonProfile = profilePopup.querySelector('.form__close');
const formName = document.querySelector('.form__input_name');
const profileDescription = document.querySelector('.profile__description');
const formDescription = document.querySelector('.form__input_description');

const addButton = document.querySelector('.profile__add');

const newCardPopup = document.querySelector('#popup__new-card');
const newCardName = newCardPopup.querySelector('.form__input_name');
const newCardLink = newCardPopup.querySelector('.form__input_link');
const closeButtonNewCard = newCardPopup.querySelector('.form__close');
const cardsContainer = document.querySelector('.elements');

const bigCardPopup = document.querySelector('#popup__enlarged');
const closeButtonBigCard = bigCardPopup.querySelector('.popup__close');


const initialCards = [
  {
    name: 'Сапай',
    link: 'images/supai.jpg'
  },
  {
    name: 'Тироль',
    link: 'images/tirol.jpg'
  },
  {
    name: 'Сумба',
    link: 'images/sumba.jpg'
  },
  {
    name: 'Даррингтон',
    link: 'images/Darrington.jpg'
  },
  {
    name: 'Фудзияма',
    link: 'images/fuji.jpg'
  },
  {
    name: 'Парк Картье',
    link: 'images/canada.jpg'
  }
];

const formObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function overlayClose(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function escapeClose(evt) {
  if (evt.code === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.addEventListener('click', overlayClose);
  document.addEventListener('keydown', escapeClose);
  togglePopup(popup);
}

function closePopup(popup) {
  popup.removeEventListener('click', overlayClose);
  document.removeEventListener('keydown', escapeClose);
  togglePopup(popup);
}

editButton.addEventListener('click', () => {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
  const validator = new FormValidator(formObject, profilePopup);
  validator.resetValidation();
  openPopup(profilePopup);
});
addButton.addEventListener('click', () => {
  newCardName.value = '';
  newCardLink.value = '';
  const validator = new FormValidator(formObject, newCardPopup);
  validator.resetValidation();
  openPopup(newCardPopup);
});
closeButtonBigCard.addEventListener('click', () => closePopup(bigCardPopup));
closeButtonProfile.addEventListener('click', () => closePopup(profilePopup));
closeButtonNewCard.addEventListener('click', () => closePopup(newCardPopup));


profilePopup.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  closePopup(profilePopup);
});
newCardPopup.addEventListener('submit', (e) => {
  e.preventDefault();
  const newCardInfo =
      {
        name: newCardName.value,
        link: newCardLink.value
      };
  const card = new Card(newCardInfo, '#card');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);

  closePopup(newCardPopup);
});

initialCards.forEach((element) => {
  const card = new Card(element, '#card');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});

const formList = Array.from(document.querySelectorAll(formObject.formSelector));
formList.forEach((formElement) => {
  const validator = new FormValidator(formObject, formElement);
  validator.enableValidation();
});
