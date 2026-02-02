import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AlertProvider } from "../components/AlertContext";
import fetchApi from "../components/ApiWrapper";

const Layout = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkToken() {
            const token = localStorage.getItem("token");
            try {
                await fetchApi('https://radio-vrijstaande-pilaster.runasp.net/api/api/auth/me', {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                    },
                });
            } catch (err) {
                console.log("Token check failed:", err);
            } finally {
                setLoading(false);
            }
        }

        checkToken();
    }, []);

    if (loading) return <div>Loading...</div>; // optional splash screen

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
