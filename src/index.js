// Переменные

//import initialCards from './components/card.js'
import * as valid from "./components/validate.js";
import * as api from "./components/api.js";
import { openPopup, closePopup, openImagePopup } from './components/popup.js';
import './pages/index.css'; // добавляем импорт главного файла стилей 

// Переменные

const cardTemplate = document.querySelector('#card-template').content;
const popupEditOpened = document.querySelector('#popup-edit');
const popapAvatar = document.querySelector('#popup-avatar');
const avatar = document.querySelector('.profile__avatar-hover');
const nameInput = document.querySelector('#popup-input-name');
const jobInput = document.querySelector('#popup-input-about');
const profileName = document.querySelector('.profile__name');
const profileResearch = document.querySelector('.profile__research');
const popupAddOpened = document.querySelector('#popup-add');
export const elementsBox = document.querySelector('.elements');
const buttonEditOpened = document.querySelector('.profile__edit');
const closeButtons = document.querySelectorAll('.popup__close');
const overlays = document.querySelectorAll('.popup');
const titlelink = document.querySelector('#popup-input-link');
const titleInput = document.querySelector('#popup-input-title');
export const popupImageOpened = document.querySelector('#popup-image');
export const popupImageTitle = document.querySelector('#popup-image-title');
export const popupImage = document.querySelector('.popup__image');
const buttonAddOpened = document.querySelector('.profile__add');
export const popupButton = document.querySelector('.popup__button');
const avatarLink = document.querySelector('#popup-avatar-link');

// Селекторы для валидации

export const selectors = {
    popupErrorInput: '.popup__input_error-',
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error_active'
};

//Открытие попапа редактирования

buttonEditOpened.addEventListener('click', function () {
    valid.buttonBlock(popupButton, selectors);
    nameInput.value = profileName.textContent;
    jobInput.value = profileResearch.textContent;
    openPopup(popupEditOpened);
});

//Открытие попапа добавления

buttonAddOpened.addEventListener('click', function () {
    valid.buttonBlock(popupButton, selectors);
    openPopup(popupAddOpened);
    titlelink.value = '';
    titleInput.value = '';
});

// Открытие попапа смены аватара
avatar.addEventListener('click', function () {
    valid.buttonBlock(popupButton, selectors);
    openPopup(popapAvatar);
    avatarLink.value = '';
});

// Закрытие попапов по кнопке

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

//Закрытие попапов по оверлею и Esc

overlays.forEach((overlay) => {
    const modal = overlay.closest('.popup');
    overlay.addEventListener('click', function (evt) {
        if (evt.target == modal)
            closePopup(modal);
    });
});

export function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    };
};

// Функция редактирования профиля

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileResearch.textContent = jobInput.value;
    api.userInfoForServer(nameInput.value, jobInput.value)
        .then(api.onResponse)
        .catch(api.error)
    closePopup(popupEditOpened);
}

// Информация о пользователе с сервера

api.profileInfo(profileName, profileResearch, popapAvatar)
    .then(api.onResponse)
    .then(data => {
        profileName.textContent = data.name;
        profileResearch.textContent = data.about;
        popapAvatar.src = data.avatar;
    })
    .catch(api.error)

//Создание карточки

export function createCard(imageCards, nameCards, likes, cardId, cardOwnerId, myId) {
    const newElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const likeButton = newElement.querySelector('#like');
    const like = newElement.querySelector('#likes-count');
    newElement.querySelector('.elements__image').src = imageCards;
    newElement.querySelector('.elements__image').alt = nameCards;
    newElement.querySelector('.elements__name').textContent = nameCards;
    newElement.querySelector('#likes-count').textContent = likes;
    likeButton.addEventListener('click', function (like) {
        likeButton.classList.toggle('elements__button_active');
    });
    newElement.dataset.cardId = cardOwnerId;
    api.createMyId(newElement, cardOwnerId)
        .then(api.onResponse)
        .then(data => {
            let myId = data._id;
            if (cardOwnerId == myId) {
                newElement.insertAdjacentHTML('afterbegin', '<button type="button" class="elements__delete-button" id="delete"></button>');
                newElement.querySelector('.elements__delete-button').addEventListener('click', (evt) => {
                    evt.target.closest('.elements__element').remove();
                    api.deleteCardFromServer(cardId)
                        .then(api.onResponse)
                        .catch(api.error)
                });
            }
        })
        .catch(api.error)
    newElement.querySelector('.elements__image').addEventListener('click', () => openImagePopup(imageCards, nameCards));
    return newElement;
};

//Добавление карточки

function createOneCard(evt) {
    evt.preventDefault();
    elementsBox.prepend(createCard(titlelink.value, titleInput.value));
    api.cardForServer(titlelink.value, titleInput.value)
        .then(api.onResponse)
        .catch(api.error)
    closePopup(popupAddOpened);
    titlelink.value = '';
    titleInput.value = '';
};

// Карточки с сервера

api.cardsFromServer()
    .then(api.onResponse)
    .then(data => {
        data.forEach(function (item) {
            const like = item.likes.length;
            const cardId = item._id;
            const cardOwnerId = item.owner._id;
            elementsBox.prepend(createCard(item.link, item.name, like, cardId, cardOwnerId));
        });
    })
    .catch(api.error)

// Функция смены аватара

function createNewAvatar(evt) {
    evt.preventDefault();
    const avatarElement = document.querySelector('.profile__avatar');
    avatarElement.src = avatarLink.value;
    api.avatarChange(avatarLink.value)
        .then(api.onResponse)
        .catch(api.error)
    closePopup(popapAvatar);
}

// Слушатель кнопки редактирования

popupEditOpened.addEventListener('submit', editProfile);

// Слушатель кнопки добавления карточки

popupAddOpened.addEventListener('submit', createOneCard);

// Слушатель кнопки смены аватара

popapAvatar.addEventListener('submit', createNewAvatar);

// Вызываем функцию валидации

valid.enableValidation(selectors);