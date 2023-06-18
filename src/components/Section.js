export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach((item) => {
            const renderedItem = this._renderer(item);
            this._container.append(renderedItem);
        })
    }

    addItem(element) {
        this._container.prepend(element);
    }
}