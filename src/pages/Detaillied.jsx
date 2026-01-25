import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);


const Detaillied = () => {
    const { isAdmin } = useAuth();
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLyrics, setShowLyrics] = useState(false);

    const chartData = {
        labels: history.map(h => h.year),
        datasets: [
            {
                label: `Top 2000 history - ${history.length} noteringen`,
                data: history.map(h => h.position),
                borderColor: '#2c2c2c',
                backgroundColor: 'rgba(44,44,44,0.2)',
                tension: 0.1,
                pointRadius: 5,
                pointHoverRadius: 10
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                reverse: true,
                title: {
                    display: true,
                    text: 'Position'
                },
                ticks: {
                    callback: value => Number.isInteger(value) ? `#${value}` : null
                }

            },
            x: {
                title: {
                    display: true,
                    text: 'Year'
                }
            }
        }
    };


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
    }, []);

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
                        <div className="col-md-8 d-flex flex-row align-items-baseline justify-content-between">
                            <div>
                                <h1 className="fw-bold">{song.title} <span className='text-muted'>({song.releaseYear})</span></h1>
                                <Link to={`/detailartiest/${song.artistId}`}><h4 className="text-muted mb-4">{song.artist}</h4></Link>
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
                                                {song.lyrics.trim()}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {isAdmin && (
                                <button className="btn btn-outline-dark d-flex align-items-center justify-content-center" style={{ height: '60px', width: '120px', backgroundColor: '#ede1be', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                    <div>
                                        <h2 className="fw-bold m-0">Edit</h2>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>


                    <div className="mt-5">
                        <h3 className="fw-bold mb-3">
                            
                        </h3>

                        <div
                            style={{
                                height: '400px',
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '10px'
                            }}
                        >
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Detaillied;
