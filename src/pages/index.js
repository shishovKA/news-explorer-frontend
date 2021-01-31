//РАЗДЕЛ: import
import "../style.css";
import Header from "../js/components/Header";
import Api from "../js/components/Api"
import CardListSaved from "../js/components/CardListSaved"
import CardSaved from "../js/components/CardSaved"
import { backUrl } from "../js/constants"

// set page constants
const myStorage = window.localStorage;
const menuContainer = document.querySelector('.header__container');
const userName = document.querySelector('.user-name');
const userCount = document.querySelector('.user-count');

// header menu
const menu = new Header(menuContainer);

menu.nameBtn.addEventListener('click', () => {
    userQuit();
    checkAuth();
});

const userQuit = () => {
    myStorage.clear();
    api.token = '';
}

menu.switchSaved();

// Api
const api = new Api({
    baseUrl: backUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});


// check Auth
const checkAuth = () => {
    if (myStorage.getItem('token')) api.token = myStorage.getItem('token');
    api.getUserInfo((res) => {
        menu.setUserName(res.data.name);
        userName.textContent = res.data.name;
        menu.switchLogin(true);      
    }, () => {
        window.location.replace("/");
    });
}

//cardList
const resultBlock = document.querySelector('.section_result');
const cardList = new CardListSaved(resultBlock);

// Page Load
checkAuth();
menu.switchSaved();

//load saved cards
const loadCards = () => {
    api.getCards((res)=>{
        console.log(res);
        res['data'].forEach(element => {
            const card = new CardSaved(cardList.element, element);
            card.turnAddEvent(api);
            cardList.addCard(card);
        });
        cardList.render();
        if (res['data'].length > 0) setKeyWords(res['data']);
        userCount.textContent = (res['data'].length).toString();
    }, (err)=>{
        console.log(err);
    });
}

//keyWords
const setKeyWords = (data) => {
    const span = document.querySelector('.keywords');
    const words = data.map((el)=>el['keyword']);
    words.sort((a,b)=>{
        const bcount = words.filter((el)=>el == b);
        const acount = words.filter((el)=>el == a);
        return bcount.length - acount.length;
    });
    const singleWords = [words[0]];
    for (let i=1; i<words.length; i++) {
        if (words[i] !== words[i-1]) singleWords.push(words[i]);
    }
    let result = '';
    if (singleWords.length == 1) result = singleWords[0];
    if (singleWords.length == 2) result = singleWords[0] + ', '+singleWords[1];
    if (singleWords.length > 2) result = singleWords[0] + ', '+singleWords[1] + ` и ${singleWords.length-2} другим`;
    span.textContent = result;
}

loadCards();