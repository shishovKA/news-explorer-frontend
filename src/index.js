
//РАЗДЕЛ: import
import "./style.css";

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

