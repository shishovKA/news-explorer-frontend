export default class Card {

    constructor(container, data) {

        this._container = container;
        this.element;

        this.addBtn;

        this.data = data;
        this._create(data);

        return this;
    };

    dateFormat(date) {
        const fulldate = new Date(date);
        const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        const result = fulldate.getDate() + ' ' + monthNames[fulldate.getMonth()] + ', ' + fulldate.getFullYear();
        return result;
    }

    _create(data) {
        //card
        const card = document.createElement('div');
        card.classList.add('card');

        //card__image-container
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('card__image-container');

        //card__image
        const img = document.createElement('img');
        img.classList.add('card__image');
        img.src = data['urlToImage'];

        //card__add
        const addBtn = document.createElement('button');
        addBtn.classList.add('card__add-icon');
        this.addBtn = addBtn;

        imgContainer.append(img);
        imgContainer.append(addBtn);

        //description
        const description = document.createElement('div');
        description.classList.add('card__description');

        //date
        const date = document.createElement('p');
        date.classList.add('card__date');
        date.textContent = this.dateFormat(data['publishedAt']);

        //name
        const name = document.createElement('h3');
        name.classList.add('card__name');
        name.textContent = data['title'];

        //text
        const text = document.createElement('p');
        text.classList.add('card__text');
        text.textContent = data['description'];

        //author
        const author = document.createElement('p');
        author.classList.add('card__author');
        author.textContent = data['author'];

        description.append(date);
        description.append(name);
        description.append(text);
        description.append(author);

        card.append(imgContainer);
        card.append(description);

        this.element = card;
    };


    render() {
        this._container.append(this.element)
    }

    setSaved() {
        this.addBtn.classList.add('card__add-icon_saved');
    }

    setUnSaved() {
        this.addBtn.classList.remove('card__add-icon_saved');
    }

    turnAddEvent(api) {
        this.addBtn.addEventListener('click', () => {

            if (this.id) {
                api.dellCard(this.id,(res) => {
                    console.log(res);
                    this.id = '';
                    this.setUnSaved();
                }, (err) => {
                    console.log(err)
                })

            } else {

                api.postCard(this.data, (res) => {
                    console.log(res);
                    this.id = res.data._id;
                    this.setSaved();
                }, (err) => {
                    console.log(err)
                });

            }

        })
    }



}
