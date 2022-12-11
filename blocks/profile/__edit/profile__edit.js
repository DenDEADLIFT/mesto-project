//Находим кномки открытия и закрытия открытия попапа по id
const popupEditOpened = document.querySelector('.profile__edit');
const popupEditClose = document.querySelector('#popup-edit-close');

//Открываем попап

function popupOpened() {
    const popupOpened = document.querySelector('#popup-edit');
    popupOpened.classList.add('popup_opened');
}
  
popupEditOpened.addEventListener('click', popupOpened); 

//Закрываем попап

function popupClose() {
    const popupOpened = document.querySelector('#popup-edit');
    popupOpened.classList.remove('popup_opened');
}

popupEditClose.addEventListener('click', popupClose); 

// Находим форму в DOM

const formElement = document.querySelector('#form-edit');

// Находим поля формы в DOM

const nameInput = formElement.querySelector('#popup-input-name');
const jobInput = formElement.querySelector('#popup-input-about');
const buttonEditSave = document.querySelector('#button-edit-save');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault();
    let inputName = nameInput.value;
    let inputjob = jobInput.value;
    document.querySelector('.profile__name').textContent = inputName;
    document.querySelector('.profile__research').textContent = inputjob;
    popupClose()
}

buttonEditSave.addEventListener('click', handleFormSubmit);