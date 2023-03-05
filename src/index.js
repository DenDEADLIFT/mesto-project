// Переменные

import initialCards from './components/card.js'
import * as valid from "./components/validate.js";
import { openPopup, closePopup, openImagePopup } from './components/popup.js';
import './pages/index.css'; // добавляем импорт главного файла стилей 

// Переменные

const cardTemplate = document.querySelector('#card-template').content;
const popupEditOpened = document.querySelector('#popup-edit');
const nameInput = document.querySelector('#popup-input-name');
const jobInput = document.querySelector('#popup-input-about');
const profileName = document.querySelector('.profile__name');
const profileResearch = document.querySelector('.profile__research');
const popupAddOpened = document.querySelector('#popup-add');
const elementsBox = document.querySelector('.elements');
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
    closePopup(popupEditOpened)
}

//Создание карточки

function createCard(imageCards, nameCards) {
    const newElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const likeButton = newElement.querySelector('#like')
    newElement.querySelector('.elements__image').src = imageCards;
    newElement.querySelector('.elements__image').alt = nameCards;
    newElement.querySelector('.elements__name').textContent = nameCards;
    likeButton.addEventListener('click', function (like) {
        likeButton.classList.toggle('elements__button_active');
    });
    newElement.querySelector('#delete').addEventListener('click', function (evt) {
        evt.target.closest('.elements__element').remove();
    });
    newElement.querySelector('.elements__image').addEventListener('click', () => openImagePopup(imageCards, nameCards));
    return newElement;
};

//Добавление карточки

function createOneCard(evt) {
    evt.preventDefault();
    elementsBox.prepend(createCard(titlelink.value, titleInput.value));
    closePopup(popupAddOpened);
    titlelink.value = '';
    titleInput.value = '';
};

// Шесть карточек

initialCards.forEach(function (item) {
    elementsBox.prepend(createCard(item.link, item.name));
});

// Слушатель кнопки редактирования

popupEditOpened.addEventListener('submit', editProfile);

// Слушатель кнопки добавления карточки

popupAddOpened.addEventListener('submit', createOneCard);

// Вызываем функцию валидации

valid.enableValidation(selectors);