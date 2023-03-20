import Card from "./Сard.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./initialCards.js";

const popupOpenButtonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profilePopup');
const imagePopup = document.querySelector("#imagePopup");
const cardAddPopup = document.querySelector('#addCardPopup');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileForm = document.querySelector('.form');
const inputName = profileForm.querySelector('.form__input_type_name');
const inputStatus = profileForm.querySelector('.form__input_type_status');
const profilePopupCloseButton = document.querySelector('#profilePopupCloseButton');
const imagePopupCloseButton = document.querySelector("#imagePopupCloseButton");
const cardPopupCloseButton = document.querySelector("#addPopupCloseButton");
const cardsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('#template').content.querySelector('.element');
const popupOpenButtonAdd = document.querySelector('.profile__add-button');
const inputPlaceName = document.querySelector('.form__input_place-name');
const inputPlaceLink = document.querySelector('.form__input_type_link');
const cardFormAdd = document.querySelector('#addCardForm');
const allPopups = document.querySelectorAll('.popup');
const popupImgTitle = document.querySelector('.popup__img-title');
const popupImgPhoto = document.querySelector('.popup__img-photo');
const buttonAddCard = document.querySelector("#addCardSaveButton");

const openImagePopup = (name, link) => {
    popupImgTitle.textContent = name;
    popupImgPhoto.src = link;
    popupImgPhoto.alt = name;
    openPopup(imagePopup);
};

  export const validationSettings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    inputErrorClass: 'form__input-error',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
};

initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item.name, item.link, templateElement, openImagePopup);
    // Создаём карточку и возвращаем
    const cardElement = card.generateCard();

    // Добавляем в DOM
    cardsContainer.append(cardElement);
});

function closePopup(popup) {
    document.removeEventListener('keyup', closeByEscape);
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', closeByEscape);
}

const editPopupOpenHandler = function () {
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;

    openPopup(profilePopup);
}

const handleProfileFormSubmit = function (e) {
    e.preventDefault();

    profileName.textContent = inputName.value;
    profileStatus.textContent = inputStatus.value;

    closePopup(profilePopup);
}

/*Валидация*/
const profileFormValidator = new FormValidator(validationSettings, profilePopup);
const cardFormValidator = new FormValidator(validationSettings, cardFormAdd);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

/*const handleLikeClick = function (e) {
    const currentLikeButton = e.target.closest('.element__like-button');
    currentLikeButton.classList.toggle('element__like-button_active');
}*/

/*const handleDeleteItem = (e) => {
    const currentEl = e.target.closest('.element');
    currentEl.remove();
};*/



/*const createItemNode = (name, link) => {
    const currentItem = templateElement.cloneNode(true);
    const currentName = currentItem.querySelector('.element__text');
    const currentImage = currentItem.querySelector('.element__image');
    const buttonDelete = currentItem.querySelector('.element__delete-button');
    const buttonLike = currentItem.querySelector('.element__like-button');
    const imagePopupOpenButton = currentItem.querySelector('#elementImage');

    currentName.textContent = name;
    currentImage.src = link;
    currentImage.alt = name;

    buttonLike.addEventListener('click', handleLikeClick);
    imagePopupOpenButton.addEventListener('click', () => openImagePopup(name, link));
    buttonDelete.addEventListener('click', handleDeleteItem);

    return currentItem;
};*/

/*const render = () => {
    initialCards.forEach((item) => {
        const currentItem = createItemNode(item.name, item.link);
        cardsContainer.append(currentItem);
    });
};

render();*/

const disableAddButton = () => {
    buttonAddCard.classList.add('form__save-button_disabled');
    buttonAddCard.setAttribute('disabled', true);
}

const addNewCard = function (evt) {
    evt.preventDefault();

    const name = inputPlaceName.value;
    const link = inputPlaceLink.value;

    const card = new Card(name, link, templateElement, openImagePopup);

    cardsContainer.prepend(card.generateCard());
    disableAddButton();
    closePopup(cardAddPopup);
    evt.target.reset()
}

/*Закрытие на оверлей*/

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

/*Закрытие на Escape*/

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

popupOpenButtonEdit.addEventListener('click', editPopupOpenHandler);

imagePopupCloseButton.addEventListener('click', () => {
    closePopup(imagePopup)
});

profilePopupCloseButton.addEventListener('click', () => {
    closePopup(profilePopup)
});

cardPopupCloseButton.addEventListener('click', () => {
    closePopup(cardAddPopup)
});

popupOpenButtonAdd.addEventListener('click', () => {
    openPopup(cardAddPopup)
});

cardFormAdd.addEventListener('submit', addNewCard);



