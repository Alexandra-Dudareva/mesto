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

/*Проверка валидности*/

function handleFormInput(event, config) {
    const input = event.target;  /*находим инпут*/
    const inputId = input.id;  /*привязываем инпут через идентификатор*/
    const errorElement = document.querySelector(`#${inputId}-error`);  /*нашли span с его id*/

    console.log(errorElement);

    if (input.validity.valid) {
        input.classList.remove(config.inputErrorClass)
        errorElement.textContent = '';
    } else {
        input.classList.add(config.inputErrorClass);
        errorElement.textContent = input.validationMessage;  /*в ходе проверки добавляем или убираем класс ошибки*/
    }

}

/*Слушатель для инпутов*/

function addInputListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));  /*находим все инпуты*/

    inputList.forEach(function (item) {
        item.addEventListener('input', (event) => {  /*перебирает инпуты*/
            handleFormInput(event, config)  /*добавляет им слушатели*/
        });
    });
}

/*Кнопка*/

function toggleButton(form, config) {
    const buttonSubmit = form.querySelector(config.submitButtonSelector);  /*ищем кнопку*/
    const isFormValid = form.checkValidity();  /*проверяем валидность формы*/

    buttonSubmit.disabled = !isFormValid; /*ставим disabled, если формане валидна и снимаем его если валидна */
    buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);  /*делаем тоже самое с классом для тоггл*/
}

/*Валидация форм*/

function formValidation(config) {  /*конфиг передает текст, как называются селекторы*/
    const formList = Array.from(document.querySelectorAll(config.formSelector)); /* функция находит форму*/

    formList.forEach((form) => {
        form.addEventListener('submit', disableSubmit); /*предотвращает ее отправку*/
        form.addEventListener('input', () => {  /*подписывается на все изменения в формах, что бы переключать состояния кнопки*/
            toggleButton(form, config);
        });

        addInputListeners(form, config); /*Навешивает слушатели на каждый инпут, что бы мы могли выводить сообщения о том, что введено неверно*/
        toggleButton(form, config);   /*проверка кнопки изначально*/
    });
}

formValidation(enableValidation);

