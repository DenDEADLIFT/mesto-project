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

<<<<<<< HEAD
//Открытие и закрытие попапа добавления

buttonAddOpened.addEventListener('click', function () {
    openPopup(popupAddOpened);
});

buttonAddClose.addEventListener('click', function () {
    closePopup(popupAddOpened);
}); 
=======
>>>>>>> develop

nameInput.value = profileName.textContent;
jobInput.value = profileResearch.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handleFormSubmit(evt) {
    evt.preventDefault();    
    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__research').textContent = jobInput.value;
    closePopup(popupEditOpened)
}

buttonEditSave.addEventListener('click', handleFormSubmit);

//Карточки

initialCards.forEach(function(item) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const usersOnline = document.querySelector('.elements');
    const newElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    newElement.querySelector('.elements__image').src = item.link;
    newElement.querySelector('.elements__name').textContent = item.name;
    usersOnline.append(newElement); 
});

// Кнопка лайк

const likeButton = document.querySelectorAll('.elements__button');

likeButton.forEach(like => {
    like.addEventListener('click', () => {
        like.classList.toggle('elements__button_active'); // Перебираем массив и, на каждый элемент, вешаем изменение селектора
    });
});

<<<<<<< HEAD
=======
//Открытие и закрытие попапа добавления

buttonAddOpened.addEventListener('click', function () {
    openPopup(popupAddOpened);
});

buttonAddClose.addEventListener('click', function () {
    closePopup(popupAddOpened);
}); 

//Добавление карточек

>>>>>>> develop
