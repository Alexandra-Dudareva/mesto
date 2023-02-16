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

const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
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

const handleLikeClick = function (e) {
    const currentLikeButton = e.target.closest('.element__like-button');
    currentLikeButton.classList.toggle('element__like-button_active');
}

const handleDeleteItem = (e) => {
    const currentEl = e.target.closest('.element');
    currentEl.remove();
};

openImagePopup = (name, link) => {
    popupImgTitle.textContent = name;
    popupImgPhoto.src = link;
    popupImgPhoto.alt = name;
    openPopup(imagePopup);
};

createItemNode = (name, link) => {
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
};

render = () => {
    initialCards.forEach((item) => {
        const currentItem = createItemNode(item.name, item.link);
        cardsContainer.append(currentItem);
    });
};

render();

addNewCard = function (evt) {
    evt.preventDefault();

    const name = inputPlaceName.value;
    const link = inputPlaceLink.value;
    const newCard = createItemNode(name, link);
    cardsContainer.prepend(newCard);

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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
});

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