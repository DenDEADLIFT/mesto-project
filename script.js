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
const cardTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('#popup-image-title');
const titleInput = document.querySelector('#popup-input-title');
const titlelink = document.querySelector('#popup-input-link');
const closeButtons = document.querySelectorAll('.popup__close');
const elementsBox = document.querySelector('.elements');

//Функция открытия попапов

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

//Функция закрытия попапов

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

//Открытие попапа редактирования

buttonEditOpened.addEventListener('click', function () {
    openPopup(popupEditOpened);
    nameInput.value = profileName.textContent;
    jobInput.value = profileResearch.textContent;
}); 

// Функция редактирования профиля

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileResearch.textContent = jobInput.value;
    closePopup(popupEditOpened)
}

buttonEditSave.addEventListener('click', editProfile);

//Карточка

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
    openImagePopup (newElement);
    return newElement;
}

//Шесть карточек

initialCards.forEach(function(item) {
    elementsBox.prepend(createCard(item.link, item.name));
});

//Открытие попапа добавления

buttonAddOpened.addEventListener('click', function () {
    openPopup(popupAddOpened);
});

//Добавление карточек

function createCards(evt) {
    evt.preventDefault();
    elementsBox.prepend(createCard(titlelink.value, titleInput.value));
    closePopup(popupAddOpened);
    titlelink.value = '';
    titleInput.value = '';
};

const buttonAddCreate = document.querySelector('#button-add-create');

buttonAddCreate.addEventListener('click', createCards);

//Попап с картинкой

function openImagePopup (newElement) {
    newElement.querySelector('.elements__image').addEventListener('click', function () {
        openPopup(popupImageOpened);
        const cardOpenedImage = newElement.querySelector('.elements__image');
        const cardOpenedTitle = newElement.querySelector('.elements__name');
        popupImage.src = cardOpenedImage.src;
        popupImage.alt = cardOpenedImage.alt;
        popupImageTitle.textContent = cardOpenedTitle.textContent;
    });
}

//Закрытие любого попапа

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });




  // Валидация форм

  //Изменение стиля поля при ошибке

  const formElement = document.querySelector('.popup');
  const formInput = formElement.querySelector('.popup__input');

  // Добавляем класс с ошибкой

  const showInputError = (element) => {
    element.classList.add('popup__input_type_error');
  };

  // Удаляем класс с ошибкой

  const hideInputError = (element) => {
    element.classList.remove('popup__input_type_error');
  };

  // Проверяем валидность поля

  const isValid = () => {
    if (!formInput.validity.valid) {
        showInputError(formInput);
    } else {
        hideInputError(formInput);
    }
  };

  formInput.addEventListener('input', isValid);