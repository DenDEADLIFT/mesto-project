import { closePopupByEsc, popupImageTitle, popupImage, popupImageOpened, selectors } from '../index';

//Функция открытия попапов

export function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

//Функция закрытия попапов

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

//Попап с картинкой

export function openImagePopup() {
        const cardOpenedImage = document.querySelector('.elements__image');
        const cardOpenedTitle = document.querySelector('.elements__name');
        popupImage.src = cardOpenedImage.src;
        popupImage.alt = cardOpenedImage.alt;
        popupImageTitle.textContent = cardOpenedTitle.textContent;
        openPopup(popupImageOpened);
};