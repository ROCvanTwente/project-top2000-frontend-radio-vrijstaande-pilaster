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
            <div className="container py-5 text-center">
                <p className="fw-bold fs-4 text-decoration-underline">
                    Dit is de Top2000 van {songs.length > 0 ? songs[0].year : year}
                </p>
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
                    <span onClick={toggleNameSort} style={{cursor: 'pointer'}} className='p-1 fw-bold text-decoration-underline'>{nameSortAsc !== "DESC" ? "Naam A-Z ↑" : "Naam Z-A ↓"}</span>
                </div>
                <div className="d-flex flex-column align-items-center mt-4">
                    {songs.length > 0 && songs.map(song => (
                        <div
                            key={song.position}
                            style={{
                                backgroundColor: '#ede1be',
                                borderRadius: '10px',
                                padding: '12px',
                                fontWeight: 'bold',
                                width: '100%',
                                maxWidth: '500px',
                                marginBottom: '10px',
                            }}
                        >
                            {song.position}. <Link to={`/detailpaginalied/${song.songId}`} style={{ color: "inherit" }}>
                            {song.title}
                            </Link> - <Link to={`/detailpaginaartiest/${song.artistId}`} style={{ color: "inherit" }}>
                            {song.artist}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompleteLijst;
