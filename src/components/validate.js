// Добавляем класс с ошибкой

function showInputError (formElement, inputElement, errorMessage, selectors) {
    //const inputElement = document.querySelector('.popup__input');
    const errorElement = formElement.querySelector(`.popup__input_error-${inputElement.id}`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);

};

// Удаляем класс с ошибкой

function hideInputError (formElement, inputElement, selectors) {
    //const inputElement = document.querySelector('.popup__input');
    const error = formElement.querySelector(`.popup__input_error-${inputElement.id}`);
    inputElement.classList.remove(selectors.inputErrorClass);
    error.classList.remove(selectors.errorClass);
    error.textContent = '';
};

// Проверяем валидность поля

function isValid (formElement, inputElement, selectors) {
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

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid)
};

function toggleButtonState (inputList, buttonElement, selectors) {
    inputList.forEach((input) => input.setCustomValidity(''));
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
};

function setEventListeners (formElement, selectors) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const submitButton = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, submitButton, selectors);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, selectors);
            toggleButtonState(inputList, submitButton, selectors);
        })
    });
};

export function enableValidation (selectors) {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, selectors);
    });
};