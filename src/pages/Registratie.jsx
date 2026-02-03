import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../components/AlertContext";

export default function Registratie() {
    const { showAlert } = useAlert();
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        setLoading(true);

        try {
            const payload = {
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            };

            const response = await fetch("https://radio-vrijstaande-pilaster.runasp.net/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessages = [];

                if (Array.isArray(data?.errors)) {
                    errorMessages.push(...data.errors);
                } else if (data?.errors && typeof data.errors === "object") {
                    Object.values(data.errors).forEach(errArray => {
                        if (Array.isArray(errArray)) {
                            errorMessages.push(...errArray);
                        }
                    });
                } else if (data?.errors && typeof data.errors === "string") {
                    errorMessages.push(data.errors);
                }

                if (errorMessages.length === 0) {
                    errorMessages.push("Registratie mislukt.");
                }

                setErrors(errorMessages);
                return;
            }

            login(data.token, data.refreshToken);
            showAlert("Succesvol geregistreerd en ingelogd!", "success");
            navigate("/");

        } catch {
            setErrors(["Er is een netwerkfout opgetreden."]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Registreren</h2>

                {errors.length > 0 && (
                    <div className="alert alert-danger">
                        <ul className="mb-0 ps-3">
                            {errors.map((err, index) => (
                                <li key={index}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Emailadres</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Wachtwoord</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Bevestig Wachtwoord</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100" disabled={loading}>
                        {loading ? "Bezig met registreren..." : "Registreren"}
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <p>Heb je al een account? <Link to="/login">Log hier in</Link></p>
                </div>
            </div>
        </div>
    );
}