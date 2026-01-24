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
    };

    const rolesClaim = user?.role
        || user?.roles
        || user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const roles = Array.isArray(rolesClaim) ? rolesClaim : rolesClaim ? [rolesClaim] : [];

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
