import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Detailpaginaartiest = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [showBio, setShowBio] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://localhost:7003/api/artists/${id}`)
            .then(res => res.json())
            .then(data => {
                setArtist(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('API error:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="container mt-5">Loading…</div>;
    }

    if (!artist) {
        return <div className="container mt-5">Artist not found</div>;
    }

    return (
        <div style={{ backgroundColor: 'rgb(254, 243, 212)', minHeight: '90vh' }}>
            <div className="container py-5">
                <div className="row g-4">
                    {/* Artist photo */}
                    <div className="col-md-4">
                        <img
                            src={artist.photo}
                            alt={artist.name}
                            className="img-fluid rounded shadow"
                        />
                    </div>

                    {/* Artist info */}
                    <div className="col-md-8">
                        <h1 className="fw-bold">{artist.name}</h1>

                        {/* Wiki link */}
                        {artist.wiki && (
                            <p>
                                <a
                                    href={artist.wiki}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                >
                                    Wikipedia page
                                </a>
                            </p>
                        )}
                    </div>
                    <div>
                        {artist.biography && artist.biography}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detailpaginaartiest;
