import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NieuweBinnenkomers() {
    const [year, setYear] = useState(2024);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleYearChange = (e) => {
        let selectedYear = parseInt(e.target.value);
        if (isNaN(selectedYear)) return;
        if (selectedYear < 2000) selectedYear = 2000;
        if (selectedYear > 2024) selectedYear = 2024;
        setYear(selectedYear);
    };

    useEffect(() => {
        fetch(`https://radio-vrijstaande-pilaster.runasp.net/api/stats/nieuw?year=${year}`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => setSongs(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [year]);

    return (
        <div style={{ backgroundColor: '#FEF3D4', minHeight: '90vh' }}>
            <div className="container py-5">

                <Link
                    to="/statistieken"
                    className="btn btn-outline-dark position-absolute start-0 ms-5"
                >
                    ← Terug
                </Link>


                <h2 className="fw-bold mb-4 text-center">
                    Nieuwe binnenkomers in {year}
                </h2>

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
                        Hoogste binnenkomers eerst
                    </small>
                </div>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                {!loading && !error && songs.length === 0 && (
                    <p className="text-center">
                        Geen nieuwe binnenkomers gevonden voor {year}
                    </p>
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
                                        <div
                                            className="rounded-3 border text-center fw-bold"
                                            style={{ width: 72, background: 'white', padding: '12px ' }}
                                        >
                                            #{song.position}
                                        </div>
                                        {song.imgUrl && (
                                            <Link to={`/detaillied/${song.songId}`}>
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

                                    <div className="w-100 text-center text-md-start">
                                        <Link to={`/detaillied/${song.songId}`} style={{ color: 'black' }}>
                                            <h5 className="fw-bold mb-1 mt-2 ">
                                                {song.title}
                                            </h5>
                                        </Link>
                                        <Link to={`/detailartiest/${song.artistId}`}>
                                            <p>{song.artist}</p>
                                        </Link>
                                        <small className="text-muted d-block">
                                            Uitgiftejaar: {song.releaseYear}
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
