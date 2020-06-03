import {Card} from './Card.js';

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

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function overlayClose(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function escapeClose(evt) {
  if (evt.key === 'Escape') {
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

  toggleButtonState(inputList, buttonElement, formObject);

  inputList.forEach((input) => {
    hideInputError(popup, input, formObject);
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

export {openPopup, closePopup, place, bigImage, bigCard, closeButtonBigCard};



