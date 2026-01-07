import React from 'react'
 
const Home = () => {
  return (
    <div
      className="hero d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: 'linear-gradient(295deg, rgb(217, 21, 27) 11%, rgb(156, 27, 33) 100%)'
      }}
    >
      <div className="hero-text text-white text-center"
        style={{
          height: '40vh',
          width: '100vw',
          backgroundImage: `url('/public/header-large.svg')`,
          backgroundPosition: 'center',
          backgroundSize: '110%',
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <h1>TOP 2000</h1>
        <p>
          Ontdek de grootste hits aller tijden! Van klassieke rocknummers tot
          moderne anthems - stem op jouw favoriete nummers en luister mee met
          de Top 2000.
        </p>
      </div>
      </div>
  )
}

export default Home