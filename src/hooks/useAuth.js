import { useEffect, useState } from "react";

export function useAuth() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const handler = () => {
            setToken(localStorage.getItem("token"));
        };
        window.addEventListener("authChange", handler);
        return () => window.removeEventListener("authChange", handler);
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        window.dispatchEvent(new Event("authChange"));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        window.dispatchEvent(new Event("authChange"));
        window.location.href = "/login";
    };

    return {
        token,
        isAuthenticated: !!token,
        login,
        logout
    };
}
