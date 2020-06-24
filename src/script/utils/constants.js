import supai from '../../images/supai.jpg';
import tirol from '../../images/tirol.jpg';
import sumba from '../../images/sumba.jpg';
import darrington from '../../images/Darrington.jpg';
import fuji from '../../images/fuji.jpg';
import canada from '../../images/canada.jpg';

export const profilePopup = document.querySelector('#popup__profile');
export const editButton = document.querySelector('.profile__edit');
export const formName = document.querySelector('.form__input_name');
export const formDescription = document.querySelector('.form__input_description');
export const addButton = document.querySelector('.profile__add');
export const newCardPopup = document.querySelector('#popup__new-card');
export const newCardName = newCardPopup.querySelector('.form__input_name');
export const newCardLink = newCardPopup.querySelector('.form__input_link');
export const newAvatarPopup = document.querySelector('#popup__avatar');
export const newAvatarLink = newAvatarPopup.querySelector('.form__input_link');
export const avatar = document.querySelector('.profile__avatar-container');

export const formObject = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const formList = Array.from(document.querySelectorAll(formObject.formSelector));
