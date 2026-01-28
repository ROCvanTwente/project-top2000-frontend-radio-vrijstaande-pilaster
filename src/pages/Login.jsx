import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../components/AlertContext";

export default function Login() {
    const { showAlert } = useAlert();
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("https://radio-vrijstaande-pilaster.runasp.net/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Inloggen mislukt. Controleer je gegevens.");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("refreshToken", data.refreshToken);
            login(data.token);

            showAlert("Succesvol ingelogd!", "success");
            navigate("/");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Inloggen</h2>
                
                {error && <div className="alert alert-danger"><ul className="mb-0 ps-3"><li>{error}</li></ul></div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Emailadres</label>
                        <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Wachtwoord</label>
                        <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Laden..." : "Inloggen"}
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <p>Nog geen account? <Link to="/registratie">Registreer hier</Link></p>
                </div>
            </div>
        </div>
    );
}
