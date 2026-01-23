import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detailpaginalied = () => {
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLyrics, setShowLyrics] = useState(false);

    useEffect(() => {
        fetch(`https://localhost:7003/api/songs/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setSong(data[0]);      // basic song info
                    setHistory(data);      // year / position list
                }
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

    if (!song) {
        return <div className="container mt-5">Song not found</div>;
    }

    return (
        <>
            <div style={{ backgroundColor: 'rgb(254, 243, 212)', margin: '0', padding: '0', minHeight: '90vh' }}>
                <div className="container py-5">
                    <div className="row g-4">
                        {/* Cover image */}
                        <div className="col-md-4 ">
                            <img
                                src={song.imgUrl}
                                alt={song.title}
                                className="img-fluid rounded shadow"
                            />
                        </div>

                        {/* Song info */}
                        <div className="col-md-8">
                            <h1 className="fw-bold">{song.title}</h1>
                            <h4 className="text-muted mb-4">{song.artist}</h4>

                            {/* Lyrics */}
                            {song.lyrics && (
                                <div className="mt-4">
                                    <button
                                        className="btn btn-outline-dark mb-3"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#lyricsCollapse"
                                        aria-expanded={showLyrics}
                                        aria-controls="lyricsCollapse"
                                        onClick={() => setShowLyrics(prev => !prev)}
                                    >
                                        {showLyrics ? 'Hide lyrics' : 'Show lyrics'}
                                    </button>
                                    
                                    <div className="collapse" id="lyricsCollapse">
                                        <h5 className="fw-bold">Lyrics</h5>
                                        <div
                                            className="p-3 border rounded bg-light"
                                            style={{ whiteSpace: 'pre-line' }}
                                        >
                                            {song.lyrics}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chart history */}
                    <div className="mt-5">
                        <h3 className="fw-bold mb-3">Top 2000 history</h3>

                        <table className="table table-striped table-hover" style={{borderCollapse: 'separate', borderSpacing: '0', borderRadius: '10px', overflow: 'hidden'}}>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Position</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.year}</td>
                                        <td>#{entry.position}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detailpaginalied;
