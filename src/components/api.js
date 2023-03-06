import { elementsBox, createCard } from '../index.js'


const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
    headers: {
        authorization: 'eb051ebf-2644-4cfe-b56d-7fb7bc91594f',
        'Content-Type': 'application/json'
    }
}


// Информация о пользователе

export const profileInfo = (name, about, avatar) => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
        })
        .then(data => {
            //console.log(data);
            name.textContent = data.name;
            about.textContent = data.about;
            avatar.src = data.avatar;
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
}

// Отправка аватара

export const avatarChange = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
        .then(res => {
            console.log(res);
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
}

// Отправка карточек на сервер

export const cardsFromServer = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
        })
        .then(data => {
            data.forEach(function (item) {
                elementsBox.prepend(createCard(item.link, item.name));
            });
            //console.log(data);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
}

cardsFromServer()

// Отправка информации о пользователе на сервер

export const userInfoForServer = (nameInput, jobInput) => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            name: nameInput,
            about: jobInput
        })
    })
        .then(res => {
            //console.log(res);
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
}

// Отправка новой карточки на сервер

export const cardForServer = (titlelink, titleInput) => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
            name: titleInput,
            link: titlelink
        })
    })
        .then(res => {
            console.log(res);
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
}