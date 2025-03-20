import { Box, Typography, TextField, Button, Card, FormControl, Container, Link } from "@mui/material";
import { useState } from "react";

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
        }
    };

    return (
        <Container className="flex flex-row items-center justify-center min-h-screen min-w-screen bg-stone-100">
            <Card variant="outlined" className="p-8 w-[500px]">
                <Typography variant="h4">Cadastro</Typography>
                <Box component="form" noValidate className="flex flex-col gap-4 py-5 w-full" onSubmit={handleSubmit}>
                    <FormControl>
                        <TextField
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                            variant="outlined"
                            id="name"
                            type="text"
                            name="name"
                            label="Nome"
                            autoFocus
                            required
                            fullWidth
                            value={formData.name}
                            color={formErrors.name ? 'error' : 'primary'}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            error={!!formErrors.phone}
                            helperText={formErrors.phone}
                            variant="outlined"
                            id="phone"
                            type="text"
                            name="phone"
                            label="Telefone"
                            required
                            fullWidth
                            value={formData.phone}
                            color={formErrors.phone ? 'error' : 'primary'}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            variant="outlined"
                            id="email"
                            type="email"
                            name="email"
                            label="Email"
                            required
                            fullWidth
                            value={formData.email}
                            color={formErrors.email ? 'error' : 'primary'}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            error={!!formErrors.confirmEmail}
                            helperText={formErrors.confirmEmail}
                            variant="outlined"
                            id="confirmEmail"
                            type="email"
                            name="confirmEmail"
                            label="Confirme o email"
                            required
                            fullWidth
                            value={formData.confirmEmail}
                            color={formErrors.confirmEmail ? 'error' : 'primary'}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                            variant="outlined"
                            id="password"
                            name="password"
                            type="password"
                            label="Senha"
                            required
                            fullWidth
                            value={formData.password}
                            color={formErrors.password ? 'error' : 'primary'}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            error={!!formErrors.confirmPassword}
                            helperText={formErrors.confirmPassword}
                            variant="outlined"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirme a senha"
                            required
                            fullWidth
                            value={formData.confirmPassword}
                            color={formErrors.confirmPassword ? 'error' : 'primary'}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary">
                        Registrar
                    </Button>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>Já tem conta? <Link component="button" type="button">Login</Link></Typography>
                </Box>
            </Card>
        </Container>
    );
}