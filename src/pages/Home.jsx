import React, { useEffect, useState } from 'react'
import Carousel from 'bootstrap/js/dist/carousel'
import { Link } from 'react-router-dom'
import HeartComponent from '../components/HeartComponent'

const Home = () => {
    const token = localStorage.getItem('token');
    const carouselItems = [
        {
            image: '/achtergrondFoto1.png',
            caption:
                'De TOP2000 is niet zomaar een lijst met nummers. Deze lijst is samengesteld door luisterend Nederland.',
        },
        {
            image: '/achtergrondFoto2.png',
            caption:
                'Dit is uw kans om op uw favoriete nummer te stemmen voor een plekje in de TOP2000.',
        },
        {
            image: '/achtergrondFoto3.png',
            caption:
                'U kunt genieten van de TOP2000 tussen 25 december 00:00 tot 31 december 00:00.',
        },
    ]

    const [songs, setSongs] = useState([])

    useEffect(() => {
        fetch('https://localhost:7003/api/songs/top5',
        { headers: { "Authorization": `Bearer ${token}` } }
        )
            .then(res => res.json())
            .then(data => setSongs(data))
            .catch(err => {
                console.error('API error:', err);
                showAlert("Er is een fout opgetreden bij het laden van de top 5 nummers.", "danger");
            });
    }, [])
    useEffect(() => {
        const el = document.getElementById('top2000Carousel')
        if (!el) return
        const carousel = new Carousel(el, { interval: 3000, ride: "carousel" })
        return () => carousel.dispose()
    }, [])
    return (
        <>
            <div
                className="hero d-flex justify-content-center align-items-center"
                style={{
                    backgroundImage:
                        'linear-gradient(295deg, rgb(217, 21, 27) 11%, rgb(156, 27, 33) 100%)',
                }}
            >
                <div
                    className="hero-text text-white d-flex flex-column align-items-center justify-content-center text-center w-100"
                    style={{
                        minHeight: '47vh',
                        backgroundImage: `url('/header-large.svg')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        padding: '20px',
                    }}
                >
                    <h1 className="mt-5 display-4 fw-bold">TOP 2000</h1>

                    <p className="col-12 col-md-8 col-lg-6">
                        Ontdek de grootste hits aller tijden! Van klassieke rocknummers tot
                        moderne anthems - stem op jouw favoriete nummers en luister mee met
                        de Top 2000.
                    </p>

                    <div
                        id="top2000Carousel"
                        className="carousel slide mt-4 w-100"
                        style={{ maxWidth: '900px' }}
                    >
                        <div className="carousel-inner rounded">
                            {carouselItems.map((item, index) => (
                                <div
                                    key={item.image}
                                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                >
                                    <img
                                        src={item.image}
                                        className="d-block w-100 img-fluid"
                                        alt={`slide ${index + 1}`}
                                        style={{ height: '400px', objectFit: 'cover' }}
                                    />
                                    <div className="carousel-caption">
                                        <p>{item.caption}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: '#FEF3D4', minHeight: '90vh' }}>
                <div className="container py-4 py-md-5 text-center">
                    <p className="fw-bold fs-5 fs-md-4 text-decoration-underline">
                        Hier ziet u de top 5 op dit moment
                    </p>

                    <div className="d-flex flex-column align-items-center mt-4">
                        {songs && songs.map(song => (
                            <div
                                key={song.songId}
                                className="mb-4 p-3 border rounded shadow-sm bg-white w-100"
                            >
                                <div className="d-flex flex-column flex-md-row align-items-center align-items-md-center justify-content-between gap-3">

                                    <div className="d-flex flex-column flex-sm-row align-items-center text-center text-sm-start w-100">
                                        <HeartComponent
                                            songId={song.songId}
                                            initialLiked={song.isLiked}
                                        />
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

                    <div className="d-flex flex-column align-items-center mt-4">
                        <a
                            href="https://www.youtube.com/watch?v=kmkpP42vQ9w&list=PLEJx--25kKVy2Q1jUQL8yFOXaL69mGUau"
                            className="w-100 text-decoration-none"
                            style={{ maxWidth: 500 }}
                        >
                            <div
                                className="text-center"
                                style={{
                                    backgroundColor: '#DA161A',
                                    color: '#FEF3D4',
                                    borderRadius: '10px',
                                    padding: '14px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Klik hier voor de openingsact van Bart Arends
                            </div>
                        </a>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home
