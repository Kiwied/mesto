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
};

function pressLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function pressDelete(evt) {
  //С ними почему то не работает
  //evt.target.closest('.element__like').removeEventListener('click', pressLike);
  //evt.target.closest('.element__image').removeEventListener('click', pressImage);
  evt.target.closest('.element').remove();
}

function pressImage(evt) {
  togglePopup(bigCard);
  place.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
  bigImage.alt = evt.target.nextElementSibling.firstElementChild.textContent;
  bigImage.src = evt.target.src;
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
  togglePopup(profile);
});
addButton.addEventListener('click', () => {
  newCardName.value = '';
  newCardLink.value = '';
  togglePopup(newCard);
});

closeButtonProfile.addEventListener('click', () => togglePopup(profile));
closeButtonNewCard.addEventListener('click', () => togglePopup(newCard));
closeButtonBigCard.addEventListener('click', () => togglePopup(bigCard));

profile.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  togglePopup(profile);
});
newCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = newCardName.value;
  const link = newCardLink.value;
  addCard(name, link);
  togglePopup(newCard);
});

initialCards.forEach((element) => {addCard(element.name, element.link)});
