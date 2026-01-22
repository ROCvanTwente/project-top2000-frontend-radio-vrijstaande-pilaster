import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navItems = [
    { to: "/", label: "Home" },
    { to: "/Statistieken", label: "Statistieken" },
    { to: "/Geschiedenis", label: "Geschiedenis" },
    { to: "/Contact", label: "Contact" },
    { to: "/Faq", label: "Faq" },
    { to: "/Completelijst", label: "Top2000" }
];


export default function NavLinks() {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    return (
        <>
            {navItems.map(item => (
                <li className="nav-item" key={item.to}>
                    <Link
                        to={item.to}
                        className={`nav-link text-white ${
                            location.pathname === item.to ? "fw-bold" : ""
                        }`}
                    >
                        {item.label}
                    </Link>
                </li>
            ))}

            <li className="nav-item ms-auto">
                {isAuthenticated ? (
                    <button
                        onClick={logout}
                        className="nav-link text-white text-decoration-underline fw-bold btn btn-link"
                    >
                        Log out
                    </button>
                ) : (
                    <Link
                        to="/Login"
                        className="nav-link text-white text-decoration-underline fw-bold"
                    >
                        Log in
                    </Link>
                )}
            </li>
        </>
    );
}
