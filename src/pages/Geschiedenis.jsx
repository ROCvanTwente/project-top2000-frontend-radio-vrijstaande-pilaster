import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';

const Top2000Pagina = () => {
  // Stijl voor de volledige achtergrond van de pagina
  const pageStyle = {
    backgroundColor: '#F5EED3', 
    minHeight: '100vh',        
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    margin: 0,
    fontFamily: 'sans-serif'
  };

  // Stijl voor het rode tekstblok
  const cardStyle = {
    backgroundColor: '#8B1A24',
    color: 'white',
    padding: '60px 50px',
    maxWidth: '900px',
    lineHeight: '1.6',
    fontSize: '18px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
  };

  const paragraphStyle = {
    marginBottom: '24px',
    textAlign: 'center'
  };

return (
    <div style={pageStyle}>
        <div style={cardStyle}>
            <h1 style={paragraphStyle}>Geschiedenis van de Top 2000</h1>
            <p style={paragraphStyle}>
                De Top 2000 is uitgegroeid tot een van de meest geliefde muzikale tradities van 
                Nederland. Het radioprogramma werd voor het eerst uitgezonden in 1999 door NPO 
                Radio 2 (toen nog Radio 2), als een eenmalige gebeurtenis ter viering van de 
                millenniumwisseling. Het idee was simpel maar krachtig: luisteraars mochten 
                stemmen op hun favoriete liedjes, en de 2000 meest populaire nummers zouden 
                tussen Kerst en Oudjaar worden gedraaid. Het concept sloeg echter zó goed aan 
                dat het direct werd omarmd door een groot publiek.
            </p>

            <p style={paragraphStyle}>
                Al snel ontstond de bijzondere sfeer die de Top 2000 zou gaan kenmerken: een mix 
                van nostalgie, muzikale diversiteit en nationale gezelligheid. De lijst groeide uit tot 
                een heus eindejaarsfenomeen, waarbij gezinnen, cafés en werkplekken gezamenlijk 
                afstemden op Radio 2. Klassiekers als Bohemian Rhapsody van Queen, Hotel 
                California van Eagles en Stairway to Heaven van Led Zeppelin bleken blijvende 
                publieksfavorieten, al zag de lijst in de loop der jaren ook verrassende nieuwkomers.
            </p>

            <p style={paragraphStyle}>
                In de jaren daarna breidde de Top 2000 zich verder uit, met onder andere het Top 
                2000 Café in Beeld en Geluid in Hilversum, waar publiek de uitzending live kon 
                bijwonen. Ook televisieprogramma's, documentaires, optredens en specials 
                maakten de Top 2000 tot een multimediale beleving.
            </p>

            <p style={{ ...paragraphStyle, marginBottom: 0 }}>
                Vandaag de dag is de Top 2000 een vast onderdeel van de Nederlandse cultuur. Het 
                is niet alleen een muziekmarathon van zeven dagen, maar ook een jaarlijks ritueel 
                waarin herinneringen, verhalen en emoties samenkomen. Van jong tot oud: heel 
                Nederland luistert mee.
            </p>
        </div>
    </div>
);
};

export default Top2000Pagina;