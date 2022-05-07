export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer
        this._container = document.querySelector(containerSelector);
    }

    renderCards(cards) {
        cards.forEach(card => this._renderer(card))
    }

    addItem(card, direction = 'append') {
        if (direction == 'append') {
            this._container.append(card);
        }
        else {
            this._container.prepend(card);    
        }
    }

}