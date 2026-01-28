import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Gezakt() {
    const [year, setYear] = useState(2024);
    const [drops, setDrops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const prevYear = year - 1;

    useEffect(() => {
        fetch(`https://project-top2000-api.vercel.app/api/stats/dalers?year=${year}`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => setDrops(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [year]);

    const handleYearChange = (e) => {
        let selectedYear = parseInt(e.target.value);
        if (isNaN(selectedYear)) return;
        if (selectedYear < 2000) selectedYear = 2000;
        if (selectedYear > 2024) selectedYear = 2024;
        setYear(selectedYear);
    };

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
                    Grootste dalers in {year}
                </h2>

                {/* Jaar select */}
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
                    <small>
                        Vergeleken met {prevYear}
                    </small>
                </div>
               
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-danger text-center">{error}</p>}

                {!loading && !error && drops.length > 0 && (
                    <div className="d-flex flex-column align-items-center gap-4">
                        {drops.map((song, index) => {
                            const prevPosition = song.position - song.delta;
                            const currPosition = song.position;

                            return (
                                <div
                                    key={index}
                                    className="rounded-4 p-3 p-md-4 w-100"
                                    style={{ maxWidth: 720, background: "#ede1be" }}
                                >
                                    <div className="d-flex flex-column flex-md-row align-items-center gap-3 gap-md-4">

                                        <div className="d-flex flex-row align-items-center gap-2 flex-shrink-0">

                                            <div
                                                className="rounded-3 overflow-hidden border text-center"
                                                style={{ width: 72 }}
                                            >
                                                <div className="fw-bold py-2" style={{ background: "white" }}>
                                                    #{currPosition}
                                                </div>
                                                <div className="fw-bold py-2 text-white" style={{ backgroundColor: '#d32f2f' }}>
                                                    -{song.delta}
                                                </div>
                                            </div>

                                            <Link to={`/detailpaginalied/${song.songId}`}>
                                                <img
                                                    src={song.imgUrl}
                                                    alt={song.title}
                                                    className="img-fluid"
                                                    style={{
                                                        width: 96,
                                                        height: 96,
                                                        borderRadius: 10
                                                    }}
                                                />
                                            </Link>
                                        </div>

                                        <div className=" w-100 text-center text-md-start">
                                            <Link
                                                to={`/detailpaginalied/${song.songId}`}
                                                style={{ color: 'black' }}
                                            >
                                                <h5 className="fw-bold mb-1 mt-2 mt-md-0 text-truncate">
                                                    {song.title} ({song.releaseYear})
                                                </h5>
                                            </Link>

                                            <Link to={`/detailpaginaartiest/${song.artistId}`}>
                                                <p>{song.artist}</p>
                                            </Link>

                                            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-end mt-3">
                                                <div className="text-center">
                                                    <small className="text-muted d-block">Vorig jaar</small>
                                                    <span className="fw-bold">{prevPosition}</span>
                                                </div>
                                                <div className="text-center">
                                                    <small className="text-muted d-block">Dit jaar</small>
                                                    <span className="fw-bold">{currPosition}</span>
                                                </div>
                                                <div className="text-center">
                                                    <small className="text-muted d-block">Verschil</small>
                                                    <span className="fw-bold">{song.delta}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
