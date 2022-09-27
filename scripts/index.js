const popupOpenButton = document.querySelector('.profile__open-popup');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileForm = popup.querySelector('.form');
const inputName = profileForm.querySelector('.form__name');
const inputStatus = profileForm.querySelector('.form__status');

popupToggle = function () {
    popup.classList.toggle('popup__opened');
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

profileForm.addEventListener('submit', formSubmitHandler);

popupOpenButton.addEventListener('click', popupOpenHandler);

popupCloseButton.addEventListener('click', popupToggle);

