import { closePopupByEsc, popupImageTitle, popupImage, popupImageOpened, selectors, popupButton } from '../index';
import * as valid from '../components/validate.js'

//Функция открытия попапов

export function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

//Функция закрытия попапов

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
    valid.buttonBlock(popupButton, selectors);
};

//Попап с картинкой

export function openImagePopup(newElement, imageCards, nameCards) {
    newElement.querySelector('.elements__image').addEventListener('click', function () {        
    openPopup(popupImageOpened);
    popupImage.src = imageCards;
    popupImage.alt = nameCards;
    popupImageTitle.textContent = nameCards;
    });
};