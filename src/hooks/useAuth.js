import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function parseUser(token) {
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
}

export function useAuth() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(() => parseUser(token));

    useEffect(() => {
        const handler = () => {
            const t = localStorage.getItem("token");
            setToken(t);
            setUser(parseUser(t));
        };
        window.addEventListener("authChange", handler);
        return () => window.removeEventListener("authChange", handler);
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(parseUser(newToken));
        window.dispatchEvent(new Event("authChange"));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        window.dispatchEvent(new Event("authChange"));
        window.location.href = "/login";
    };

    const roles = Array.isArray(user?.role)
        ? user.role
        : user?.role
        ? [user.role]
        : [];

    return {
        token,
        user,
        roles,
        isAuthenticated: !!token,
        isAdmin: roles.includes("Admin"),
        login,
        logout
    };
}
