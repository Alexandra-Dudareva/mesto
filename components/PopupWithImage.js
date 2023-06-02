import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImgPhoto = this._popupElement.querySelector('.popup__img-photo');
        this._popupImgTitle = this._popupElement.querySelector('.popup__img-title');
    }

    open(name, link) {
        this._popupImgPhoto.src = link;
        this._popupImgPhoto.alt = name;
        this._popupImgTitle.textContent = name;
        super.open();
    }
}