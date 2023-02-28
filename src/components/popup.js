//Функция открытия попапов

export function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
};

//Функция закрытия попапов

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
};

//Попап с картинкой

export function openImagePopup(newElement) {
    const popupImageOpened = document.querySelector('#popup-image');
    const popupImageTitle = document.querySelector('#popup-image-title');
    const popupImage = document.querySelector('.popup__image');
    newElement.querySelector('.elements__image').addEventListener('click', function () {
        openPopup(popupImageOpened);
        const cardOpenedImage = newElement.querySelector('.elements__image');
        const cardOpenedTitle = newElement.querySelector('.elements__name');
        popupImage.src = cardOpenedImage.src;
        popupImage.alt = cardOpenedImage.alt;
        popupImageTitle.textContent = cardOpenedTitle.textContent;
    });
};