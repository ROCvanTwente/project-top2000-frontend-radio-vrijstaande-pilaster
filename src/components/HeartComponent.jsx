import { useState, useEffect } from "react";
import { useAlert } from "./AlertContext";
import { useAuth } from '../hooks/useAuth';
import '../../CSS/HeartComponent.css';
import apiFetch from './ApiWrapper';

const HeartComponent = ({ songId, initialLiked = false, onError, size = 32 }) => {
    const [liked, setLiked] = useState(initialLiked);
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            setLiked(false);
        }
    }, [isAuthenticated]);

    const [animation, setAnimation] = useState(null);


    const toggleLike = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const response = await apiFetch(
                "https://radio-vrijstaande-pilaster.runasp.net/api/playlist",
                {
                    method: liked ? "DELETE" : "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ songId })
                }
            );

            if (liked) {
                showAlert("Nummer verwijderd van je favorieten.", "info");
            } else {
                showAlert("Nummer toegevoegd aan je favorieten!", "success");
            }

            setLiked(prev => !prev);

            if (!liked) {
                setAnimation("like");
                setTimeout(() => setAnimation(null), 350);
            } else {
                setAnimation("unlike");
                setTimeout(() => setAnimation(null), 250);
            }


        } catch (err) {
            console.error("Like error:", err);
            if (onError) {
                showAlert("Er is een fout opgetreden bij het liken van dit nummer.", "danger");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={isAuthenticated ? toggleLike : () => showAlert("Je moet ingelogd zijn om nummers te liken.", "warning")}
            disabled={loading}
            className="btn bg-transparent m-3 p-0 border-0"
            title={liked ? "Unlike" : "Like"}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="-1 -1 18 18"
                className={`heart ${liked ? "liked" : ""} ${animation === "like"
                        ? "animate-like"
                        : animation === "unlike"
                            ? "animate-unlike"
                            : ""
                    }`}

            >
                <path
                    d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"
                    fill={liked ? "red" : "white"}
                    stroke="black"
                    strokeWidth="1.2"
                />
            </svg>


        </button>
    );
};

export default HeartComponent;
