
export default class CardListSaved {

    constructor (container) {
        this.container = container;
        this.element;
        this.list = [];
        this._create();
        return this;
    };

    _create() {
        const cardcontainer = document.createElement('div');
        cardcontainer.classList.add('card__container');
        cardcontainer.classList.add('card__container_no-title');
        this.element = cardcontainer;
        this.container.append(this.element);
    };

    addCard(card) {
        this.list.push(card);
    }

    clear() {
        this.list.forEach(card => {
            card.element.remove(); 
        });
        this.list = [];
    }

    render() {
        this.list.forEach(card => {
            card.render(); 
        });
    }

}