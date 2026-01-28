import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PAGE_SIZE = 20;

const Overzichtartiest = () => {
    const [artists, setArtists] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(() => {
        fetch(`https://project-top2000-api.vercel.app/api/artists?page=${page}`)
            .then(res => res.json())
            .then(data => {
                setArtists(data);
                setHasNextPage(data.length === PAGE_SIZE);
            })
            .catch(err => {
                console.error('API error:', err);
            });
    }, [page]);

    return (
        <div style={{ backgroundColor: '#FEF3D4', minHeight: '90vh' }}>
            <div className="container py-5">

                <div className="row mb-4 text-center align-items-center">
                    <div className="col-md-4" />
                    <div className="col-md-4 text-nowrap">
                        <h1>Overzicht Artiesten</h1>
                    </div>

                    <div className="col-md-4">
                        <div className="d-flex justify-content-center gap-2">
                            <button
                                className="btn btn-outline-secondary"
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                            >
                                -
                            </button>

                            <span className="align-self-center">
                                Pagina {page}
                            </span>

                            <button
                                className="btn btn-outline-secondary"
                                disabled={!hasNextPage}
                                onClick={() => setPage(p => p + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <h4 className='text-center mb-5'>Een lijst met alle artiesten die in de top2000 hebben gestaan</h4>
                <div className="row">
                    {artists.map(artist => (
                        <div key={artist.artistId} className="col-md-3 d-flex">
                            <div className="card m-3 d-flex" style={{ width: '18rem' }}>
                                <Link
                                    to={`/Detailartiest/${artist.artistId}`}
                                    style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <img src={artist.photo} className="card-img-top" alt={artist.name} style={{height: '250px', objectFit: 'cover'}} />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h2 className="card-text text-muted">{artist.name}</h2>
                                        <h5 className="card-text text-end">{artist.noteringen} Noteringen</h5>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Overzichtartiest;
