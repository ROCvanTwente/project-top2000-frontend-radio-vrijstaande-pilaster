// AlertContext.jsx
import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }) {
    const [alert, setAlert] = useState({ message: "", type: "success" });

    const showAlert = (message, type = "success", duration = 3000) => {
        setAlert({ message, type });
        if (duration > 0) {
            setTimeout(() => setAlert({ message: "", type: "success" }), duration);
        }
    };

    const closeAlert = () => setAlert({ message: "" });

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <div
                className={`alert alert-${alert.type} alert-dismissible`}
                role="alert"
                style={{
                    zIndex: 1050,
                    minWidth: "300px",
                    position: 'fixed',
                    top: '70px',
                    right: '50px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                    transition: 'opacity 300ms ease, transform 300ms ease, visibility 300ms',
                    opacity: alert.message ? 1 : 0,
                    transform: alert.message ? 'translateY(0)' : 'translateY(-10px)',
                    visibility: alert.message ? 'visible' : 'hidden',
                    pointerEvents: alert.message ? 'auto' : 'none'
                }}
            >
                {alert.message}
                <button type="button" className="btn-close" onClick={closeAlert}></button>
            </div>
        </AlertContext.Provider>
    );
}
