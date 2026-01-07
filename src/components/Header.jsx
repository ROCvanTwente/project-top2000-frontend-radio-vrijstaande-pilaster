import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">

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
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/statistieken" className="nav-link">
                Statistieken
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/geschiedenis" className="nav-link">
                Geschiedenis
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>

            <li className="nav-item ms-auto">
              <Link to="/login" className="nav-link">
                Log in
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
