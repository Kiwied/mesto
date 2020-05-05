const editButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.form__close');
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



function addCard(nameValue, linkValue) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').src = linkValue;
  cardElement.querySelector('.element__title').textContent = nameValue;
  cardElement.querySelector('.element__image').alt = nameValue;

  cardsContainer.append(cardElement);
};




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

initialCards.forEach((element) => {addCard(element.name, element.link)});
