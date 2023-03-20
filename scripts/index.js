import Card from "./Сard.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./initialCards.js";

const popupOpenButtonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profilePopup');
const imagePopup = document.querySelector("#imagePopup");
const cardAddPopup = document.querySelector('#addCardPopup');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const formEditProfile = document.querySelector('#formEditProfile');
const formAddCard = document.querySelector('#formAddCard');
const inputName = formEditProfile.querySelector('.form__input_type_name');
const inputStatus = formEditProfile.querySelector('.form__input_type_status');
const profilePopupCloseButton = document.querySelector('#profilePopupCloseButton');
const imagePopupCloseButton = document.querySelector("#imagePopupCloseButton");
const cardPopupCloseButton = document.querySelector("#addPopupCloseButton");
const cardsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('#template').content.querySelector('.element');
const popupOpenButtonAdd = document.querySelector('.profile__add-button');
const inputPlaceName = document.querySelector('.form__input_place-name');
const inputPlaceLink = document.querySelector('.form__input_type_link');
const allPopups = document.querySelectorAll('.popup');
const popupImgTitle = document.querySelector('.popup__img-title');
const popupImgPhoto = document.querySelector('.popup__img-photo');
const validationSettings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    inputErrorClass: 'form__input-error',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
};

const profileFormValidator = new FormValidator(validationSettings, formEditProfile);
const cardFormValidator = new FormValidator(validationSettings, formAddCard);

function closePopup(popup) {
    document.removeEventListener('keyup', closeByEscape);
    popup.classList.remove('popup_opened');
}

const closeModalByOverlay = () => {
    const popupList = Array.from(allPopups);

    popupList.forEach((popup) => {
        popup.addEventListener('click', (event) => {
            if (event.target === popup) {
                closePopup(popup)
            }
        })
    })
};

closeModalByOverlay();

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');

    document.addEventListener('keyup', closeByEscape);
}

const openImagePopup = (name, link) => {
    popupImgTitle.textContent = name;
    popupImgPhoto.src = link;
    popupImgPhoto.alt = name;

    openPopup(imagePopup);
};

const openProfilePopup = function () {
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;

    openPopup(profilePopup);

    profileFormValidator.resetValidation();
}

const openCardPopup = function () {
    openPopup(cardAddPopup);

    cardFormValidator.resetValidation();
}

const handleProfileFormSubmit = function (e) {
    e.preventDefault();

    profileName.textContent = inputName.value;
    profileStatus.textContent = inputStatus.value;

    closePopup(profilePopup);
}

const handleCardFormSubmit = function (evt) {
    evt.preventDefault();

    const name = inputPlaceName.value;
    const link = inputPlaceLink.value;

    const card = new Card(name, link, templateElement, openImagePopup);

    cardsContainer.prepend(card.generateCard());

    closePopup(cardAddPopup);
}

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, templateElement, openImagePopup);
    const cardElement = card.generateCard();

    cardsContainer.append(cardElement);
});

/*Валидация*/

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

popupOpenButtonEdit.addEventListener('click', openProfilePopup);

popupOpenButtonAdd.addEventListener('click', openCardPopup);

imagePopupCloseButton.addEventListener('click', () => {
    closePopup(imagePopup)
});

profilePopupCloseButton.addEventListener('click', () => {
    closePopup(profilePopup)
});

cardPopupCloseButton.addEventListener('click', () => {
    closePopup(cardAddPopup)
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

formAddCard.addEventListener('submit', handleCardFormSubmit);





