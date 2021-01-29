export default class Form {

    constructor (container) {
        this.container = container;
        this.submitBtn;
        this.reqErr;
        this.inputs;
        this._create();
        this.validForm();

        this.setReqErr = this.setReqErr.bind(this);
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
        this.inputs = [];
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

            this.inputs.push(input);

            this.setValidation(input, err, this.validEmpty, 'обязательное поле');
            if (el.name == 'email') 
              this.setValidation(input, err, this.validUrl, 'неправильный формат emal');
            });

        const err = document.createElement('p');
        err.classList.add('popup__error');
        err.classList.add('popup__error_show');
        err.textContent = 'e';
        this.reqErr = err;
        form.append(err);

        const btn = document.createElement('button');
        btn.classList.add('popup__button');
        btn.textContent = 'Зарегистрироваться';
        this.submitBtn = btn;
        form.append(btn);

        this.container.append(form);

        
    };

    setReqErr(msg) {
        console.log('dd')
        this.reqErr.textContent = msg;
    }

    enableSubmitBtn(mode) {
        if (mode) { 
            this.submitBtn.classList.remove('popup__button_disabled');
            this.submitBtn.disabled = false;
        } else {
            this.submitBtn.classList.add('popup__button_disabled');
            this.submitBtn.disabled = true; 
        }
    }

    validForm() {
        if ((this.validUrl(this.inputs[0].value)) 
            && (this.validEmpty(this.inputs[1].value)) 
            && (this.validEmpty(this.inputs[2].value)) ) {
                this.enableSubmitBtn(true); 
            }
        else {
            this.enableSubmitBtn(false); 
        }
    }

    validUrl(text) {
        const validator = require("email-validator");
        return validator.validate(text); // true
    }

    validEmpty(text) {
        return (text)
    }

    setValidation(input, err, checkFunc, err_msg) {
        input.addEventListener('input', (e) => {
            if (!checkFunc(e.target.value)) {
                this.enableSubmitBtn(false);
                err.textContent = err_msg;
                err.classList.add('popup__error_show');
            } else {
                err.classList.remove('popup__error_show');
                this.validForm();
            }
        })
    }

    _setEventListeners() {
        //this.btnCloseNode.addEventListener('click', this.close);
    };


}
