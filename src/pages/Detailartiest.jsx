import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { apiFetch } from '../components/ApiWrapper';

const Detailartiest = () => {
    const { isAdmin } = useAuth();
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [showBio, setShowBio] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch(`https://radio-vrijstaande-pilaster.runasp.net/api/artists/${id}`)
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
                    <div className="col-md-4">
                        <img
                            src={artist.photo}
                            alt={artist.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://picsum.photos/640';
                            }}
                            className="img-fluid rounded shadow"
                            width={640}
                        />
                    </div>

                    <div className="col-md-8 d-flex flex-row align-items-baseline justify-content-between">
                        <div>
                            <h1 className="fw-bold">{artist.name}</h1>

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
                        {isAdmin && (
                            <Link to={`/Editartiest/${artist.artistId}`} className="text-decoration-none">
                                <button className="btn btn-outline-dark d-flex align-items-center justify-content-center" style={{ height: '60px', width: '120px', backgroundColor: '#ede1be', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                    <div>
                                        <h2 className="fw-bold m-0">Edit</h2>
                                    </div>
                                </button>
                            </Link>
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

export default Detailartiest;
