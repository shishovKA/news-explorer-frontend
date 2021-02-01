import { newsApiKey } from "../constants"

export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        this.token = '';
    }


    signUp(formCredentials, handler, errHandler) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": formCredentials.name,
            "email": formCredentials.email,
            "password": formCredentials.password
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const url = this.baseUrl + '/signup';

        return fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                // если ошибка, переходим в catch
                return Promise.reject(response.json());
            })
            .then(result => {
                console.log(result);
                handler();
            })
            .catch(error => {
                console.log(error);
                error.then(err => errHandler(err.message))

            });
    }


    signIn(formCredentials, handler, errHandler) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": formCredentials.email,
            "password": formCredentials.password
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const url = this.baseUrl + '/signin';

        return fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                // если ошибка, переходим в catch
                return Promise.reject(response.json());
            })
            .then(result => {
                handler(result);
            })
            .catch(error => {
                console.log(error);
                error.then(err => errHandler(err.message))

            });
    }

    getUserInfo(handler, errHandler) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const url = this.baseUrl + '/users/me';

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                // если ошибка, переходим в catch
                return Promise.reject(response.json());
            })
            .then(result => handler(result))
            .catch(error => errHandler());
    }


    getNews(handler, errHandler, data) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let to = new Date();
        let from = new Date();
        from.setDate(from.getDate() - 7);

        to = to.toISOString();
        from = from.toISOString();

        const url = `https://nomoreparties.co/news/v2/everything?q=${data.q}&from=${from}&to=${to}&apiKey=${newsApiKey}&pageSize=100&language=ru`
        console.log(url)
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => handler(result))
            .catch(error => console.log('error', error));
    }


    postCard(cardData, handler, errHandler) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);
        myHeaders.append("Content-Type", "application/json");

        console.log(cardData);

        const raw = JSON.stringify({
            "keyword": cardData['keyWord'], 
            "title": cardData['title'],
            "text": cardData['description'],
            "date": cardData['publishedAt'],
            "source": cardData['author'],
            "link": cardData['url'],
            "image": cardData['urlToImage'], 
        });

        console.log(raw);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const url = this.baseUrl + '/articles';

        return fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                // если ошибка, переходим в catch
                return Promise.reject(response.json());
            })
            .then(result => {
                handler(result);
            })
            .catch(error => {
                error.then(err => errHandler(err))
            });
    }


    dellCard(id, handler, errHandler) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);
        myHeaders.append("Content-Type", "application/json");

        const raw = "";

        const requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        const url = this.baseUrl + '/articles/'+id;

        return fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                // если ошибка, переходим в catch
                return Promise.reject(response.json());
            })
            .then(result => {
                handler(result);
            })
            .catch(error => {
                error.then(err => errHandler(err))
            });
    }


    getCards(handler, errHandler) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);
        myHeaders.append("Content-Type", "application/json");


        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        const url = this.baseUrl + '/articles';

        return fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                // если ошибка, переходим в catch
                return Promise.reject(response.json());
            })
            .then(result => {
                handler(result);
            })
            .catch(error => {
                error.then(err => errHandler(err))
            });
    }


}