import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from "react";

const Contact = () => {
  const styles = {
    page: {
      backgroundColor: "#FEF3D4",
      color: "white",
      minHeight: "100vh",
      paddingBottom: "80px",
      fontFamily: "sans-serif"
    },
    hero: {
      padding: "100px 20px",
      textAlign: "center",
      borderBottom: "4px solid #8B1A24"
    },
    redTitle: {
      color: "#000000",
      fontWeight: "900",
      fontSize: "3.5rem",
      textTransform: "uppercase",
      letterSpacing: "3px",
    },
    infoCard: {
      backgroundColor: "#8B1A24",
      border: "1px solid #333",
      borderRadius: "20px",
      padding: "40px",
      borderTop: "5px solid #8B1A24"
    },

    data: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      marginBottom: "20px"
    },
  };

  return (
    <div style={styles.page}>
      {/* Hero Sectie */}
      <div style={styles.hero}>
        <h1 style={styles.redTitle}>Contact & Info</h1>      
        </div>

      <div className="container mt-5">
        <div className="row g-4">
          
          {/* Studio Contactgegevens */}
          <div className="col-md-6">
            <div style={styles.infoCard}>
              <h2 className="mb-4">Direct contact</h2>
              
              <span style={styles.label}>Telefoon Studio</span>
              <p style={styles.data}>📞 <a href="tel:+31800-1232000" style={{color: "white", textDecoration: "underline"}}>0800 - 123 2000</a></p>

              <span style={styles.label}>WhatsApp</span>
              <p style={styles.data}>📱 <a href="tel:+31612345678" style={{color: "white", textDecoration: "underline"}}>+31 6 1234 5678</a></p>

              <span style={styles.label}>E-mail</span>
              <p style={styles.data}>✉️ <a href="mailto:radiovercel@gmail.com" style={{color: "white", textDecoration: "underline"}}>radiovercel@gmail.com</a></p>
            </div>
          </div>

          {/* Locatie & Tijden */}
          <div className="col-md-6">
            <div style={styles.infoCard}>
              <h2 className="mb-4">Bezoekinformatie</h2>
              
              <span style={styles.label}>Locatie</span>
              <p style={styles.data}>📍 <a href="https://www.google.com/maps/place/Nederlands+Instituut+voor+Beeld+%26+Geluid/@52.2354623,5.170482,508m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47c66b5af17f1a73:0xd62b509149ca15ac!8m2!3d52.235459!4d5.1730569!16s%2Fm%2F03mbsnq?entry=ttu&g_ep=EgoyMDI2MDEyNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{color: "white", textDecoration: "underline"}}>Beeld & Geluid, Hilversum</a></p>

              <span style={styles.label}>Uitzendperiode</span>
              <p style={styles.data}>🗓️ 25 t/m 31 december</p>

              <span style={styles.label}>Toegang</span>
              <p style={styles.data}>🎟️ Tickets via de officiële website</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;