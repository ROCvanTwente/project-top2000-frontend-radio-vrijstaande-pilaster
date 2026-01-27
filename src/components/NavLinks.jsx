import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAlert } from "./AlertContext";

const navItems = [
    { to: "/", label: "Home" },
    { to: "/Statistieken", label: "Statistieken" },
    { to: "/Geschiedenis", label: "Geschiedenis" },
    { to: "/Contact", label: "Contact" },
    { to: "/Faq", label: "Faq" },
    { to: "/Completelijst", label: "Top2000" }
];

export default function NavLinks() {
    const { showAlert } = useAlert();
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();
    const { isAdmin } = useAuth();

    return (
        <>
            {navItems.map(item => (
                <li className="nav-item" key={item.to}>
                    <Link
                        to={item.to}
                        className={`nav-link text-white ${location.pathname === item.to ? "fw-bold" : ""}`}
                    >
                        {item.label}
                    </Link>
                </li>
            ))}

            <div className="nav-link dropdown text-white m-0">
                <span className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Overzicht
                </span>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/Overzichtartiest">Artiest</Link></li>
                    <li><Link className="dropdown-item" to="/Overzichtnummers">Nummers</Link></li>
                </ul>
            </div>
            <li className="nav-item ms-auto d-flex">
                {isAdmin && (
                    <Link to="/Editroles" className="nav-link text-white text-decoration-underline fw-bold">
                        Edit Roles
                    </Link>
                )}
                {isAuthenticated ? (
                    <button
                        onClick={() => {
                            showAlert("Succesvol uitgelogd!", "success");
                            logout();
                        }}
                        className="nav-link text-white text-decoration-underline fw-bold btn btn-link"
                    >
                        Log out
                    </button>
                ) : (
                    <Link to="/Login" className="nav-link text-white text-decoration-underline fw-bold">
                        Log in
                    </Link>
                )}
            </li>
        </>
    );
}
