import { Box, Typography, TextField, Button, Card, FormControl, Container, Link } from "@mui/material";
import { useState } from "react";


export function LoginPage() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (emailError || passwordError) {
            event.preventDefault();
            return;
        }
        console.log("Login successful!");

        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const validateInputs = (email: string, password: string) => {
        let isValid = true;
        
        if (!email.trim()) {
            setEmailError(true);
            setEmailErrorMessage('Preencha o email.');
            isValid = false;
        }else if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }
        
        if (!password.trim()) {
            setPasswordError(true);
            setPasswordErrorMessage('Preencha a senha.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };
    

    return (
        <Container className="flex flex-row items-center justify-center min-h-screen min-w-screen bg-stone-100">
            <Card variant="outlined" className="p-8 w-[500px]">
                <Typography variant="h4">Login</Typography>
                <Box component="form" noValidate className="flex flex-col gap-4 py-5 w-full" onSubmit={handleSubmit}>
                    
                    <FormControl>
                        <TextField
                            error={emailError}
                            helperText={emailErrorMessage}
                            variant="outlined"
                            id="email"
                            type="email"
                            name="email"
                            label="Email"
                            autoFocus
                            required
                            fullWidth
                            value={email}
                            color={emailError ? 'error' : 'primary'}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            variant="outlined"
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            autoFocus
                            required
                            fullWidth
                            value={password}
                            color={passwordError ? 'error' : 'primary'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary" onClick={() => {validateInputs(email, password)}}>
                        Login
                    </Button>
                    <Typography variant="body1" sx={{textAlign: 'center'}}>Não tem conta? <Link component="button" type="button">Registre-se</Link></Typography>
                </Box>
            </Card>
      
        </Container>
      
    );
}