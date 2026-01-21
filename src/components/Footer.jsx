import { Link } from "react-router-dom";
import "../../CSS/Footer.css"; // make sure to create this file

const Footer = () => {
    return (
        <footer
            style={{
                background: "linear-gradient(253deg, rgb(217, 21, 27) 14%, rgb(34, 40, 46) 100%)",
                marginTop: "auto",
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

                <div
                    className="row mt-5"
                    style={{ fontSize: "1.2em" }}
                >
                    <div className="col-sm-6 col-md-3 border-light ps-md-5 text-center text-md-start border-end border-2">
                        <h2>Radio</h2>
                        <Link className="d-block text-white text-decoration-none py-1" to="/Djs">DJ's</Link>
                        <Link className="d-block text-white text-decoration-none py-1" to="/Frequenties">Frequenties</Link>
                    </div>
                    <div className="col-sm-6 col-md-3 border-light ps-md-5 text-center text-md-start border-end-md">
                        <h2>Info</h2>
                        <Link className="d-block text-white text-decoration-none py-1" to="/Contact">Contact</Link>
                        <Link className="d-block text-white text-decoration-none py-1" to="/FAQlijst">FAQ</Link>
                    </div>

                    <div className="col-sm-12 col-md-6 ps-md-5 m-md-0 mt-sm-5 text-center text-md-start border-light">
                        <h2>Onze Pilaster Nieuwsbrief</h2>
                        <p>Blijf op de hoogte van het laatste Pilaster Nieuws!</p>

                        <form className="mt-3">
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
                                    style={{
                                        backgroundColor: "rgb(217, 21, 27)",
                                        color: "white",
                                    }}
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
