import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import UserInfo from "../components/UserInfo.js";
import './index.css';
import {API} from "../components/API";

const popupOpenButtonEdit = document.querySelector('.profile__edit-button');
const popupOpenButtonAvatar = document.querySelector(".profile__avatar-container");
const formEditProfile = document.querySelector('#formEditProfile');
const formAddCard = document.querySelector('#formAddCard');
const inputName = formEditProfile.querySelector('.form__input_type_name');
const inputStatus = formEditProfile.querySelector('.form__input_type_status');
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
let userID = '';

const api = new API(`https://mesto.nomoreparties.co/v1/cohort-68`, `27f98441-ef4d-4922-a488-723f7066a92e`);

const profileFormValidator = new FormValidator(validationSettings, formEditProfile);
const cardFormValidator = new FormValidator(validationSettings, formAddCard);


const userInfo = new UserInfo('profile__name', 'profile__status', 'profile__avatar');

/*Cards render*/

function createCard(item) {
    const card = new Card(item, templateElement, userID, () => {
            picturePopup.open(item.name, item.link);
        }, () => {
            likeCard(card)
        },
        (card) => {
            confirmation.open();
            confirmation.setSubmitAction(() => {
                deleteCard(card)
            });
        });

    return card.generateCard();
}

const cardList = new Section({renderer: createCard}, '.elements');

Promise.all([
    api.getProfile(),
    api.getInitialCards()
]).then((result) => {
    console.log(result)
    const user = result[0];
    const initialCards = result[1];
    userID = user._id;
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
   /* initialCards.forEach(card => {
        cardList.addItem(card);
    });*/
    cardList.HandleCardArray(initialCards)
}).catch((err) => {
    console.log(err);
});

/*Лайк карточки*/

const likeCard = (card) => {
    if (card.isLiked()) {
        api.deleteLike(card.id)
            .then((res) => {
                    card.setLikes(res.likes);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    } else {
        api.putLike(card.id)
            .then((res) => {
                    card.setLikes(res.likes);
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }
}

/*Удаление карточки*/

const deleteCard = (card) => {
    document.querySelector('.popup__delete-button').textContent = 'Удаление...';
    api.deleteCard(card.id)
        .then((res) => {
            console.log(res)
            confirmation.close();
            card.deleteElement();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            document.querySelector('.popup__delete-button').textContent = 'Да';
        })
}

/*Popups*/

const handleProfileFormSubmit = function (item) {
    document.querySelector('.popup__save-button').textContent = 'Сохранение...';
    api.patchProfile(item).then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        profilePopup.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        document.querySelector('.popup__save-button').textContent = 'Сохранить';
    });
}

const handleCardFormSubmit = function (item) {
    document.querySelector('.form__save-button').textContent = 'Сохранение...';
    api.postCard(item).then((res) => {
        cardList.addItem(res);
        cardPopup.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        document.querySelector('.form__save-button').textContent = 'Создать';
    });
}

const handleAvatarFormSubmit = function (item) {
    document.querySelector('.form__save-button').textContent = 'Сохранение...';
    api.patchAvatar(item)
        .then((res) => {
            userInfo.setUserAvatar(res.avatar);
            avatarPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            document.querySelector('.form__save-button').textContent = 'Сохраннить';
        });
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

const openAvatarPopup = function () {
    profileFormValidator.resetValidation();
    avatarPopup.open();
}

const profilePopup = new PopupWithForm('profilePopup', (item) => handleProfileFormSubmit(item));
const cardPopup = new PopupWithForm('addCardPopup', (item) => handleCardFormSubmit(item));
const picturePopup = new PopupWithImage('imagePopup');
const avatarPopup = new PopupWithForm('popup_avatar', (item) => handleAvatarFormSubmit(item));
const confirmation = new PopupWithConfirmation('popup_delete');

/*Валидация*/

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

popupOpenButtonEdit.addEventListener('click', openProfilePopup);

popupOpenButtonAdd.addEventListener('click', openCardPopup);

popupOpenButtonAvatar.addEventListener('click', openAvatarPopup);

confirmation.setEventListeners();

profilePopup.setEventListeners();

cardPopup.setEventListeners();

picturePopup.setEventListeners();







