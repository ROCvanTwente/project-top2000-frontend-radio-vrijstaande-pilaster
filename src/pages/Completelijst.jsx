import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const CompleteLijst = () => {
    const [year, setYear] = useState("2024");
    const [songs, setSongs] = useState([]);
    const [nameSortAsc, setNameSortAsc] = useState();

    // Function to fetch songs for a given year
    const fetchSongs = (year, order) => {
        fetch(`https://localhost:7003/api/songs/fulllist?year=${year}${order ? `&order=${order}` : ''}`)
            .then(res => res.json())
            .then(data => setSongs(data))
            .catch(err => console.error('API error:', err));
    };

    // Fetch initial songs for default year
    useEffect(() => {
        fetchSongs(year);
    }, []);

    // Handle form submission
    const handleSubmit = (e, order = null) => {
        e.preventDefault(); // prevent page reload
        fetchSongs(year, order);
    };

    const toggleNameSort = (e) => {
        const newSortOrder = nameSortAsc === "ASC" ? 'DESC' : 'ASC';
        setNameSortAsc(newSortOrder);
        handleSubmit(e, newSortOrder);
    };

    return (
        <div style={{ backgroundColor: '#FEF3D4', minHeight: '90vh' }}>
            <div className="container py-5">
                <div className='d-flex flex-column justify-content-center align-items-center mb-4 gap-3'>
                    <h1 className="text-decoration-underline">
                        Dit is de Top2000 van {songs.length > 0 ? songs[0].year : year}
                    </h1>
                    <div className="d-flex flex-row align-items-center justify-content-center gap-3">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group input-group-lg">
                                <input
                                    type="number"
                                    placeholder="2024"
                                    min={1999}
                                    max={2024}
                                    step={1}
                                    className="form-control"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                />
                                <button
                                    className="btn"
                                    type="submit"
                                    style={{
                                        backgroundColor: "rgb(217, 21, 27)",
                                        color: "white",
                                    }}
                                >
                                    &gt;
                                </button>
                            </div>
                        </form>
                        <span onClick={toggleNameSort} style={{ cursor: 'pointer' }} className='p-1 fw-bold text-decoration-underline'>{nameSortAsc !== "DESC" ? "Naam A-Z ↑" : "Naam Z-A ↓"}</span>
                    </div>
                </div>
                {songs && songs.map(song => (
                                            <div
                                                key={song.songId}
                                                className="mb-4 p-3 border rounded shadow-sm bg-white w-100"
                                            >
                                                <div className="d-flex flex-column flex-md-row align-items-center align-items-md-center justify-content-between gap-3">
                
                                                    <div className="d-flex flex-column flex-sm-row align-items-center text-center text-sm-start w-100">
                
                                                        <div
                                                            className="d-flex flex-column align-items-center me-sm-3 mb-3 mb-sm-0 rounded border border-2 shadow"
                                                            style={{ width: 70, height: 70 }}
                                                        >
                                                            <div className="d-flex justify-content-center align-items-center h-50 w-100 fw-bold rounded-top">
                                                                {song.position}
                                                            </div>
                                                            <div
                                                                className="d-flex justify-content-center align-items-center h-50 w-100 fw-bold rounded-bottom"
                                                                style={{
                                                                    backgroundColor:
                                                                        Number(song.positionDifference) < 0 ? 'red' : Number(song.positionDifference) > 0 ? 'green' : 'grey'
                                                                    }}
                                                            >
                                                                {Number(song.positionDifference) > 0 && '+'} {song.positionDifference}
                                                            </div>
                                                        </div>
                
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

export default CompleteLijst;
