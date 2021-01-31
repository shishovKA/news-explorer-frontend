
export default class CardList {

    constructor (container) {
        this.container = container;
        this.element;
        this.list = [];
        this.counter = 3;
        this.moreBtn;
        this._create();
        this.turnOnMoreBtn();
        return this;
    };

    _create() {
        const cardcontainer = document.createElement('div');
        cardcontainer.classList.add('card__container');
        this.element = cardcontainer;
        this.container.append(this.element);
        const moreBtn = document.createElement('div');
        moreBtn.classList.add('about__more');
        moreBtn.classList.add('hide');
        moreBtn.textContent = 'Показать еще';
        this.moreBtn = moreBtn;
        this.container.append(this.moreBtn);
    };

    addCard(card) {
        this.list.push(card);
    }

    clear() {
        this.counter = 3;
        this.list.forEach(card => {
            card.element.remove(); 
        });
        this.list = [];
    }

    render() {
        let i = 0;
        while ((i < this.list.length) && (i < this.counter)) {
            this.list[i].render();
            i = i+1;
        }
        if ( this.list.length > this.counter) this.moreBtn.classList.remove('hide') 
        else this.moreBtn.classList.add('hide');  
    }

    turnOnMoreBtn() {
        this.moreBtn.addEventListener('click', ()=> {
            this.counter = this.counter + 3;
            const currentList = document.querySelectorAll('card');
            let i = currentList.length;
            while ((i < this.list.length) && (i < this.counter)) {
                this.list[i].render();
                i = i+1;
            }
            if ( this.list.length > this.counter) this.moreBtn.classList.remove('hide');
            else this.moreBtn.classList.add('hide');
        }); 
    }

    disableCards(mode) {
        this.list.forEach(card => {
            const btn = card.element.querySelector('.card__add-icon');
            btn.disabled = mode;
        });
    }

}