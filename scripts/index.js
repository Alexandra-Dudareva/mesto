const popupOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileForm = popup.querySelector('.form');
const inputName = profileForm.querySelector('.form__input_type_name');
const inputStatus = profileForm.querySelector('.form__input_type_status');

/*ПР5. Кнопка лайк*/
const likeButton = document.querySelector(".element__like-button");

/*ПР5. Открытие  и закрытие картинки*/
const openImageButton = document.querySelector(".element__image");

const imagePopup = document.querySelector("#imagePopup");
const imagePopupClose = document.querySelector("#imagePopupClose");

/*ПР5. Карточки из коробки*/
const cardsContainer = document.querySelector('.elements');
const template = document.querySelector('#template');

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
popupToggle = function () {
    popup.classList.toggle('popup_opened');
}

popupOpenHandler = function () {
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;

    popupToggle();
}

formSubmitHandler = function (evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileStatus.textContent = inputStatus.value;

    popupToggle();
}

/*ПР5. Кнопка лайк*/

likeToggle = function () {
    likeButton.classList.toggle('element__like-button_active');
}

/*ПР5. Открытие картинки*/
openImageToggle = function () {
    imagePopup.classList.toggle('popup_opened');
}

/*ПР5. Закрытие картинки*/
closeImageToggle = function () {
    imagePopup.classList.toggle('popup_opened');
}

/*ПР5. Карточки из коробки*/
const createItemNode = (name, link) => {
    const currentItem = template.content.querySelector('.element').cloneNode(true);
    const currentName = currentItem.querySelector('.element__text');
    const currentLink = currentItem.querySelector('.element__image');
    currentName.textContent = name;
    currentLink.src = link;

    return currentItem;
};

const render = () => {
    initialCards.forEach((item) => {
        const currentItem = createItemNode(item.name, item.link);
        cardsContainer.append(currentItem);
    });
};

render();


/*ПР 4*/
profileForm.addEventListener('submit', formSubmitHandler);

popupOpenButton.addEventListener('click', popupOpenHandler);

popupCloseButton.addEventListener('click', popupToggle);

/*ПР5. Кнопка лайк*/
likeButton.addEventListener('click', likeToggle);

/*ПР5. Открытие картинки*/
openImageButton.addEventListener('click', openImageToggle);

/*ПР5. Закрытие картинки*/
imagePopupClose.addEventListener('click', closeImageToggle);