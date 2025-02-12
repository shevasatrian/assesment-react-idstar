// Login.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getAuthToken } from "../utils/Auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { handleLogin } = useAuth();

    useEffect(() => {
        const storedToken = getAuthToken()
        if (storedToken) {
            navigate('/magic-link')
        }
    }, [navigate])

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(email, setError, navigate);
    };

    return (
        <>
            <Header />
            <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>  
                <Card sx={{ p: 2, maxWidth: 600, width: '100%' }}>
                    <h2>Login with magic link</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            error={!!error}
                            helperText={error}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </form>
                </Card>
            </Container>
            
        </>
    );
};

export default Login;
