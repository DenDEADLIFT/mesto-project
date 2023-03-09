//import { elementsBox, createCard } from '../index.js'

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
    headers: {
        authorization: 'eb051ebf-2644-4cfe-b56d-7fb7bc91594f',
        'Content-Type': 'application/json'
    }
}

export function onResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
}

export function error(err) {
    console.log(err);
}

// Информация о пользователе

export const profileInfo = (name, about, avatar) => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
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
}

// Создание карточек

export const cardsFromServer = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
}

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
}

export function createMyCart() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
}

export const createCardsId = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
}

export const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        headers: config.headers,
        method: 'DELETE'
    })
}

export const deleteMyCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
}

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'PUT'
    })
}

export const myLikeActive = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
}

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'DELETE'
    })
}

export const createMyId = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
}

export const likesCount = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'GET'
    })
}