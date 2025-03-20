import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FormField from "../components/FormField";
import { validateRegisterForm } from "../utils/validations/validateRegisterForm";
import { createUser } from "../services/authService";
import { SnackbarAlert } from "../components/SnackbarAlert";

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
    
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === "clickaway") return;
        setSnackbar({ ...snackbar, open: false });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { errors, isValid } = validateRegisterForm(formData, formErrors);
        setFormErrors(errors);
        if (isValid) {
            const user = await createUser(formData);

            if(user instanceof Error) {
                setSnackbar({ open: true, message: user.message, severity: "error" });
            }else {
                setSnackbar({ open: true, message: "Registro bem-sucedido!", severity: "success" });
            }
        }
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
        <Container className="flex flex-row items-center justify-center h-screen min-w-full bg-stone-100">
            <Card variant="outlined" className="p-8 w-full max-w-lg">
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
                        className="text-center"
                    >
                        Já tem conta? <Link href="/" type="button">Login</Link>
                    </Typography>

                    <SnackbarAlert open={snackbar.open} message={snackbar.message} severity={snackbar.severity as any} onClose={handleSnackbarClose} />

                </Box>
            </Card>
        </Container>
    );
}