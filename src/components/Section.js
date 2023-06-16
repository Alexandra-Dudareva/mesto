export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  HandleCardArray(arr) {
   arr. forEach((card)=>this.addItem(card))
}

  addItem(card) {
    this._container.prepend(this._renderer(card));
  }
}