export const validateRegisterForm = (formData: any, formErrors: any) => {
    let errors = { ...formErrors };
    let isValid = true;

    if (!formData.name.trim()) {
        errors.name = 'Preencha o nome.';
        isValid = false;
    } else {
        errors.name = '';
    }

    if (!formData.phone.trim()) {
        errors.phone = 'Preencha o telefone.';
        isValid = false;
    } else {
        errors.phone = '';
    }

    if (!formData.email.trim()) {
        errors.email = 'Preencha o email.';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Digite um endereço de email válido.';
        isValid = false;
    } else {
        errors.email = '';
    }

    if (formData.email !== formData.confirmEmail) {
        errors.confirmEmail = 'Os emails não coincidem.';
        isValid = false;
    } else {
        errors.confirmEmail = '';
    }

    if (!formData.password.trim()) {
        errors.password = 'Preencha a senha.';
        isValid = false;
    } else {
        errors.password = '';
    }

    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'As senhas não coincidem.';
        isValid = false;
    } else {
        errors.confirmPassword = '';
    }

    return { errors, isValid };
};