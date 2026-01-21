import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from "react";

const Contact = () => {
  const styles = {
    page: {
      backgroundColor: "#0a0a0a",
      color: "white",
      minHeight: "100vh",
      paddingBottom: "80px",
      fontFamily: "sans-serif"
    },
    hero: {
      padding: "100px 20px",
      textAlign: "center",
      background: "linear-gradient(to bottom, #8b0000 0%, #0a0a0a 100%)",
      borderBottom: "4px solid #e30613"
    },
    redTitle: {
      color: "#ffffff",
      fontWeight: "900",
      fontSize: "3.5rem",
      textTransform: "uppercase",
      letterSpacing: "3px",
    },
    infoCard: {
      backgroundColor: "#1a1a1a",
      border: "1px solid #333",
      borderRadius: "20px",
      padding: "40px",
      height: "100%",
      transition: "transform 0.3s ease",
      borderTop: "5px solid #e30613"
    },
    label: {
      color: "#e30613",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: "0.9rem",
      marginBottom: "5px",
      display: "block"
    },
    data: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      marginBottom: "20px"
    },
    socialButton: {
      display: "inline-block",
      padding: "10px 20px",
      marginRight: "10px",
      backgroundColor: "#e30613",
      color: "white",
      textDecoration: "none",
      borderRadius: "5px",
      fontWeight: "bold"
    }
  };

  return (
    <div style={styles.page}>
      {/* Hero Sectie */}
      <div style={styles.hero}>
        <h1 style={styles.redTitle}>Contact & Info</h1>
        <p className="lead text-light opacity-75">Alles wat je moet weten om de Top 2000 studio te bereiken.</p>
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