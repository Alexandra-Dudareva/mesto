class Card {
    constructor(name, link, templateSelector, handleOpenCard) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleOpenCard = handleOpenCard;
    }

    _getTemplate() {
        /*возвращаем DOM-элемент карточки*/
        return this._templateSelector.cloneNode(true);
    }

    /*Создаем карточку*/
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        /*Добавляем данные*/

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__text').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        /*кнопка лайк*/
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._handleLikeClick();
        });
        /*кнопка удалить*/
        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._handleDeleteClick();
        });
        /*нажатие на карточку и открытие попапа с фото*/
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenCard(this._name, this._link);
        });
    }

    _handleLikeClick() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _handleDeleteClick() {
        this._element.querySelector('.element__delete-button').closest('.element').remove();
    }
}

export default Card;