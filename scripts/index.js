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

/*ПР5. Открытие картинки*/
const OpenImageButton = document.querySelector(".element__image");

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

likeToggle = function (){
    likeButton.classList.toggle('element__like-button_active');
}

/*ПР5. Открытие картинки*/
openImageToggle = function (){
    OpenImageButton.classList.toggle('popup_opened');
}

/*ПР 4*/
profileForm.addEventListener('submit', formSubmitHandler);

popupOpenButton.addEventListener('click', popupOpenHandler);

popupCloseButton.addEventListener('click', popupToggle);

/*ПР5. Кнопка лайк*/
likeButton.addEventListener('click', likeToggle);

/*ПР5. Открытие картинки*/
OpenImageButton.addEventListener('click', openImageToggle);