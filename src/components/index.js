import initialCards from './card.js'
import * as valid from "./validate.js";
import { openPopup, closePopup, openImagePopup } from './popup.js'

const popupEditOpened = document.querySelector('#popup-edit');
const nameInput = document.querySelector('#popup-input-name');
const jobInput = document.querySelector('#popup-input-about');
const buttonEditSave = document.querySelector('#button-edit-save');
const profileName = document.querySelector('.profile__name');
const profileResearch = document.querySelector('.profile__research');
const popupAddOpened = document.querySelector('#popup-add');
const elementsBox = document.querySelector('.elements');
const buttonAddCreate = document.querySelector('#button-add-create');

const selectors = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error_active'
};


//Открытие попапов

(function popupsOpened() {
    //Открытие попапа редактирования
    const buttonEditOpened = document.querySelector('.profile__edit');
    buttonEditOpened.addEventListener('click', function () {
        openPopup(popupEditOpened);
        nameInput.value = profileName.textContent;
        jobInput.value = profileResearch.textContent;
    });
    //Открытие попапа добавления
    const buttonAddOpened = document.querySelector('.profile__add');
    buttonAddOpened.addEventListener('click', function () {
        openPopup(popupAddOpened);
    });
})();

//Закрытие попапов

(function popupsClose() {
    const closeButtons = document.querySelectorAll('.popup__close');
    const overlays = document.querySelectorAll('.popup');
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
        document.addEventListener('keydown', function (evt) {
            if (evt.key === "Escape") {
                closePopup(modal);
            };
        });
    });
})();

// Функция редактирования профиля

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileResearch.textContent = jobInput.value;
    closePopup(popupEditOpened)
}

buttonEditSave.addEventListener('click', editProfile);

//Создание карточки

function createCard(imageCards, nameCards) {
    const cardTemplate = document.querySelector('#card-template').content;
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
    openImagePopup(newElement);
    return newElement;
};

//Добавление карточек

function createCards(evt) {
    const titlelink = document.querySelector('#popup-input-link');
    const titleInput = document.querySelector('#popup-input-title');
    evt.preventDefault();
    elementsBox.prepend(createCard(titlelink.value, titleInput.value));
    closePopup(popupAddOpened);
    titlelink.value = '';
    titleInput.value = '';
};

//Шесть карточек

initialCards.forEach(function (item) {
    elementsBox.prepend(createCard(item.link, item.name));
});

buttonAddCreate.addEventListener('click', createCards);

valid.enableValidation(selectors); 