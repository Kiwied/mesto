import './index.css';
import Card from '../script/components/Card.js';
import FormValidator from "../script/components/FormValidator.js";
import Section from "../script/components/Section.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import UserInfo from "../script/components/UserInfo.js";
import {
  newAvatarPopup,
  newAvatarLink,
  profilePopup,
  editButton,
  formName,
  formDescription,
  addButton,
  newCardPopup,
  newCardName,
  newCardLink,
  formObject,
  avatar,
  profileAvatar
} from '../script/utils/constants.js';
import Api from "../script/components/Api.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '46554895-2128-4943-bcbf-ffff5703844f',
    'Content-Type': 'application/json'
  }
});

const validatorProfile = new FormValidator(formObject, profilePopup);
const validatorNewCard = new FormValidator(formObject, newCardPopup);
const validatorAvatar = new FormValidator(formObject, newAvatarPopup);
validatorProfile.enableValidation();
validatorNewCard.enableValidation();
validatorAvatar.enableValidation();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

const popupProfile = new PopupWithForm('#popup__profile', (newProfileInfo) => {
  api.setNewUserInfo(newProfileInfo)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(res => {
      console.log(res);
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`)
    });
});

const popupBigImage = new PopupWithImage('#popup__enlarged');

const popupNewCard = new PopupWithForm('#popup__new-card', (formInputs) => {
  const newCard = new Card(formInputs, '#card', (evt) => {
    popupBigImage.open(evt)
  });
  cardsSection.addItem(newCard.generateCard());
  popupNewCard.close();
});

const popupAvatar = new PopupWithForm('#popup__avatar', (urlInput) => {
  api.setNewAvatar(urlInput)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`)
    });
})

avatar.addEventListener('click', () => {
  newAvatarLink.value = '';
  validatorAvatar.resetValidation();
  popupAvatar.open();
});

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  formName.value = userData.name;
  formDescription.value = userData.description;

  validatorProfile.resetValidation();
  popupProfile.open();
});

addButton.addEventListener('click', () => {
  newCardName.value = '';
  newCardLink.value = '';
  validatorNewCard.resetValidation();
  popupNewCard.open();
});

const cardsSection = new Section(
  ({ name, link }) => {
    const card = new Card({ name, link }, '#card', (evt) => {
      popupBigImage.open(evt);
    });
    const cardElement = card.generateCard();
    cardsSection.addItem(cardElement);
  }
, '.elements');

api.getInitialCards()
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then(res => {
    cardsSection.renderItems(res);
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`)
  });

api.getUserInfo()
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then(res => {
    userInfo.setUserInfo(res);
    userInfo.setAvatar(res);
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`)
  });
