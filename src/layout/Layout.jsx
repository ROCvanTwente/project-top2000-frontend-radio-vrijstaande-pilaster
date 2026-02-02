import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AlertProvider } from "../components/AlertContext";
import apiFetch from "../components/ApiWrapper";

const Layout = () => {
    const { logout } = useAuth();
    const [authChecked, setAuthChecked] = useState(false);
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await apiFetch("/api/auth/me");
            } catch {
                logout(); // 👈 single source of truth
            } finally {
                setAuthChecked(true);
            }
        };

        if (localStorage.getItem("token")) {
            checkAuth();
        } else {
            setAuthChecked(true);
        }
    }, []);


    if (!authChecked) {
        return null; // or spinner
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
