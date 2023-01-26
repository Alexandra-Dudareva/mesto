const editPopupOpenButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profilePopup');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileForm = document.querySelector('.form');
const inputName = profileForm.querySelector('.form__input_type_name');
const inputStatus = profileForm.querySelector('.form__input_type_status');
const imagePopup = document.querySelector("#imagePopup");
const imagePopupCloseButton = document.querySelector("#imagePopupCloseButton");
const addCardPopupCloseButton = document.querySelector("#addPopupCloseButton");
const cardsContainer = document.querySelector('.elements');
const template = document.querySelector('#template');
const addPopupOpenButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('#addCardPopup');
const inputPlaceName = document.querySelector('.form__input_place-name');
const inputPlaceLink = document.querySelector('.form__input_type_link');
const addCardForm = document.querySelector('#addCardForm');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

/*ПР 4*/
popupToggle = function (popup) {
    popup.classList.toggle('popup_opened');
}

editPopupOpenHandler = function () {
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;

    popupToggle(profilePopup);
}

formSubmitHandler = function (evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileStatus.textContent = inputStatus.value;

    popupToggle();
}

closeImageToggle = function () {
    imagePopup.classList.toggle('popup_opened');
}

likeToggle = function (e) {
    const currentLB = e.target.closest('.element__like-button');
    currentLB.classList.toggle('element__like-button_active');
}

handleDeleteItem = (e) => {
    const currentEl = e.target.closest('.element');
    currentEl.remove();
};

openImagePopup = (name, link) => {
    imagePopup.querySelector('.popup-img__title').textContent = name;
    imagePopup.querySelector('.popup-img__photo').src = link;
    popupToggle(imagePopup);
};

createItemNode = (name, link) => {
    const currentItem = template.content.querySelector('.element').cloneNode(true);
    const currentName = currentItem.querySelector('.element__text');
    const currentLink = currentItem.querySelector('.element__image');
    const deleteBtn = currentItem.querySelector('.element__delete-button');
    const likeButton = currentItem.querySelector('.element__like-button');
    const imagePopupOpenButton = currentItem.querySelector('#elementImage');

    currentName.textContent = name;
    currentLink.src = link;

    likeButton.addEventListener('click', likeToggle);
    imagePopupOpenButton.addEventListener('click', () => openImagePopup(name, link));
    deleteBtn.addEventListener('click', handleDeleteItem);

    return currentItem;
};

render = () => {
    initialCards.forEach((item) => {
        const currentItem = createItemNode(item.name, item.link);
        cardsContainer.append(currentItem);
    });
};

render();


const closeAllPopups = function () {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
}

addNewCard = function (evt) {
    evt.preventDefault();

    const name = inputPlaceName.value;
    const link = inputPlaceLink.value;
    const newCard = createItemNode(name, link);
    cardsContainer.prepend(newCard);

    closeAllPopups();
}

profileForm.addEventListener('submit', formSubmitHandler);

editPopupOpenButton.addEventListener('click', editPopupOpenHandler);

imagePopupCloseButton.addEventListener('click', closeAllPopups);

popupCloseButton.addEventListener('click', closeAllPopups);

addCardPopupCloseButton.addEventListener('click', closeAllPopups);

addPopupOpenButton.addEventListener('click', () => {
    popupToggle(addCardPopup)
});

addCardForm.addEventListener('submit', addNewCard);




