import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ZelfdePlek() {
    const [year, setYear] = useState(2024);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const prevYear = year - 1;

    const handleYearChange = (e) => {
        let selectedYear = parseInt(e.target.value);
        if (isNaN(selectedYear)) return;
        if (selectedYear < 2000) selectedYear = 2000;
        if (selectedYear > 2024) selectedYear = 2024;
        setYear(selectedYear);
    };

    useEffect(() => {
        fetch(`https://project-top2000-api.vercel.app/api/stats/dezelfdeplek?year=${year}`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => setSongs(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [year]);

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
                    Liedjes met onveranderde positie in {year}
                </h2>

                {/* Jaar selector */}
                <div className="mb-5 text-center">
                    <label className="fw-semibold">Kies een jaar</label>
                    <input
                        type="number"
                        className="form-control mx-auto mt-2"
                        style={{ maxWidth: 180 }}
                        value={year}
                        onChange={handleYearChange}
                        min="2000"
                        max="2024"
                    />
                    <small className="text-muted d-block mt-1">
                        Liedjes die in {year} exact op dezelfde positie stonden als in {prevYear}.
                    </small>
                </div>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                {!loading && !error && songs.length === 0 && (
                    <p className="text-center">Geen onveranderde posities gevonden voor {year}</p>
                )}

                {!loading && !error && songs.length > 0 && (
                    <div className="d-flex flex-column align-items-center gap-4">
                        {songs.map((song, index) => (
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
                                                {year}
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
                                                {song.title} ({song.releaseYear || '-'})
                                            </h5>
                                        </Link>
                                        <Link to={`/detailpaginaartiest/${song.artistId}`}>
                                            <p className="mb-1">{song.artist}</p>
                                        </Link>

                                        <div className="d-flex gap-3 mt-2 justify-content-center justify-content-md-start">
                                            <div className="text-center">
                                                <small className="text-muted d-block">Vorig jaar</small>
                                                <span className="fw-bold">{prevYear}</span>
                                            </div>
                                            <div className="text-center">
                                                <small className="text-muted d-block">Dit jaar</small>
                                                <span className="fw-bold">{year}</span>
                                            </div>
                                        </div>
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
