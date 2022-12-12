//Находим кномки открытия и закрытия открытия попапа по id
const popupEditOpened = document.querySelector('.profile__edit');
const popupEditClose = document.querySelector('#popup-edit-close');
const popupOpened = document.querySelector('#popup-edit');

// Находим форму в DOM

let formElement = document.querySelector('#form-edit');

// Находим поля формы в DOM

const nameInput = formElement.querySelector('#popup-input-name');
const jobInput = formElement.querySelector('#popup-input-about');
const buttonEditSave = document.querySelector('#button-edit-save');
const profileName = document.querySelector('.profile__name');
const profileResearch = document.querySelector('.profile__research');

//Открываем любой попап

function popupOpen(popup) {
    popupOpened.classList.add('popup_opened');
}

//Закрываем любой попап

function popupClose(popup) {
    popupOpened.classList.remove('popup_opened');
}

//Открываем попап редактирования

function popupEditOpen() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileResearch.textContent;
    popupOpen()
}
  
popupEditOpened.addEventListener('click', popupEditOpen); 
popupEditClose.addEventListener('click', popupClose); 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault();    
    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__research').textContent = jobInput.value;
    popupClose()
}

buttonEditSave.addEventListener('click', handleFormSubmit);