
//РАЗДЕЛ: import
import "./style.css";
import Popup from "./js/components/Popup";
import Form from "./js/components/Form"
import Api from "./js/components/Api"

// set page constants
const page = document.querySelector('.page-body');
const authBtn = document.querySelector('.header__link_auth');
let token = '';

// composing Registration Form
const popupReg = new Popup(page, 'popup-registration', 'Регистрация');
const formReg = new Form(popupReg.contentNode);
popupReg.setSwitchBtn('Войти', 'или', () => {
    console.log('Включаем форму ЛОГИНА');
});

// Api
const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});


// Page Listeners
authBtn.addEventListener('click', () => {
    popupReg.open();
});

formReg.submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    api.signUp('', formReg.setReqErr);
})

