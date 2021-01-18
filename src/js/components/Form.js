export default class Form {

    constructor (container) {
        this.container = container;
        this._create();
        //this._setEventListeners();
    };

    _create() {
        // form
        const form = document.createElement('form');
        form.classList.add('popup__form');

        const fields = [
            {
                label: 'Email',
                placeholder: 'Введите почту',
                name: 'email',
                type: 'text'
            },
            {
                label: 'Пароль',
                placeholder: 'Введите пароль',
                name: 'password',
                type: 'text'
            },
            {
                label: 'Имя',
                placeholder: 'Введите свое имя',
                name: 'name',
                type: 'text'
            },
        ];
        
        // creating fields
        fields.forEach((el) => {
            const label = document.createElement('p');
            label.classList.add('popup__label');
            label.textContent = el.label;

            const input = document.createElement('input');
            input.classList.add('popup__input');
            input.type = el.type;
            input.name = el.name;
            input.placeholder = el.placeholder;

            const err = document.createElement('p');
            err.classList.add('popup__error');
            err.textContent = 'Текст ошибки';

            form.append(label);
            form.append(input);
            form.append(err);
        });

        this.container.append(form);

    };

    _setEventListeners() {
        //this.btnCloseNode.addEventListener('click', this.close);
    };


}
