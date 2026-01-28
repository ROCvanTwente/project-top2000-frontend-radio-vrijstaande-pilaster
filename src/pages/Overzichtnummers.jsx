import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeartComponent from '../components/HeartComponent';

const PAGE_SIZE = 20;

const Overzichtnummers = () => {
    const token = localStorage.getItem('token');
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(() => {
        fetch(`https://radio-vrijstaande-pilaster.runasp.net/api/songs?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setSongs(data);
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
                        <h1>Overzicht Nummers</h1>
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
                <h4 className='text-center mb-3'>Een lijst van alle nummers die in de top2000 hebben gestaan</h4>

                {songs && songs.map(song => (
                    <div
                        key={song.songId}
                        className="mb-4 p-3 border rounded shadow-sm bg-white w-100"
                    >
                        <div className="d-flex flex-column flex-md-row align-items-center align-items-md-center justify-content-between gap-3">
                            <HeartComponent
                                songId={song.songId}
                                initialLiked={song.isLiked}
                            />
                            <div className="d-flex flex-column flex-sm-row align-items-center text-center text-sm-start w-100">

                                <Link to={`/Detaillied/${song.songId}`}>
                                    <img
                                        src={song.imgUrl}
                                        alt={song.title}
                                        className="img-fluid rounded mb-3 mb-sm-0"
                                        style={{
                                            width: 90,
                                            height: 90,
                                            objectFit: 'cover'
                                        }}
                                    />
                                </Link>

                                <div className="ms-sm-3">
                                    <Link
                                        to={`/Detaillied/${song.songId}`}
                                        style={{ textDecoration: 'underline', color: 'inherit' }}
                                    >
                                        <h5 className="fw-bold mb-1">
                                            {song.title}{' '}
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

                            <h3 className="text-muted text-center text-md-end mb-0">
                                {song.noteringen} Noteringen
                            </h3>
                        </div>
                    </div>
                ))}

                {!songs.length && (
                    <h1 className="text-center">Loading...</h1>
                )}

            </div>
        </div>
    );
};

export default Overzichtnummers;
