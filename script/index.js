import {Card} from './Card.js';
import {FormValidator} from "./FormValidator.js";

const profile = document.querySelector('#popup__profile');
const profileName = document.querySelector('.profile__name');
const editButton = document.querySelector('.profile__edit');
const closeButtonProfile = profile.querySelector('.form__close');
const formName = document.querySelector('.form__input_name');
const profileDescription = document.querySelector('.profile__description');
const formDescription = document.querySelector('.form__input_description');

const addButton = document.querySelector('.profile__add');

const newCard = document.querySelector('#popup__new-card');
const newCardName = newCard.querySelector('.form__input_name');
const newCardLink = newCard.querySelector('.form__input_link');
const closeButtonNewCard = newCard.querySelector('.form__close');
const cardsContainer = document.querySelector('.elements');

const bigCard = document.querySelector('#popup__enlarged');
const bigImage = bigCard.querySelector('.popup__image');
const place = bigCard.querySelector('.popup__place');
const closeButtonBigCard = bigCard.querySelector('.popup__close');


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
  console.log('Escape!');
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

function resetValidation(popup) {
  const inputList = Array.from(popup.querySelectorAll(formObject.inputSelector));
  const buttonElement = popup.querySelector(formObject.submitButtonSelector);

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formObject.inactiveButtonClass);
    buttonElement.disabled = false;
  };

  inputList.forEach((inputElement) => {
    const errorElement = popup.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(formObject.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(formObject.errorClass);
  });
}

editButton.addEventListener('click', () => {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
  resetValidation(profile);
  openPopup(profile);
});
addButton.addEventListener('click', () => {
  newCardName.value = '';
  newCardLink.value = '';
  resetValidation(newCard);
  openPopup(newCard);
});
closeButtonBigCard.addEventListener('click', () => closePopup(bigCard));
closeButtonProfile.addEventListener('click', () => closePopup(profile));
closeButtonNewCard.addEventListener('click', () => closePopup(newCard));


profile.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  closePopup(profile);
});
newCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const newCardInfo =
      {
        name: newCardName.value,
        link: newCardLink.value
      };
  const card = new Card(newCardInfo, '#card');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);

  closePopup(newCard);
});

initialCards.forEach((element) => {
  const card = new Card(element, '#card');
  const cardElement = card.generateCard();

  cardsContainer.prepend(cardElement);
});

const formList = Array.from(document.querySelectorAll(formObject.formSelector));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const validator = new FormValidator(formObject, formElement);
  validator.enableValidation();
});

export {openPopup, place, bigImage, bigCard};



