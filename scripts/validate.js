const enableValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    inputErrorClass: 'form__input-error',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
};

function disableSubmit(event) {
    event.preventDefault();
}

/*Валидация форм*/

function formValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((form) => {
        form.addEventListener('submit', disableSubmit);
        form.addEventListener('input', () => {
            toggleButton(form, config);
        });

        addInputListners(form, config);
        toggleButton(form, config);

    });
}

/*Проверка валидности*/

function handleFormInput(event, config) {
    const input = event.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);

    console.log(errorElement);

    if (input.validity.valid) {
        input.classList.remove(config.inputErrorClass)
        errorElement.textContent = '';
    } else {
        input.classList.add(config.inputErrorClass);
        errorElement.textContent = input.validationMessage;
    }

}

/*Кнопка*/

function toggleButton(form, config) {
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    const isFormValid = form.checkValidity();

    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classlist.toggle('inactiveButtonClass', !isFormValid);
}

/*Слушатель для инпутов*/

function addInputListners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));

    inputList.forEach(function (item) {
        item.addEventListener('input', (event) => {
            handleFormInput(event, config)
        });
    });
}


formValidation(enableValidation);

