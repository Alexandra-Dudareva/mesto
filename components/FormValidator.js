class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
  };

  enableValidation() {
    this._form.addEventListener('submit', this._preventDefault);
    this._form.addEventListener('input', () => {
      this._toggleButton();
    });

    this._addInputListeners(this._form, this._config);
    /*блокоруем кнопку при 1й загрузке*/
    this._toggleButton();

    this._form.addEventListener('reset', () => {
      setTimeout(() => {
       this._toggleButton();
      }, 0);
    });
  };

  /*очистка ошибок*/
  resetValidation() {
    /*this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));*/ /*находим все инпуты*/
    /*каждому инпуту добавим обработчик*/
    this._inputList.forEach( (input) => {
      this._hideInputError(input); /*метод скроет ошибки*/
    });
    /*деактивируем кнопку*/
    this._toggleButton(this._form, this._config);
  };

  /*отмена отправки формы*/
  _preventDefault(evt) {
    evt.preventDefault();
  };

  /*Проверка валидности*/
  _handleFormInput(evt){
    this._input = evt.target;  /*находим инпут*/
    this._inputId = this._input.id; /*привязываем инпут через идентификатор*/
    this._errorElement = document.querySelector(`#${this._inputId}-error`);  /*находим span с его id*/

    /*в ходе проверки добавляем или убираем класс ошибки*/
    if (this._input.validity.valid) {
      this._hideInputError(this._input);
    }
    else {
      this._input.classList.add(this._config.inputErrorClass);
      this._errorElement.textContent = this._input.validationMessage;
    }
  };

  /*скрытие ошибки*/
  _hideInputError(input){
    /*находим span с его id*/
    this._errorElement = document.querySelector(`#${input.id}-error`);
    /*убираем класс ошибки*/
    input.classList.remove(this._config.inputErrorClass);
    /*убираем текст ошибки*/
    this._errorElement.textContent = '';
  };

  /*блокировка кнопки*/
  _toggleButton(){
    /*this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);*/
    /*проверка валидности*/
    this._isFormValid = this._form.checkValidity();
    /*если форма не валидна, кнопка блокируется*/
    this._buttonSubmit.disabled = !this._isFormValid;
    /*класс заблокированной кнопки*/
    this._buttonSubmit.classList.toggle(this._config.inactiveButtonClass, !this._isFormValid);
  }

  _addInputListeners(){
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    /*проверим инпуты и добавим слушатели*/
    this._inputList.forEach( (item) => {
      item.addEventListener('input', (evt) => {
        this._handleFormInput(evt,this._config);
      });
    });
  };
}

export default FormValidator;
