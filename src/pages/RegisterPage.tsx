import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import FormField from "../components/FormField";

export function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        phone: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateInputs = () => {
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

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateInputs()) {
            console.log("Registro bem-sucedido!");
            console.log(formData);
            setSnackbarOpen(true);
        }
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
      ) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarOpen(false);
      };

    const formFields = [
        { id: 'name', name: 'name', label: 'Nome', type: 'text' },
        { id: 'phone', name: 'phone', label: 'Telefone', type: 'text' },
        { id: 'email', name: 'email', label: 'Email', type: 'email' },
        { id: 'confirmEmail', name: 'confirmEmail', label: 'Confirme o email', type: 'email' },
        { id: 'password', name: 'password', label: 'Senha', type: 'password' },
        { id: 'confirmPassword', name: 'confirmPassword', label: 'Confirme a senha', type: 'password' },
    ];

    return (
        <Container className="flex flex-row items-center justify-center min-h-screen min-w-screen bg-stone-100">
            <Card variant="outlined" className="p-8 w-[500px]">
                <Typography variant="h4">Cadastro</Typography>
                <Box component="form" noValidate className="flex flex-col gap-4 py-5 w-full" onSubmit={handleSubmit}>
                    {formFields.map((field) => (
                        <FormField
                            key={field.id}
                            id={field.id}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            value={formData[field.name as keyof typeof formData]}
                            error={formErrors[field.name as keyof typeof formErrors]}
                            onChange={handleChange}
                        />
                    ))}

                    <Button type="submit" variant="contained" color="primary">
                        Registrar
                    </Button>
                    <Typography
                        variant="body1"
                        sx={{ textAlign: 'center' }}
                    >
                        Já tem conta? <Link href="/" type="button">Login</Link>
                    </Typography>

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={snackbarOpen}
                        autoHideDuration={5000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Registro bem-sucedido!
                        </Alert>
                    </Snackbar>

                </Box>
            </Card>
        </Container>
    );
}