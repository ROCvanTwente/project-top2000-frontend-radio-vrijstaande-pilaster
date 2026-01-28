import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AlleEdities() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://radio-vrijstaande-pilaster.runasp.net/api/stats/alleedities')
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => setSongs(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{ backgroundColor: '#FEF3D4', minHeight: '90vh' }}>
            <div className="container py-5">

                <Link
                    to="/statistieken"
                    className="btn btn-outline-dark position-absolute start-0 ms-5"
                >
                    ← Terug
                </Link>

                <h2 className="fw-bold mb-5 text-center">
                    Nummers die altijd in de TOP2000 hebben gestaan
                </h2>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                {!loading && !error && songs.length === 0 && (
                    <p className="text-center">Geen alleedities songs gevonden.</p>
                )}

                {!loading && !error && songs.length > 0 && (
                    <div className="d-flex flex-column align-items-center gap-4">
                        {songs.map((song, index) => (
                            <div
                                key={index}
                                className="rounded-4 p-4 w-100"
                                style={{ maxWidth: 720, background: "#ede1be" }}
                            >
                                <div className="d-flex align-items-center gap-4">
                                    {song.imgUrl && (
                                        <Link to={`/detaillied/${song.songId}`}>
                                            <img
                                                src={song.imgUrl}
                                                alt={song.title}
                                                style={{
                                                    width: 96,
                                                    height: 96,
                                                    objectFit: 'cover',
                                                    borderRadius: 10
                                                }}
                                            />
                                        </Link>
                                    )}

                                    {/* Info */}
                                    <div className="flex-grow-1">
                                        <Link
                                            to={`/detaillied/${song.songId}`}
                                            style={{ color: 'black' }}
                                        >
                                            <h5 className="fw-bold mb-1">
                                                {song.title} ({song.releaseYear})
                                            </h5>
                                        </Link>

                                        <Link to={`/detailartiest/${song.artistId}`}>
                                            <p className="text-muted mb-0">
                                                {song.artist}
                                            </p>
                                        </Link>

                                        <small className="text-muted">
                                            In elke editie van de TOP2000
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
