import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AlertProvider } from "../components/AlertContext";
import { fetchApi } from "../components/ApiWrapper";

const Layout = async () => {
    const token = localStorage.getItem("token");
    await fetchApi('https://radio-vrijstaande-pilaster.runasp.net/api/api/auth/me', {
        headers: {
            'Authorization': token ? `Bearer ${token}` : undefined,
        },
    }
    )
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
