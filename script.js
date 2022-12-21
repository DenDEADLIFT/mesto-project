const buttonEditOpened = document.querySelector('.profile__edit');
const buttonEditClose = document.querySelector('#popup-edit-close');
const popupEditOpened = document.querySelector('#popup-edit');
const nameInput = document.querySelector('#popup-input-name');
const jobInput = document.querySelector('#popup-input-about');
const buttonEditSave = document.querySelector('#button-edit-save');
const profileName = document.querySelector('.profile__name');
const profileResearch = document.querySelector('.profile__research');
const buttonAddOpened = document.querySelector('.profile__add');
const buttonAddClose = document.querySelector('#popup-add-close');
const popupAddOpened = document.querySelector('#popup-add');
const popupImageOpened = document.querySelector('#popup-image');
const popupImageClose = document.querySelector('#popup-image-close');
const imagePopup = document.querySelector('.elements__image');

//Функция открытия попапов

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

//Функция закрытия попапов

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

//Открытие и закрытие попапа редактирования

buttonEditOpened.addEventListener('click', function () {
    openPopup(popupEditOpened);
}); 

buttonEditClose.addEventListener('click', function () {
    closePopup(popupEditOpened);
});


nameInput.value = profileName.textContent;
jobInput.value = profileResearch.textContent;

// Функция редактирования профиля

function editProfile(evt) {
    evt.preventDefault();
    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__research').textContent = jobInput.value;
    closePopup(popupEditOpened)
}

buttonEditSave.addEventListener('click', editProfile);

//Карточка

function createCard(imageCards, nameCards) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const newElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const elementsBox = document.querySelector('.elements');
    newElement.querySelector('.elements__image').src = imageCards;
    newElement.querySelector('.elements__image').alt = nameCards;
    newElement.querySelector('.elements__name').textContent = nameCards;
    elementsBox.prepend(newElement);
    liked();
    deleteCards();
    openImagePopup (newElement);
    return newElement;
}

//Попап с картинкой

function openImagePopup (newElement) {
    newElement.querySelector('.elements__image').addEventListener('click', function () {
        openPopup(popupImageOpened);
        const cardOpenedImage = newElement.querySelector('.elements__image').cloneNode(true);
        const cardOpenedTitle = newElement.querySelector('.elements__name').cloneNode(true);
        document.querySelector('.popup__image').src = cardOpenedImage.src;
        document.querySelector('.popup__image').alt = cardOpenedImage.alt;
        document.querySelector('#popup-image-title').textContent = cardOpenedTitle.textContent;
    });
}

//Шесть карточек

initialCards.forEach(function(item) {
    createCard(item.link, item.name); 
});

//Открытие и закрытие попапа добавления

buttonAddOpened.addEventListener('click', function () {
    openPopup(popupAddOpened);
});

buttonAddClose.addEventListener('click', function () {
    closePopup(popupAddOpened);
}); 

//Добавление карточек

function createCards(evt) {
    evt.preventDefault();
    const titleInput = document.querySelector('#popup-input-title');
    const titlelink = document.querySelector('#popup-input-link');
    createCard(titlelink.value, titleInput.value);
    closePopup(popupAddOpened);
};

const buttonAddCreate = document.querySelector('#button-add-create');

buttonAddCreate.addEventListener('click', createCards);

//Удаление карточек

function deleteCards() {
    const deleteButton = document.getElementById('delete');
    deleteButton.addEventListener('click', function (evt) {
        evt.target.closest('.elements__element').remove();    
    });
};

//Лайк карточек

function liked() {
    const likeButton = document.getElementById('like');
    likeButton.addEventListener('click', function (like) {
        likeButton.classList.toggle('elements__button_active'); 
    });
};

//Закрытие попапа с картинкой

popupImageClose.addEventListener('click', function () {
    closePopup(popupImageOpened);
});