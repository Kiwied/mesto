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

const cardTemplate = document.querySelector('#card').content;

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
    evt.target.classList.remove('popup_opened');
  }
}

function escapeClose(evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
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

function resetValidation (popup) {
  const formObject = {inactiveButtonClass: 'form__save_inactive'};
  const errorList = Array.from(popup.querySelectorAll('.form__input-error'));
  const inputList = Array.from(popup.querySelectorAll('.form__input'));
  const buttonElement = popup.querySelector('.form__save');

  toggleButtonState(inputList, buttonElement, formObject);

  errorList.forEach((span) => {
    span.classList.remove('form__input-error_active');
  });
  inputList.forEach((input) => {
    input.classList.remove('form__input_type_error');
  });
}

function pressLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function pressImage(evt) {
  place.textContent = evt.target.alt;
  bigImage.alt = evt.target.alt;
  bigImage.src = evt.target.src;
  openPopup(bigCard);
}

function pressDelete(evt) {
  const card = evt.target.closest('.element');
  card.querySelector('.element__like').removeEventListener('click', pressLike);
  card.querySelector('.element__image').removeEventListener('click', pressImage);
  card.remove();
}

function createCard(nameValue, linkValue) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector('.element__image');

  cardImageElement.src = linkValue;
  cardElement.querySelector('.element__title').textContent = nameValue;
  cardImageElement.alt = nameValue;

  cardElement.querySelector('.element__like').addEventListener('click', pressLike);
  cardElement.querySelector('.element__delete').addEventListener('click', pressDelete, {once: true});
  cardImageElement.addEventListener('click', pressImage);

  return cardElement;
};

function addCard(nameValue, linkValue) {
  cardsContainer.prepend(createCard(nameValue, linkValue));
};

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
closeButtonBigCard.addEventListener('click', () => closePopup(bigCard));

profile.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  closePopup(profile);
});
newCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = newCardName.value;
  const link = newCardLink.value;
  addCard(name, link);
  closePopup(newCard);
});

initialCards.forEach((element) => {addCard(element.name, element.link)});




