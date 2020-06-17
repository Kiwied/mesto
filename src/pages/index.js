import './index.css';
import Card from '../script/components/Card.js';
import FormValidator from "../script/components/FormValidator.js";
import Section from "../script/components/Section.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import UserInfo from "../script/components/UserInfo.js";
import {
  profilePopup,
  editButton,
  formName,
  formDescription,
  addButton,
  newCardPopup,
  newCardName,
  newCardLink,
  formObject,
  formList,
  initialCards
} from '../script/utils/constants.js';

formList.forEach((formElement) => {
  const validator = new FormValidator(formObject, formElement);
  validator.enableValidation();
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

const popupProfile = new PopupWithForm('#popup__profile', (newProfileInfo) => {
  userInfo.setUserInfo(newProfileInfo);
});

const popupBigImage = new PopupWithImage('#popup__enlarged');

const popupNewCard = new PopupWithForm('#popup__new-card', () => {
  const newCardInfo = popupNewCard._getInputValues();
  const newCard = new Card(newCardInfo, '#card', (evt) => {
    popupBigImage.open(evt)
  });
  cardsSection.addItem(newCard.generateCard());
  popupNewCard.close();
});

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  formName.value = userData.name;
  formDescription.value = userData.description;

  const validator = new FormValidator(formObject, profilePopup);
  validator.resetValidation();
  popupProfile.open();
});

addButton.addEventListener('click', () => {
  newCardName.value = '';
  newCardLink.value = '';
  const validator = new FormValidator(formObject, newCardPopup);
  validator.resetValidation();
  popupNewCard.open();
});

const cardsSection = new Section({
  items: initialCards,
  renderer: ({ name, link }) => {
    const card = new Card({ name, link }, '#card', (evt) => {
      popupBigImage.open(evt);
    });
    const cardElement = card.generateCard();
    cardsSection.addItem(cardElement);
  }
}, '.elements');

cardsSection.renderItems();
