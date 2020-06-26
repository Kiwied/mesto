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
  apiInfo
} from '../script/utils/constants.js';
import Api from "../script/components/Api.js";
import PopupDelete from "../script/components/PopupDelete.js";

const api = new Api(apiInfo);

function renderLoading(isLoading, selector) {
  const submitButton = document.querySelector(selector).querySelector('.form__save')
  if (isLoading) {
    submitButton.textContent = 'Сохранение...'
  } else {
    submitButton.textContent = submitButton.name;
  }
}

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
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoading(true, '#popup__profile')
    })
});

const popupBigImage = new PopupWithImage('#popup__enlarged');

const popupDelete = new PopupDelete('#popup__delete', (_id) => {
    api.delete(_id)
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        renderLoading(true, '#popup__delete')
      })
  });

const popupNewCard = new PopupWithForm('#popup__new-card', (formInputs) => {
  api.addNewCard(formInputs)
    .then(res => {
      cardsSection.renderItems([res]);
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoading(true, '#popup__new-card')
    })
});

const popupAvatar = new PopupWithForm('#popup__avatar', (urlInput) => {
  api.setNewAvatar(urlInput)
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoading(true, '#popup__avatar')
    })
})

avatar.addEventListener('click', () => {
  newAvatarLink.value = '';
  validatorAvatar.resetValidation();
  renderLoading(false, '#popup__avatar');
  popupAvatar.open();
});

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  formName.value = userData.name;
  formDescription.value = userData.description;
  renderLoading(false, '#popup__profile');
  validatorProfile.resetValidation();
  popupProfile.open();
});

addButton.addEventListener('click', () => {
  newCardName.value = '';
  newCardLink.value = '';
  renderLoading(false, '#popup__new-card');
  validatorNewCard.resetValidation();
  popupNewCard.open();
});

const cardsSection = new Section(
    ({ name, link, likes, owner, _id }) => {
    const card = new Card(
      { name, link, likes, owner, _id },
      '#card',
      (evt) => popupBigImage.open(evt),
      (_id) => api.like(_id),
      (_id) => api.dislike(_id),
      () => {
        renderLoading(false, '#popup__delete');
        popupDelete.submitDelete(_id);
      }
    )
      cardsSection.addItem(card.generateCard());
    }
    , '.elements');

api.getInitialCards()
  .then(res => {
    cardsSection.renderItems(res);
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`)
  });

api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res);
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`)
  });
