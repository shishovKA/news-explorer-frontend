import Form from "./Form"
export default class FormLogin extends Form {

    constructor (container) {
        super(container);
        //this.container = container;
        //this.submitBtn;
        //this.reqErr;
        //this.inputs;
        //this._create();
        //this.validForm();

        //this.setReqErr = this.setReqErr.bind(this);
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
        err.textContent = '';
        this.reqErr = err;
        form.append(err);

        const btn = document.createElement('button');
        btn.classList.add('popup__button');
        btn.textContent = 'Войти';
        this.submitBtn = btn;
        form.append(btn);

        this.container.append(form);

        
    };

    validForm() {
        if ((this.validUrl(this.inputs[0].value)) 
            && (this.validEmpty(this.inputs[1].value)) ) {
                this.enableSubmitBtn(true); 
            }
        else {
            this.enableSubmitBtn(false); 
        }
    }

    get formCredentials() {
        const result = {
            email: this.inputs[0].value,
            password: this.inputs[1].value
        }
        return result
    }

}
