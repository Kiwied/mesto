const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const profile = document.querySelector('#popup_profile');
const newCard = document.querySelector('#popup_new-card');
const closeButtonProfile = profile.querySelector('.form__close');
const closeButtonNewCard = newCard.querySelector('.form__close');
let profileName = document.querySelector('.profile__name');
let formName = document.querySelector('.form__input_name');
let profileDescription = document.querySelector('.profile__description');
let formDescription = document.querySelector('.form__input_description');
const saveButton = document.querySelector('.form__save');
const cardsContainer = document.querySelector('.elements');

const initialCards = [
  {
      name: 'Карачаевск',
      link: 'images/karachaevsk.jpg'
  },
  {
      name: 'Гора Эльбрус',
      link: 'images/elbrus.jpg'
  },
  {
      name: 'Домбай',
      link: 'images/dombai.jpg'
  },
  {
      name: 'Сумба',
      link: 'images/sumba.jpg'
  },
  {
      name: 'Тироль',
      link: 'images/tirol.jpg'
  },
  {
      name: 'Сапай',
      link: 'images/supai.jpg'
  }
];

initialCards.forEach((element) => {addCard(element.name, element.link)});

function addCard(nameValue, linkValue) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').src = linkValue;
  cardElement.querySelector('.element__title').textContent = nameValue;
  cardElement.querySelector('.element__image').alt = nameValue;

  cardsContainer.append(cardElement);
};




function openProfile() {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
  profile.classList.add('popup_opened');
}

function openNewCard() {
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
  newCard.classList.add('popup_opened');
}

function close() {
  profile.classList.remove('popup_opened');
  newCard.classList.remove('popup_opened');
}

function save(e) {
  e.preventDefault();
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  close();
}

editButton.addEventListener('click', openProfile);
addButton.addEventListener('click', openNewCard);
closeButtonProfile.addEventListener('click', close);
closeButtonNewCard.addEventListener('click', close);
saveButton.addEventListener('click', save);




