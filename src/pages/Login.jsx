import { useEffect, useState } from "react";
import { Card, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../utils/Auth";
import Swal from "sweetalert2";

const Login = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (getAuthToken()) {
            navigate('/magic-link')
        }
    }, [navigate])

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!email.trim()) {
            setError('Please fill email')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Email invalid')
            return
          }
        localStorage.setItem('userEmail', email)
        Swal.fire({
            title: 'Success!',
            text: 'Email Success',
            icon: 'success',
            confirmButtonText: 'Send Magic link'
        }).then(() => {
            navigate('/magic-link')
        })
    }

    return (
        <>
            <Card sx={{ p: 1 }}>
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
        </>
    )
}

export default Login;