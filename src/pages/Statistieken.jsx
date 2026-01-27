import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const statsCards = [
    { title: "Grootste dalers", link: "/Gezakt", img: "/dalers.png" },
    { title: "Grootste stijgers", link: "/Gestegen", img: "/stijgers.png" },
    { title: "Alle edities", link: "/AlleEdities", img: "/alleedities.png" },
    { title: "Nieuw binnen", link: "/NieuwKomers", img: "/Nieuwkomer.png" },
    { title: "Verdwenen", link: "/Verdwenen", img: "/Verdwenen.png" },
    { title: "Opnieuw binnen", link: "/OpnieuwBinnen", img: "/Opniew.png" },
    { title: "Dezelfde plek", link: "/ZelfdePlek", img: "/zelfdeplek.png" },
    { title: "Achter elkaar", link: "/AchterElkaar", img: "/achterelkaar.png" },
    { title: "1 jaartje", link: "/EenKeer", img: "/eenjaar.png" },
    { title: "Onze toppers", link: "/TopArtiesten", img: "/toppers.png" },
];

export default function Statistieken() {
    return (
        <div style={{ backgroundColor: '#FEF3D4', minHeight: '100vh', padding: '2rem 0' }}>
            <div className="container">
                <h1 className="mb-4 text-center">Statistieken Dashboard</h1>
                <div className="row g-4">
                    {statsCards.map((card, index) => (
                        <div className="col-12 col-md-6" key={index}>
                            <Link to={card.link} className="text-decoration-none">
                                <div
                                    className="card h-100"
                                >
                                    {card.img && (
                                        <img
                                            src={card.img}
                                            alt={card.title}
                                            style={{
                                                height: 400, 
                                            }}
                                        />
                                    )}
                                    <div className="card-body justify-content-center align-items-center">
                                        <h5 className="card-title text-center">{card.title}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

