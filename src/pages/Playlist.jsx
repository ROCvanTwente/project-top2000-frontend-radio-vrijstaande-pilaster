import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeartComponent from "../components/HeartComponent";
import { useAlert } from "../components/AlertContext";
import { useAuth } from "../hooks/useAuth";
import { apiFetch } from '../components/ApiWrapper';

const Playlist = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }

        apiFetch("https://radio-vrijstaande-pilaster.runasp.net/api/playlist")
            .then(res => {
                if (!res.ok) throw new Error("Failed to load playlist");
                return res.json();
            })
            .then(data => setSongs(data))
            .catch(err => {
                console.error("Playlist error:", err);
                showAlert(
                    "Er is een fout opgetreden bij het laden van je playlist.",
                    "danger"
                );
            })
            .finally(() => setLoading(false));
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="container py-5 text-center">
                <h2>Je moet ingelogd zijn om je playlist te bekijken</h2>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#FEF3D4", minHeight: "90vh" }}>
            <div className="container py-4 py-md-5">
                <h2 className="fw-bold text-center mb-4 text-decoration-underline">
                    Mijn favorieten
                </h2>

                {loading && <h4 className="text-center">Loading...</h4>}

                {!loading && songs.length === 0 && (
                    <h4 className="text-center">
                        Je hebt nog geen favoriete nummers ❤️
                    </h4>
                )}

                <div className="d-flex flex-column align-items-center">
                    {songs.map(song => (
                        <div
                            key={song.songId}
                            className="mb-4 p-3 border rounded shadow-sm bg-white w-100"
                        >
                            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">

                                <div className="d-flex align-items-center w-100">
                                    <HeartComponent
                                        songId={song.songId}
                                        initialLiked={true}
                                    />

                                    <Link to={`/Detaillied/${song.songId}`}>
                                        <img
                                            src={song.imgUrl}
                                            alt={song.title}
                                            className="img-fluid rounded"
                                            style={{
                                                width: 90,
                                                height: 90,
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Link>

                                    <div className="ms-3">
                                        <Link
                                            to={`/Detaillied/${song.songId}`}
                                            style={{
                                                textDecoration: "underline",
                                                color: "inherit",
                                            }}
                                        >
                                            <h5 className="fw-bold mb-1">
                                                {song.title}{" "}
                                                <span className="text-muted">
                                                    ({song.releaseYear})
                                                </span>
                                            </h5>
                                        </Link>

                                        <Link to={`/detailartiest/${song.artistId}`}>
                                            <p className="text-muted mb-0">
                                                {song.artistName}
                                            </p>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Playlist;
