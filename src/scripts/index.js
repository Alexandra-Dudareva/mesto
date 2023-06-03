import Card from "../../components/Сard.js";
import FormValidator from "../../components/FormValidator.js";
import initialCards from "../../utils/initialCards.js";
import Section from "../../components/Section.js";
import PopupWithImage from "../../components/PopupWithImage.js";
import PopupWithForm from "../../components/PopupWithForm.js";
import UserInfo from "../../components/UserInfo.js";
import '../pages/index.css';

const popupOpenButtonEdit = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('#formEditProfile');
const formAddCard = document.querySelector('#formAddCard');
const inputName = formEditProfile.querySelector('.form__input_type_name');
const inputStatus = formEditProfile.querySelector('.form__input_type_status');
const cardsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('#template').content.querySelector('.element');
const popupOpenButtonAdd = document.querySelector('.profile__add-button');
const inputPlaceName = document.querySelector('.form__input_place-name');
const inputPlaceLink = document.querySelector('.form__input_type_link');
const validationSettings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    inputErrorClass: 'form__input-error',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
};

const profileFormValidator = new FormValidator(validationSettings, formEditProfile);
const cardFormValidator = new FormValidator(validationSettings, formAddCard);

/*Popup*/
const userInfo = new UserInfo('profile__name', 'profile__status');


const handleProfileFormSubmit = function () {
    userInfo.setUserInfo(inputName.value, inputStatus.value);

    profilePopup.close();
}

const handleCardFormSubmit = function () {
    const name = inputPlaceName.value;
    const link = inputPlaceLink.value;

    const newCard = createCard(name, link);

    cardsContainer.prepend(newCard);

    cardPopup.close();
}

const openProfilePopup = function () {
    const currentUserInfo = userInfo.getUserInfo();

    inputName.value = currentUserInfo.userName;
    inputStatus.value = currentUserInfo.userDescription;

    profilePopup.open();

    profileFormValidator.resetValidation();
}

const openCardPopup = function () {
    inputPlaceName.value = '';
    inputPlaceLink.value = '';

    cardPopup.open();

    cardFormValidator.resetValidation();
}

const profilePopup = new PopupWithForm('profilePopup', () => handleProfileFormSubmit());
const cardPopup = new PopupWithForm('addCardPopup', () => handleCardFormSubmit());
const picturePopup = new PopupWithImage('imagePopup');


/*Cards render*/

const createCard = function (name, link) {
    const card = new Card(name, link, templateElement, () => picturePopup.open(name, link));
    return card.generateCard();
};

const cardList = new Section({
    renderer: (item) => {
        const card = createCard(item.name, item.link);
        cardList.addItem(card);
    }
}, '.elements');

cardList.renderItems(initialCards);

/*Валидация*/

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

popupOpenButtonEdit.addEventListener('click', openProfilePopup);

popupOpenButtonAdd.addEventListener('click', openCardPopup);

profilePopup.setEventListeners();

cardPopup.setEventListeners();

picturePopup.setEventListeners();







