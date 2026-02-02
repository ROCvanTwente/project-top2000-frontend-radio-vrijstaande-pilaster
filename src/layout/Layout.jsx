import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AlertProvider } from "../components/AlertContext";

const Layout = () => {
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
