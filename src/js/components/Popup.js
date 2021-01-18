export default class Popup {

    constructor (container, id, title) {
        this._container = container;
        this._id = id;
        this._title = title;

        this._popupNode;
        this._contentNode;
        this._btnCloseNode;
        this._btnSwitchNode;

        
        this.close = this.close.bind(this);
        //this.open = this.open.bind(this);
        //this._create = this._create.bind(this);

        this._create();
        this._setEventListeners();
        
        return this;
    };

    _create() {
        // popup
        const popup = document.createElement('div');
        popup.classList.add('popup');

        // content
        const __content = document.createElement('div');
        __content.classList.add('popup__content');

        // close button
        const __close = document.createElement('div');
        __close.classList.add('popup__close');

        // title
        const __title = document.createElement('h3');
        __title.classList.add('popup__title');
        __title.textContent = this._title;

        // append at each other
        __content.append(__close);
        __content.append(__title);
        popup.append(__content);
        popup.classList.toggle('popup_is-opened'); // opens when created

        this._popupNode = popup;
        this._contentNode = __content;
        this._btnCloseNode = __close;

        this._container.append(popup); // adds on page
    };

    _setEventListeners() {
        this._btnCloseNode.addEventListener('click', this.close);
    };

    close() {
        this._popupNode.classList.remove('popup_is-opened');
    };

    setSwitchBtn(text, prefix, handler) {
        const __text = document.createElement('p');
        __text.classList.add('popup__text');
        __text.textContent = prefix+' ';

        const switchBtn = document.createElement('span');
        switchBtn.classList.add('popup__text_blue');
        switchBtn.textContent = text;

        switchBtn.addEventListener('click', () => {
                this.close();
                handler();
            });

        this._btnSwitchNode = switchBtn;

        __text.append(switchBtn);
        this._contentNode.append(__text);
    }

    get contentNode() {
        return this._contentNode;
    }




}
