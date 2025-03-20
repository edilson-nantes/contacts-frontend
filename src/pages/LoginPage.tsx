import { Box, Typography, TextField, Button, Card, FormControl, Container, Link } from "@mui/material";
import { useState } from "react";

export function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });
/*************  ✨ Codeium Command ⭐  *************/
    /**
     * Handles the login form submission.
     * 
     * If the email or password is invalid, it prevents the default form submission.
     * Otherwise, it logs a success message and prints the entered email and password.
     * 
     * @param event The form event.
     */
/******  15c886f7-a5fb-46ac-8c0c-c6c1f4bbe27e  *******/
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

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateInputs()) {
            console.log("Login bem-sucedido!");
            console.log(formData);
        }
    };

    return (
        <Container className="flex flex-row items-center justify-center min-h-screen min-w-screen bg-stone-100">
            <Card variant="outlined" className="p-8 w-[500px]">
                <Typography variant="h4">Login</Typography>
                <Box component="form" noValidate className="flex flex-col gap-4 py-5 w-full" onSubmit={handleSubmit}>
                    <FormControl>
                        <TextField
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            variant="outlined"
                            id="email"
                            type="email"
                            name="email"
                            label="Email"
                            autoFocus
                            required
                            fullWidth
                            value={formData.email}
                            color={formErrors.email ? 'error' : 'primary'}
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
                            label="Password"
                            required
                            fullWidth
                            value={formData.password}
                            color={formErrors.password ? 'error' : 'primary'}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                    <Typography variant="body1" sx={{ textAlign: 'center' }}>Não tem conta? <Link component="button" type="button">Registre-se</Link></Typography>
                </Box>
            </Card>
        </Container>
    );
}