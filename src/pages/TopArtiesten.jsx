import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TopArtiesten() {
    const [year, setYear] = useState(2024);
    const [limit, setLimit] = useState(3);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://radio-vrijstaande-pilaster.runasp.net/api/stats/topartiesten?year=${year}&take=${limit}`)
            .then(res => {
                if (!res.ok) throw new Error("Kon topartiesten niet laden");
                return res.json();
            })
            .then(data => setArtists(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [year, limit]);

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
                    Top {limit} artiesten met de meeste nummers in {year}
                </h2>

                <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
                    <div>
                        <label className="fw-semibold">Jaar</label>
                        <input
                            type="number"
                            className="form-control"
                            value={year}
                            min="1999"
                            max="2024"
                            onChange={e => setYear(Number(e.target.value))}
                            style={{ maxWidth: 120 }}
                        />
                    </div>
                    <div>
                        <label className="fw-semibold">Aantal artiesten</label>
                        <input
                            type="number"
                            className="form-control"
                            value={limit}
                            min="1"
                            onChange={e => setLimit(Number(e.target.value) || 3)}
                            style={{ maxWidth: 120 }}
                        />
                    </div>
                </div>

                {loading && <p className="text-center">Bezig met laden...</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                {!loading && !error && artists.length === 0 && (
                    <p className="text-center">Geen resultaten gevonden.</p>
                )}

                {!loading && !error && artists.length > 0 && (
                    <div className="d-flex flex-column align-items-center gap-4">
                        {artists.map((artist, index) => (
                            <div
                                key={index}
                                className="rounded-4 shadow-sm p-4 w-100"
                                style={{
                                    maxWidth: 720,
                                    background: "#ede1be",
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 20,
                                }}
                            >
                                {artist.imgUrl && (
                                    <Link to={`/detailpaginalied/${artist.songId}`}>
                                        <img
                                            src={artist.imgUrl}
                                            alt={artist.artist}
                                            style={{
                                                width: 96,
                                                height: 96,
                                                borderRadius: 10,
                                            }}
                                        />
                                    </Link>
                                )}


                                <div className="flex-grow-1">
                                    <Link to={`/detailpaginaartiest/${artist.artistId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <h5 className="fw-bold mb-2">{artist.artist}</h5>
                                    </Link>
                                    <p className="mb-1">Aantal liedjes: {artist.songCount}</p>
                                    <p className="mb-1">Gemiddelde positie: {artist.averagePosition?.toFixed(0)}</p>
                                    <p className="mb-0">Hoogste notering: {artist.bestPosition}</p>

                                    <small className="text-muted d-block mt-2">
                                        Jaar: {year}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
