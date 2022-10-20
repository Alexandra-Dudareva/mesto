const editPopupOpenButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profilePopup');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileForm = document.querySelector('.form');
const inputName = profileForm.querySelector('.form__input_type_name');
const inputStatus = profileForm.querySelector('.form__input_type_status');

/*ПР5. Кнопка лайк*/


/*ПР5. Открытие  и закрытие картинки*/


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

likeToggle = function () {
    likeButton.classList.toggle('element__like-button_active');
}

closeImageToggle = function () {
    imagePopup.classList.toggle('popup_opened');
}

createItemNode = (name, link) => {
    const currentItem = template.content.querySelector('.element').cloneNode(true);
    const currentName = currentItem.querySelector('.element__text');
    const currentLink = currentItem.querySelector('.element__image');
    currentName.textContent = name;
    currentLink.src = link;

    return currentItem;
};

render = () => {
    initialCards.forEach((item) => {
        const currentItem = createItemNode(item.name, item.link);
        cardsContainer.append(currentItem);
    });
};

render();

const likeButton = document.querySelector(".element__like-button");
const imagePopupOpenButton = document.querySelector("#elementImage");



const closeAllPopups = function (){
    document.querySelector('.popup_opened').classList.remove('popup_opened');
}

profileForm.addEventListener('submit', formSubmitHandler);

editPopupOpenButton.addEventListener('click', editPopupOpenHandler);

popupCloseButton.addEventListener('click', closeAllPopups);

likeButton.addEventListener('click', likeToggle);

imagePopupOpenButton.addEventListener('click', ()=>{popupToggle(imagePopup)});

imagePopupClose.addEventListener('click', closeAllPopups);


/*
 1. Добавить eventLister к форме, тип события - submit, при срабатывании события вызывается функция addNewCard.
 2. Объявляем функцию addNewCard.
 3. Пишем PreventDefault (смотри функцию formSubmitHandler для примера).
 4. С помощью метода value записываем значения инпутов в переменные (смотри функцию formSubmitHandler для примера).
 5. Внутри addNewItem вызываем функцию createItemNode с параметрами, равными переменным из пункта 3, записав ее вызов в переменную (смотри функцию render для примера)
 6. Вывести карточку на экран с помощью метода append (смотри функцию render для примера)*/
