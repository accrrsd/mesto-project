export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer
        this._container = document.querySelector(containerSelector);
    }

    renderCards(cards) {
        cards.forEach(card => this._renderer(card))
    }

    addItem(card) {
        this._container.append(domElement);
    }

}