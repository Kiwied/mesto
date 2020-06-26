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
  const submitButton = document.querySelector(selector).querySelector('.form__save');
  if (isLoading === 'loading') {
    submitButton.textContent = 'Загрузка...';
  } else if (isLoading === 'error') {
    submitButton.textContent = 'Ошибка';
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
  renderLoading('loading', '#popup__profile');
  api.setNewUserInfo(newProfileInfo)
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      renderLoading('error', '#popup__profile');
      console.log(err);
    })
});

const popupBigImage = new PopupWithImage('#popup__enlarged');

const popupDelete = new PopupDelete('#popup__delete', (_id) => {
  renderLoading('loading', '#popup__delete');
  api.delete(_id)
    .catch(err => {
      renderLoading('error', '#popup__delete');
      console.log(err);
    })
});

const popupNewCard = new PopupWithForm('#popup__new-card', (formInputs) => {
  renderLoading('loading', '#popup__new-card');
  api.addNewCard(formInputs)
    .then(res => {
      cardsSection.renderItems([res]);
    })
    .catch(err => {
      renderLoading('error', '#popup__new-card');
      console.log(err);
    })
});

const popupAvatar = new PopupWithForm('#popup__avatar', (urlInput) => {
  renderLoading('loading', '#popup__avatar');
  api.setNewAvatar(urlInput)
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      renderLoading('error', '#popup__avatar');
      console.log(err);
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
