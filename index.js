const profile = document.querySelector('#popup__profile');
let profileName = document.querySelector('.profile__name');
const editButton = document.querySelector('.profile__edit');
const closeButtonProfile = profile.querySelector('.form__close');
let formName = document.querySelector('.form__input_name');
let profileDescription = document.querySelector('.profile__description');
let formDescription = document.querySelector('.form__input_description');

const addButton = document.querySelector('.profile__add');

const newCard = document.querySelector('#popup__new-card');
let newCardName = newCard.querySelector('.form__input_name');
let newCardLink = newCard.querySelector('.form__input_link');
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
    name: 'Домбай',
    link: 'images/dombai.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/elbrus.jpg'
  },
  {
    name: 'Карачаевск',
    link: 'images/karachaevsk.jpg'
  }
];

function addCard(nameValue, linkValue) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').src = linkValue;
  cardElement.querySelector('.element__title').textContent = nameValue;
  cardElement.querySelector('.element__image').alt = nameValue;
  cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  cardElement.querySelector('.element__delete').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__image').addEventListener('click', (evt) => {
    bigCard.classList.add('popup_opened');
    place.textContent = nameValue;
    bigImage.alt = nameValue;
    bigImage.src = linkValue;
  });
  cardsContainer.prepend(cardElement);
};

initialCards.forEach((element) => {addCard(element.name, element.link)});

function close() {
  profile.classList.remove('popup_opened');
  newCard.classList.remove('popup_opened');
  bigCard.classList.remove('popup_opened');
}

editButton.addEventListener('click', () => {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
  profile.classList.add('popup_opened');
});
addButton.addEventListener('click', () => {
  newCardName.value = '';
  newCardLink.value = '';
  newCard.classList.add('popup_opened');
});

closeButtonProfile.addEventListener('click', close);
closeButtonNewCard.addEventListener('click', close);
closeButtonBigCard.addEventListener('click', close);

profile.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  close();
});
newCard.addEventListener('submit', (e) => {
  e.preventDefault();
  let name = newCardName.value;
  let link = newCardLink.value;
  addCard(name, link);
  close();
});





