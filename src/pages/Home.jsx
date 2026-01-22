import React, { useEffect, useState } from 'react'
import Carousel from 'bootstrap/js/dist/carousel'

const Home = () => {
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
        fetch('https://localhost:7003/api/songs/top5')
            .then(res => res.json())
            .then(data => setSongs(data))
            .catch(err => console.error('API error:', err))
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
                    <h1 className="mt-3 display-4 fw-bold">TOP 2000</h1>

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
                <div className="container py-5 text-center">
                    <p className="fw-bold fs-4 text-decoration-underline">Hier ziet u de top 5 op dit moment</p>

                    <div className="d-flex flex-column align-items-center mt-4">
                        {songs.map(song => (
                            <div
                                key={song.position}
                                style={{
                                    backgroundColor: '#ede1be',
                                    borderRadius: '10px',
                                    padding: '12px',
                                    fontWeight: 'bold',
                                    width: '100%',
                                    maxWidth: '500px',
                                    marginBottom: '10px'
                                }}
                            >
                                {song.position}. {song.title} - {song.artist}
                            </div>
                        ))}
                    </div>
                    <div className="d-flex flex-column align-items-center mt-4">
                        <a
                            href="https://www.youtube.com/watch?v=kmkpP42vQ9w&list=PLEJx--25kKVy2Q1jUQL8yFOXaL69mGUau"
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                textDecoration: 'none'
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: '#DA161A',
                                    color: "#FEF3D4",
                                    borderRadius: '10px',
                                    padding: '12px',
                                    fontWeight: 'bold',
                                    marginTop: '16px',
                                    maxWidth: "500px",
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
