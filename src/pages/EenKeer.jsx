import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EenKeer() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://localhost:7003/api/stats/eenkeer")
            .then(res => {
                if (!res.ok) throw new Error("Kon one-timers niet laden");
                return res.json();
            })
            .then(data => setSongs(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const sortedSongs = [...songs].sort((a, b) => {
        if (a.artist.localeCompare(b.artist) !== 0) {
            return a.artist.localeCompare(b.artist);
        }
        return a.title.localeCompare(b.title);
    });

    return (
        <div style={{ backgroundColor: '#FEF3D4', minHeight: '90vh', padding: '2rem 0' }}>
            <div className="container">
                <Link
                    to="/statistieken"
                    className="btn btn-outline-dark position-absolute start-0 ms-5"
                >
                    ← Terug
                </Link>
                <h2 className="fw-bold mb-4 text-center">
                    Nummers die slechts één keer in de TOP2000 hebben gestaan
                </h2>

                {loading && <p className="text-center">Bezig met laden...</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                {!loading && !error && sortedSongs.length === 0 && (
                    <p className="text-center">Geen resultaten gevonden.</p>
                )}

                {!loading && !error && sortedSongs.length > 0 && (
                    <div className="d-flex flex-column align-items-center gap-4">
                        {sortedSongs.map((song, index) => (
                            <div
                                key={index}
                                className="rounded-4 shadow-sm p-3 p-md-4 w-100"
                                style={{ maxWidth: 720, background: "#ede1be" }}
                            >
                                <div className="d-flex flex-column flex-md-row align-items-center gap-3 gap-md-4">

                                    <div className="d-flex flex-row align-items-center gap-2 flex-shrink-0">
                                        <div className="rounded-3 overflow-hidden border text-center" style={{ width: 72 }}>
                                            <div className="fw-bold py-2" style={{ background: 'white' }}>
                                                #{song.position}
                                            </div>
                                            <div className="fw-bold py-2 text-white" style={{ backgroundColor: '#1b7f3a' }}>
                                                {song.top2000Year}
                                            </div>
                                        </div>

                                        {song.imgUrl && (
                                            <Link to={`/detailpaginalied/${song.songId}`}>
                                                <img
                                                    src={song.imgUrl}
                                                    alt={song.title}
                                                    style={{
                                                        width: 96,
                                                        height: 96,
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            </Link>
                                        )}
                                    </div>

                                    <div className="w-100 text-center text-md-start mt-2 mt-md-0">
                                        <Link to={`/detailpaginalied/${song.songId}`} style={{ color: 'black' }}>
                                            <h5 className="fw-bold mb-1 text-truncate">
                                                {song.title} ({song.releaseYear ?? '-'})
                                            </h5>
                                        </Link>
                                        <Link to={`/detailpaginaartiest/${song.artistId}`}>
                                            <p className="mb-1">{song.artist}</p>
                                        </Link>

                                        <small className="text-muted d-block mt-2">
                                            Eén keer in de TOP2000
                                        </small>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
