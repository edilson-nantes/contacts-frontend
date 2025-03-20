import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FormField from "../components/FormField";
import { validateLoginForm } from "../utils/validations/validateLoginForm";
import { login } from "../services/authService";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import { SnackbarAlert } from "../components/SnackbarAlert";

export function LoginPage() {
     const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });

    const [snackbarFailOpen, setSnackbarFailOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { errors, isValid } = validateLoginForm(formData, formErrors);
        setFormErrors(errors);
        if (isValid) {
            const user = await login(formData);

            if(user instanceof Error) {
                setErrorMessage(user.message);
                setSnackbarFailOpen(true);
            }else {
                console.log('Login realizado com sucesso.');
            }
        }
    };

    const handleFailClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarFailOpen(false);
    };

    const formFields = [
        { id: 'email', name: 'email', label: 'Email', type: 'email' },
        { id: 'password', name: 'password', label: 'Password', type: 'password' },
    ];

    return (
        <Container className="flex flex-row items-center justify-center min-h-screen min-w-screen bg-stone-100">
            <Card variant="outlined" className="p-8 w-[500px]">
                <Typography variant="h4">Login</Typography>
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
                        Login
                    </Button>
                    <Typography
                        variant="body1"
                        sx={{ textAlign: 'center' }}
                    >
                        Não tem conta? <Link href="/register" type="button">Registre-se</Link>
                    </Typography>

                    <SnackbarAlert open={snackbarFailOpen} message={errorMessage} severity="error" onClose={handleFailClose} />
                </Box>
            </Card>
        </Container>
    );
}