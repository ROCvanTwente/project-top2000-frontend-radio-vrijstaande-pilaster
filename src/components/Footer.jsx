import { Link } from "react-router-dom";
import "../../CSS/Footer.css";
import { useAlert } from "./AlertContext";

const Footer = () => {
    const { showAlert } = useAlert();
    return (
        <footer
            style={{
                background: "linear-gradient(253deg, rgb(217, 21, 27) 14%, rgb(34, 40, 46) 100%)",
            }}
        >
            <div
                style={{
                    minHeight: "50vh",
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                    backgroundImage: "url('/footer.svg')",
                    backgroundSize: "cover",
                    padding: "40px 20px",
                }}
            >
                <div className="row justify-content-center text-center">
                    <div className="col-12 col-md-8 d-flex flex-column flex-md-row align-items-center justify-content-center">
                        <img src="/logo.png" alt="Radio Top 2000 Logo" height="50" />
                        <h3 className="mt-3 mt-md-0 ms-md-3">
                            Er is maar één Radio Vrijstaande Pilaster!
                        </h3>
                    </div>
                </div>

                <div className="row mt-5 footer-sections m-3" style={{ fontSize: "1.2em" }}>
                    <div className="col-sm-6 col-md-3 footer-block footer-block-1 text-center text-md-start">
                        <h2>Radio</h2>
                        <Link className="d-block text-white text-decoration-none py-1" to="/Djs">DJ's</Link>
                        <Link className="d-block text-white text-decoration-none py-1" to="/Frequenties">Frequenties</Link>
                    </div>

                    <div className="col-sm-6 col-md-3 footer-block footer-block-2 text-center text-md-start">
                        <h2>Info</h2>
                        <Link className="d-block text-white text-decoration-none py-1" to="/Contact">Contact</Link>
                        <Link className="d-block text-white text-decoration-none py-1" to="/FAQlijst">FAQ</Link>
                    </div>

                    <div className="col-sm-12 col-md-6 footer-block footer-block-3 text-center text-md-start">
                        <h2>Onze Pilaster Nieuwsbrief</h2>
                        <p>Blijf op de hoogte van het laatste Pilaster Nieuws!</p>

                        <form className="mt-3" onSubmit={(e) => {
                            e.preventDefault();
                            showAlert('Nieuwsbrief inschrijving is momenteel niet beschikbaar.', 'warning');
                        }}>
                            <div className="input-group input-group-lg">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Vul hier je e-mailadres in"
                                    required
                                />
                                <button
                                    className="btn"
                                    type="submit"
                                    style={{ backgroundColor: "rgb(217, 21, 27)", color: "white" }}
                                >
                                    &gt;
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer;
