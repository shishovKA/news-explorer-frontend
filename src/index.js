
//РАЗДЕЛ: import
import "./style.css";
import Popup from "./js/components/Popup";
import Form from "./js/components/Form"

// set page constants
const page = document.querySelector('.page-body');

// composing Registration Form
const popupReg = new Popup(page, 'popup-registration', 'Регистрация');
const formReg = new Form(popupReg.contentNode);
popupReg.setSwitchBtn('Войти','или',() => {
        console.log('Включаем форму ЛОГИНА');
    });



/*
const popup = document.querySelector('.popup')
const closeBtn = document.querySelector('.popup__close');
const authBtn = document.querySelector('.header__button_auth');

authBtn.addEventListener('click', () => {
    console.log('open');
    popup.classList.toggle('popup_is-opened');
})

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        console.log('close');
        popup.classList.toggle('popup_is-opened');
    })
}
*/
