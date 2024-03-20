import validator from "validator";

export default class ValidateForm {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
        this.events();
    }

    events() {
        if (this.form) {
            this.form.addEventListener('submit', e => {
                this.handleSubmit(e);
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const checkFields = this.validateFields();

        if (checkFields) {
            this.form.submit();
        }
    }

    validateFields() {
        let isValid = true;

        for (let textError of this.form.querySelectorAll('.alert')) {
            textError.remove();
        }

        const emailField = this.form.querySelector('#emailC');
        const phoneField = this.form.querySelector('#phone');

        for (let field of this.form.querySelectorAll('.validate')) {
            const label = field.previousElementSibling.innerText.replace(/:/g, '');
            if (!field.value && this.form.id !== 'form-contact') {
                isValid = false;
                this.newError(field, `O campo ${label} não pode estar em branco`);
            }

            if (field.id === 'email' || field.id === 'emailr') {
                if (field.value && !validator.isEmail(field.value)) {
                    this.newError(field, `Por favor digite um e-mail válido!`);
                    isValid = false;
                }
            }

            if (field.id === 'password' || field.id === 'passwordr') {
                if (password.value.length < 3 || password.value.length > 50) {
                    this.newError(field, 'A senha deve ter entre 3 a 50 caracteres');
                    isValid = false;
                }
            }

            if (field.id == 'name') {
                if (!field.value) {
                    this.newError(field, 'Nome é um campo obrigatório.');
                    isValid = false;
                }
            }
        }

        if (emailField && phoneField) {
            if (!emailField.value && !phoneField.value) {
                this.newError(emailField, 'Pelo menos um contato deve ser enviado: e-mail ou telefone');
                this.newError(phoneField, 'Pelo menos um contato deve ser enviado: e-mail ou telefone');
                isValid = false;
            } else {
                isValid;
            }
        }

        return isValid;
    }

    newError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('alert');
        div.classList.add('alert-danger');
        div.style.padding = '5px';
        div.style.marginTop = '10px';
        field.insertAdjacentElement('afterend', div);
    }
}