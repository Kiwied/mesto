export default class Section {
  constructor(renderer, containerSelector) {
    //this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(renderedItems) {
    this.clear();
    console.log(renderedItems.length);
    /*
    for (let i=1; i < this._renderedItems.length; i++) {
      this._renderer(this._renderedItems[i]);
      console.log(this._renderedItems[i]);
    }*/
    renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
