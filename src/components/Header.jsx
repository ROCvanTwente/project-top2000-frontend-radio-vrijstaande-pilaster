import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Header() {
    const location = useLocation();

    let navStyle = {};
    let heroStyle = {};

    if (location.pathname != "/") {
        navStyle = {
            background: "linear-gradient(295deg, rgb(217, 21, 27) 11%, rgb(156, 27, 33) 100%)",
            margin: "0",
            padding: "0"
        };

        heroStyle = {
            backgroundImage: "url('/header-small.svg')",
            height: "100%",
            padding: "10px 20px"
        };
    } else {
        navStyle = {
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            minWidth: "320px",
            padding: "0px"
        };

        heroStyle = {
            padding: "10px 20px",
            height: "100%"
        };
    }
    return (
        <nav className="navbar navbar-expand-lg" style={navStyle}>
            <div className="container-fluid" style={heroStyle}>

                <a className="navbar-brand" href="/">
                    <img
                        src="/logo.png"
                        alt="Radio Top 2000 Logo"
                        style={{ maxWidth: "120px", height: "40px" }}
                        className="d-inline-block align-text-top"
                    />
                </a>

                {/* Toggle button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible section */}
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav mb-2 mb-lg-0 w-100 justify-content-between">
                        <li className="nav-item te">
                            <Link to="/" className="nav-link text-white">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/statistieken" className="nav-link text-white">
                                Statistieken
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/geschiedenis" className="nav-link text-white">
                                Geschiedenis
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/contact" className="nav-link text-white">
                                Contact
                            </Link>
                        </li>

                        <li className="nav-item ms-auto" style={{ color: "white!important" }}>
                            <Link to="/login" className="nav-link text-white text-decoration-underline fw-bold">
                                Log in
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}

