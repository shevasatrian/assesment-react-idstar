import { useEffect, useState } from "react"
import { getAuthToken, getUserEmail, removeAuthToken, setAuthToken } from "../utils/Auth"
import { Card, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const MagicLink = () => {
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const storedEmail = getUserEmail()
        if (!storedEmail) {
            navigate('/')
            return
        }

        const storedToken = getAuthToken()

        if (!storedToken) {
            const newToken = Math.random().toString(36).substr(2)
            setAuthToken(newToken)
            setToken(newToken)
        } else {
            setToken(storedToken)
        }
        
    }, [navigate])

    const handleLogout = () => {
        removeAuthToken()
        navigate('/login')
    }

    return (
        <>
            <Card style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
                <h2>Magic Link</h2>
                {token ? (
                    <>
                        <p>Authentication Successfull</p>
                        <p>token: {token}</p>
                        <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                
            </Card>
        </>
    )

}

export default MagicLink