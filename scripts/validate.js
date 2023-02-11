const formValidation = {
    formElement: '.form',
    formInput: '.form__input',
    inputError: 'form__input-error',
    saveButton: '.form__save-button',
    disabledButton: '.form__save-button_disabled ',
};

function disableSubmit(event) {
    event.preventDefault();
}

function enableValidation(config) {
    const form = document.querySelectorAll(config.formElement);

    /*    отменить отправку формы*/

    form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
        toggleButton(form, config);
    });

    addInputListners(form, config);
    toggleButton(form, config);

}

function handleFormInput(event, config) {
    const input = event.target;
    const inputId = input.id;
    const errorElement = document.querySelectorAll(`#${inputId}-error`);

    console.log(errorElement);

    if (input.validity.valid) {
        input.classList.remove(config.inputError)
        errorElement.textContent = '';
    } else {
        input.classList.add(config.errorClass);
        errorElement.textContent = input.validationMessage;
    }

}

function toggleButton(form, config) {
    const buttonSubmit = form.querySelectorAll(config.saveButton);
    const isFormValid = form.checkValidity();

    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classlist.toggle('disabledButton', !isFormValid);
}

function addInputListners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.formInput));

    inputList.forEach(function (item) {
        item.addEventListener('input', (event) => {
            handleFormInput(event, config)
        });
    });
}


enableValidation(formValidation);
