import { closePopupByEsc, popupImageTitle, popupImage, popupImageOpened } from '../index';

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

export function openImagePopup(imageCards, nameCards) {
    openPopup(popupImageOpened);
    popupImage.src = imageCards;
    popupImage.alt = nameCards;
    popupImageTitle.textContent = nameCards;
};