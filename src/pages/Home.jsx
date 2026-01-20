import React, { useEffect } from 'react'
import Carousel from 'bootstrap/js/dist/carousel'

const Home = () => {
  useEffect(() => {
    const el = document.getElementById('top2000Carousel')
    if (!el) return
    const carousel = new Carousel(el, { interval: 3000, ride: true })
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
            data-bs-ride="carousel"
            style={{ maxWidth: '900px' }}
          >
            <div className="carousel-inner rounded">
              <div className="carousel-item active">
                <img
                  src="/achtergrondFoto1.png"
                  className="d-block w-100 img-fluid"
                  alt="foto 1"
                  style={{
                    height: '400px',
                    objectFit: 'cover'
                  }}
                />
                <div className="carousel-caption ">
                  <p>
                    De TOP2000 is niet zomaar een lijst met nummers. Deze lijst is
                    samengesteld door luisterend Nederland.
                  </p>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="/achtergrondFoto2.png"
                  className="d-block w-100 img-fluid"
                  alt="foto 2"
                  style={{
                    height: '400px',
                    objectFit: 'cover'
                  }}
                />
                <div className="carousel-caption">
                  <p>
                    Dit is uw kans om op uw favoriete nummer te stemmen voor een
                    plekje in de TOP2000.
                  </p>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="/achtergrondFoto3.png"
                  className="d-block w-100 img-fluid"
                  alt="foto 3"
                  style={{
                    height: '400px',
                    objectFit: 'cover'
                  }}
                />
                <div className="carousel-caption ">
                  <p>
                    U kunt genieten van de TOP2000 tussen 25 december 00:00 tot
                    31 december 00:00.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#FEF3D4', minHeight: '100vh' }}>
        <div className="container py-5 text-center ">
          <p className="fw-bold fs-4">Hier ziet u de top 5 op dit moment</p>

          <div className="row justify-content-center mt-5">
          <div className="col d-flex justify-content-center">
              <div
                style={{
                  height: '50px', 
                  width: '400px', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  backgroundColor: '#ede1be', 
                  borderRadius: '10px',
                  padding: '10px',
                  fontWeight: 'bold'
                }}
              >
                <div>
                  <a href='https://www.youtube.com/watch?v=kmkpP42vQ9w&list=PLEJx--25kKVy2Q1jUQL8yFOXaL69mGUau' target='test' rel='test' className="text-decoration-none"
                    style={{color: 'black'}}>Klik hier voor de openingsact van Bart Arends </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
