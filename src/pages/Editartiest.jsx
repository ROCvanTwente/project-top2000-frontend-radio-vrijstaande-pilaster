import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../components/AlertContext';
import apiFetch  from '../components/ApiWrapper';

const Editartiest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const { showAlert } = useAlert();

    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        artistId: '',
        name: '',
        photo: '',
        wiki: '',
        biography: ''
    });


    useEffect(() => {
        apiFetch(`https://radio-vrijstaande-pilaster.runasp.net/api/artists/${id}`)
            .then(data => {

                setArtist(data);

                setFormData({
                    artistId: data.artistId || '',
                    name: data.name || '',
                    photo: data.photo || '',
                    wiki: data.wiki || '',
                    biography: data.biography || ''
                });
            })
            .finally(() => {
                setLoading(false);
            })
            .catch(err => {
                console.error('API error:', err);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await apiFetch(`https://radio-vrijstaande-pilaster.runasp.net/api/edit/artist/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                throw new Error('Failed to update artist');
            }

            showAlert('Artist updated successfully.', 'success');
            navigate(`/detailartiest/${id}`);
        } catch (err) {
            console.error(err);
            showAlert('Something went wrong while saving.', 'danger');
        }
    };

    if (!isAdmin) {
        return <div className="container mt-5">Access denied</div>;
    }

    if (loading) {
        return <div className="container mt-5">Loading…</div>;
    }

    if (!artist) {
        return <div className="container mt-5">Artist not found</div>;
    }

    return (
        <div style={{ backgroundColor: 'rgb(254, 243, 212)', minHeight: '90vh' }}>
            <div className="container py-5">
                <form onSubmit={handleSubmit} className="row g-4">

                    <div className="col-md-4">
                        <img
                            src={formData.photo || 'https://picsum.photos/640/'}
                            alt={formData.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://picsum.photos/640';
                            }}
                            width={640}
                            className="img-fluid rounded shadow mb-3"
                        />

                        <input
                            type="text"
                            className="form-control"
                            name="photo"
                            placeholder="Image URL"
                            value={formData.photo}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-8">
                        <input
                            className="form-control mb-3"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />

                        <input
                            type="text"
                            className="form-control mb-3"
                            name="wiki"
                            value={formData.wiki}
                            onChange={handleChange}
                            placeholder="Wiki"
                        />

                        <textarea
                            className="form-control mb-3"
                            rows="6"
                            name="biography"
                            value={formData.biography}
                            onChange={handleChange}
                            placeholder="Biography"
                        />

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary">
                                Save changes
                            </button>
                            <Link to={`/detailartiest/${id}`} className="btn btn-secondary">
                                Cancel
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Editartiest;
