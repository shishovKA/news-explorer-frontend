
//РАЗДЕЛ: import
import "./style.css";
import Header from "./js/components/Header";
import Popup from "./js/components/Popup";
import Form from "./js/components/Form"
import FormLogin from "./js/components/FormLogin"
import Api from "./js/components/Api"
import CardList from "./js/components/CardList";
import Card from "./js/components/Card";

import { backUrl, newsApiKey } from "./js/constants"

// header menu
const menuContainer = document.querySelector('.header__container');
const menu = new Header(menuContainer, 'white');

menu.authBtn.addEventListener('click', () => {
    popupReg.open();
});

menu.mainBtn.addEventListener('click', () => {
    checkAuth();
});

menu.nameBtn.addEventListener('click', () => {
    userQuit();
    cardList.disableCards(true);
})



// set page constants
const page = document.querySelector('.page-body');
let token = '';
const myStorage = window.localStorage;
const searchBtn = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
const resultBlock = document.querySelector('.section_result');
const loader = document.querySelector('.circle-preloader');
const noResults = document.querySelector('.no-results');

// composing Registration Form
const popupReg = new Popup(page, 'popup-registration', 'Регистрация');
const formReg = new Form(popupReg.contentNode);
popupReg.setSwitchBtn('Войти', 'или', () => {
    popupLogin.open();
});

const successReg = () => { popupReg.close(); popupSuccess.open(); };

formReg.submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const formCredentials = formReg.formCredentials;
    api.signUp(formCredentials, successReg, formReg.setReqErr);
});

// composing Login Form
const popupLogin = new Popup(page, 'popup-login', 'Вход');
const formLogin = new FormLogin(popupLogin.contentNode);
popupLogin.setSwitchBtn('Зарегистрироваться', 'или', () => {
    popupReg.open();
});

const updateName = (res) => {
    menu.setUserName(res.data.name);
    menu.switchLogin(true);
    popupLogin.close();
}

const successLogin = (res) => {
    myStorage.setItem('token', res.token);
    api.token = myStorage.getItem('token');
    api.getUserInfo(updateName, '');
    cardList.disableCards(false);
};

formLogin.submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const formCredentials = formLogin.formCredentials;
    api.signIn(formCredentials, successLogin, formLogin.setReqErr);
});



// composing Success Registration popup
const popupSuccess = new Popup(page, 'popup-success', 'Пользователь успешно зарегистрирован!');
popupSuccess.setSwitchBtn('Выполнить вход', '', () => {
    popupLogin.open();
});

// Api
const api = new Api({
    baseUrl: backUrl,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

const userQuit = () => {
    myStorage.clear();
    api.token = '';
    menu.switchLogin(false);
    menu.setUserName('Грета');
}


// token
if (myStorage.getItem('token') !== null) token = myStorage.getItem('token');

// check Auth
const checkAuth = () => {
    if (myStorage.getItem('token')) api.token = myStorage.getItem('token');
    api.getUserInfo((res) => {
        menu.setUserName(res.data.name);
        menu.switchLogin(true);
    }, () => console.log('not logged in'));
}

//search
searchBtn.addEventListener('click', (e) => {
    if (searchInput.value) {
        e.preventDefault();
        noResults.classList.add('hide');
        resultBlock.classList.add('hide');
        loader.classList.remove('hide');
        cardList.clear();
        api.getNews(parseCards, '', { q: searchInput.value });
    }
});

const parseCards = (res) => {
    if (res['articles'] && (res['articles'].length != 0)) {
        console.log(res['articles']);
        res['articles'].forEach(element => {
            element.keyWord = searchInput.value;
            const card = new Card(cardList.element, element);
            card.turnAddEvent(api);
            cardList.addCard(card);
        });

        api.getUserInfo(() => {
            console.log('logged in');
            cardList.disableCards(false);
            cardList.render();
            resultBlock.classList.remove('hide');
        }, () => {
            console.log('not logged in');
            cardList.disableCards(true);
            cardList.render();
            resultBlock.classList.remove('hide');
        });
    } else {
        noResults.classList.remove('hide');
    }
    loader.classList.add('hide');
}

//Card list
const cardList = new CardList(resultBlock);

// run Functions
checkAuth();
menu.switchStart();



