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
const avatarElement = document.querySelector('.profile__avatar');

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
    renderLoading(true);
    profileName.textContent = nameInput.value;
    profileResearch.textContent = jobInput.value;
    api.userInfoForServer(nameInput.value, jobInput.value)
        .then(api.onResponse)
        .catch(api.error)
        .finally(() => {
            document.querySelector('#button-edit-save').textContent = 'Сохранить';
            })
    closePopup(popupEditOpened);
}

// Информация о пользователе с сервера

api.profileInfo(profileName, profileResearch, avatarElement)
    .then(api.onResponse)
    .then(data => {
        profileName.textContent = data.name;
        profileResearch.textContent = data.about;
        avatarElement.src = data.avatar;
    })
    .catch(api.error)

//Создание карточки

export function createCard(imageCards, nameCards, likes, cardId, cardOwnerId, likesFromCard) {
    const newElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const likeButton = newElement.querySelector('#like');
    const like = newElement.querySelector('#likes-count');
    newElement.querySelector('.elements__image').src = imageCards;
    newElement.querySelector('.elements__image').alt = nameCards;
    newElement.querySelector('.elements__name').textContent = nameCards;
    newElement.querySelector('#likes-count').textContent = likes;
    addAndDeleteLikes(likeButton, cardId, newElement)
    api.createMyCart(newElement, cardOwnerId)
        .then(api.onResponse)
        .then(data => {
            const myID = data._id;
            if (cardOwnerId == myID) {
                addCart(newElement, cardId)
            }
        })
        .catch(api.error)
    newElement.querySelector('.elements__image').addEventListener('click', () => openImagePopup(imageCards, nameCards));
    return newElement;
};

// Добавление и удаление лайков

function addAndDeleteLikes(likeButton, cardId, newElement) {
    likeButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (likeButton.classList.contains('elements__button_active')) {
            api.deleteLike(cardId)
                .then(api.onResponse)
                .then((card) => {
                    api.likesCount()
                        .then(api.onResponse)
                        .then((data) => {
                            data.forEach((item) => {
                                if (item._id == card._id) {
                                    newElement.querySelector('#likes-count').textContent = item.likes.length;
                                }
                            })
                        })
                        .catch(api.error)

                    likeButton.classList.toggle('elements__button_active');
                })
                .catch(api.error)
        } else {
            api.putLike(cardId)
                .then(api.onResponse)
                .then((card) => {
                    api.likesCount()
                        .then(api.onResponse)
                        .then((data) => {
                            data.forEach((item) => {
                                if (item._id == card._id) {
                                    newElement.querySelector('#likes-count').textContent = item.likes.length;
                                }
                            })
                        })
                        .catch(api.error)
                    likeButton.classList.toggle('elements__button_active');
                })
                .catch(api.error)
        }
    })
}


function addCart(element, cardId) {
    element.insertAdjacentHTML('afterbegin', '<button type="button" class="elements__delete-button" id="delete"></button>');
    element.querySelector('.elements__delete-button').addEventListener('click', (evt) => {
        evt.target.closest('.elements__element').remove();
        api.deleteCardFromServer(cardId)
            .then(api.onResponse)
            .catch(api.error)
    });
}

//Добавление карточки

function createOneCard(evt) {
    evt.preventDefault();
    renderLoading(true);
    elementsBox.prepend(createCard(titlelink.value, titleInput.value));
    const element = elementsBox.querySelector('.elements__element');
    api.deleteMyCard()
        .then(api.onResponse)
        .then(() => {
            addCart(element)
        })
        .catch(api.error)
    api.cardForServer(titlelink.value, titleInput.value)
        .then(api.onResponse)
        .catch(api.error)
        .finally(() => {
            document.querySelector('#button-add-create').textContent = 'Создать';
            })
    closePopup(popupAddOpened);
    titlelink.value = '';
    titleInput.value = '';
    setTimeout(function () {
        location.reload();
    }, 50);
};

// Карточки с сервера

api.cardsFromServer()
    .then(api.onResponse)
    .then(data => {
        data.forEach(function (item) {
            const like = item.likes.length;
            const cardId = item._id;
            const cardOwnerId = item.owner._id;
            const likesFromCard = item.likes;
            elementsBox.append(createCard(item.link, item.name, like, cardId, cardOwnerId, likesFromCard));
            likesFromCard.forEach((item) => {
                if (document.querySelector('.elements').dataset.profile == item._id) {
                    document.querySelector('#like').classList.add('elements__button_active');
                }
            })
        });
    })
    .catch(api.error)

// Функция смены аватара

function createNewAvatar(evt) {
    evt.preventDefault();
    avatarElement.src = avatarLink.value;
    renderLoading(true)
    api.avatarChange(avatarLink.value)
        .then(api.onResponse)
        .catch(api.error)
        .finally(() => {
            document.querySelector('#button-add-avatar').textContent = 'Сохранить';
            })
    closePopup(popapAvatar);
}

function renderLoading(isLoading) {
    if (isLoading) {
        const popupButtons = document.querySelectorAll('.popup__button');
        popupButtons.forEach((item) => {
            item.textContent = 'Сохранение...';
        })
    }
  };

// Слушатель кнопки редактирования

popupEditOpened.addEventListener('submit', editProfile);

// Слушатель кнопки добавления карточки

popupAddOpened.addEventListener('submit', createOneCard);

// Слушатель кнопки смены аватара

popapAvatar.addEventListener('submit', createNewAvatar);

// Вызываем функцию валидации

valid.enableValidation(selectors);