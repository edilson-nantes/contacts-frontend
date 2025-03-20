export const validateLoginForm = (formData: any, formErrors: any) => {
    let errors = { ...formErrors };
    let isValid = true;

    if (!formData.email.trim()) {
        errors.email = 'Preencha o email.';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Digite um endereço de email válido.';
        isValid = false;
    } else {
        errors.email = '';
    }

    if (!formData.password.trim()) {
        errors.password = 'Preencha a senha.';
        isValid = false;
    } else {
        errors.password = '';
    }

    return { errors, isValid };
};