import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AlertProvider } from "../components/AlertContext";
import apiFetch from "../components/ApiWrapper";
import { useAuth } from "../hooks/useAuth";

const Layout = () => {
    const { logout } = useAuth();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setAuthChecked(true);
                return;
            }

            try {
                // apiFetch will handle 401 + token refresh automatically
                await apiFetch("/api/auth/me");
            } catch (err) {
                // if apiFetch fails even after refresh → logout
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
