// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            localStorage.setItem("authToken", authToken);
        }
    }, [authToken]);

    const handleLogin = (email, setError, navigate) => {
        if (!email.trim()) {
            setError("Please fill email");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Email invalid");
            return;
        }

        localStorage.setItem("userEmail", email);
        setAuthToken("mock-token");
        Swal.fire({
            title: "Success!",
            text: "Email Success",
            icon: "success",
            confirmButtonText: "Send Magic link"
        }).then(() => {
            navigate("/magic-link");
        });
    };

    const handleLogout = () => {
        setAuthToken(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ authToken, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
