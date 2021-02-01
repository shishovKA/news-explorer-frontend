export default class Header {

    constructor (container, mode) {
        this._container = container;
        this.mainBtn;
        this.savedNewsBtn;
        this.authBtn;
        this.nameBtn;
        
        this.mode = mode;
        this._createMainBtn();
        this._createSavedNewsBtn();
        this._createAuthBtn();
        this._createNameBtn();
        return this;
    };

    clearMenu() {
      this.mainBtn.classList.add('hide');
      this.savedNewsBtn.classList.add('hide');
      this.authBtn.classList.add('hide');
      this.nameBtn.classList.add('hide');
    }

    switchStart() {
        this.clearMenu();
        this.mainBtn.classList.remove('header__button_not-selected');
        this.mainBtn.classList.remove('hide');
        this.authBtn.classList.remove('hide');
    }

    switchSaved() {
        this.clearMenu();
        this.savedNewsBtn.classList.remove('header__button_not-selected');
        this.mainBtn.classList.remove('hide');
        this.savedNewsBtn.classList.remove('hide');
        this.nameBtn.classList.remove('hide');
    }



    switchLogin(isLogged) {
        if (isLogged) {
            this.clearMenu();
            this.mainBtn.classList.remove('hide');
            this.savedNewsBtn.classList.remove('hide');
            this.nameBtn.classList.remove('hide');
        } else {
            this.clearMenu();
            this.mainBtn.classList.remove('hide');
            this.authBtn.classList.remove('hide');
        }
    }

    _createMainBtn() {
        // li
        const li = document.createElement('li');
        li.classList.add('header__button');
        li.classList.add('header__button_not-selected');
        // a
        const mainUrl = (process.env.NODE_ENV === 'development') ? "/" : "https://shishovka.github.io/news-explorer-frontend/"
      
        const a = document.createElement('a');
        a.classList.add('header__link');
        a.classList.add('header__link_full');
        a.href = mainUrl;
        a.textContent = 'Главная';
        li.append(a);

        this.mainBtn = li;

        this._container.append(this.mainBtn); // adds on page
    };

    _createSavedNewsBtn() {
        // li
        const li = document.createElement('li');
        li.classList.add('header__button');
        li.classList.add('header__button_not-selected');
        // a
        const savedNewsUrl = (process.env.NODE_ENV === 'development') ? "/saved-news.html" : "https://shishovka.github.io/news-explorer-frontend/saved-news"

        const a = document.createElement('a');
        a.classList.add('header__link');
        a.classList.add('header__link_full');
        a.href = savedNewsUrl;
        a.textContent = 'Сохраненные статьи';


        li.append(a);
        this.savedNewsBtn = li;

        this._container.append(this.savedNewsBtn); // adds on page
    };

    _createAuthBtn() {
        // li
        const li = document.createElement('li');
        li.classList.add('header__button');
        li.classList.add('header__button_auth');
        // div
        const div = document.createElement('div');
        div.classList.add('header__link');
        div.classList.add('header__link_auth');
        div.textContent = 'Авторизоваться';

        li.append(div);
        this.authBtn = li;
        
        this._container.append(this.authBtn); // adds on page
    };

    _createNameBtn() {
        // li
        const li = document.createElement('li');
        li.classList.add('header__button');
        li.classList.add('header__button_auth');
        // div
        const div = document.createElement('div');
        div.classList.add('header__link');
        div.classList.add('header__link_auth');
        const span = document.createElement('span');
        span.textContent = 'Грета';
        const img = document.createElement('div');
        //img.src = '../../images/logout.svg';
        //img.alt = "arrow icon";
        img.classList.add('logo');
        img.classList.add('logo_quit');
        if (this.mode == 'white') img.classList.add('logo_quit_white');
        div.append(span);
        div.append(img);
        li.append(div);
        this.nameBtn = li;
        this._container.append(this.nameBtn); // adds on page
    };

    setUserName(name) {
        const span = this.nameBtn.querySelector('span');
        span.textContent = name;
    }




}