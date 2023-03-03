// Добавляем класс с ошибкой

function showInputError(formElement, inputElement, errorMessage, selectors) {
    const errorElement = formElement.querySelector(`${selectors.popupErrorInput}${inputElement.id}`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.classList.add(selectors.errorClass);
    errorElement.textContent = errorMessage;
};

// Удаляем класс с ошибкой

export function hideInputError(formElement, inputElement, selectors) {
    const error = formElement.querySelector(`${selectors.popupErrorInput}${inputElement.id}`);
    inputElement.classList.remove(selectors.inputErrorClass);
    error.classList.remove(selectors.errorClass);
    error.textContent = '';
};

// Проверяем валидность поля

function isValid(formElement, inputElement, selectors) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
    } else {
        hideInputError(formElement, inputElement, selectors);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Добавляем и удаляем неактивный класс для кнопки добавления, отключаем и включаем её

function toggleButtonState(inputList, buttonElement, selectors) {
    inputList.forEach((input) => input.setCustomValidity(''));
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
};

// Вешаем слушатели ввода символов в инпуты и на кнопку добавления

export function setEventListeners(formElement, selectors) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const submitButton = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, submitButton, selectors);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            
            isValid(formElement, inputElement, selectors);
            toggleButtonState(inputList, submitButton, selectors);
        });
    });
};

// Функция валидации форм. Ищем формы, перебираем их и добавляем функцию слушателей. 
// Экспортируем в index.js

export function enableValidation(selectors) {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, selectors);
    });
};

// Функция блокировки кнопки

export function buttonBlock(selectors) {
    const popupButton = document.querySelector('.popup__button');
    popupButton.disabled = true;
    popupButton.classList.add(selectors.inactiveButtonClass);
};