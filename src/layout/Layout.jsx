import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { AlertProvider } from "../components/AlertContext";
import apiFetch from "../components/ApiWrapper";
import refreshAccessToken from "../components/RefreshComponent";

const Layout = () => {
    const { logout } = useAuth();
    const [authChecked, setAuthChecked] = useState(false);

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const { exp } = jwtDecode(token);
            // exp is in seconds
            return Date.now() >= exp * 1000;
        } catch {
            console.log("Failed to decode token");
            return true;
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setAuthChecked(true);
                return;
            }

            try {
                // if token expired, refresh before calling /me
                if (isTokenExpired(token)) {
                    await refreshAccessToken(); // your existing refresh function
                }

                // now token is valid → safe to call /me
                await apiFetch("/api/auth/me");
            } catch {
                logout();
            } finally {
                setAuthChecked(true);
            }
        };

        checkAuth();
    }, [logout]);


    if (!authChecked) {
        return null; // or a spinner
    }

    return (
        <AlertProvider>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </AlertProvider>
    );
};

export default Layout;
