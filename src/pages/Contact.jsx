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
      borderBottom: "4px solid #c23939"
    },
    redTitle: {
      color: "#000000",
      fontWeight: "900",
      fontSize: "3.5rem",
      textTransform: "uppercase",
      letterSpacing: "3px",
    },
    infoCard: {
      backgroundColor: "#c23939",
      border: "1px solid #333",
      borderRadius: "20px",
      padding: "40px",
      borderTop: "5px solid #c23939"
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
              <p style={styles.data}>📞 0800 - 123 2000</p>

              <span style={styles.label}>WhatsApp</span>
              <p style={styles.data}>📱 +31 6 1234 5678</p>

              <span style={styles.label}>E-mail</span>
              <p style={styles.data}>✉️ radiovercel@gmail.com</p>
            </div>
          </div>

          {/* Locatie & Tijden */}
          <div className="col-md-6">
            <div style={styles.infoCard}>
              <h2 className="mb-4">Bezoekinformatie</h2>
              
              <span style={styles.label}>Locatie</span>
              <p style={styles.data}>📍 Beeld & Geluid, Hilversum</p>

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