import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../components/AlertContext';
import apiFetch  from '../components/ApiWrapper';

const Editlied = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const { id } = useParams();
    const { showAlert } = useAlert();

    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        songId: '',
        title: '',
        artistId: '',
        releaseYear: '',
        imgUrl: '',
        lyrics: ''
    });


    useEffect(() => {
        apiFetch(`https://radio-vrijstaande-pilaster.runasp.net/api/songs/${id}`)
            .then(data => {
                if (data.length > 0) {
                    const s = data[0];
                    setSong(s);

                    setFormData({
                        songId: s.songId || '',
                        title: s.title || '',
                        artistId: s.artistId || '',
                        releaseYear: s.releaseYear || '',
                        imgUrl: s.imgUrl || '',
                        lyrics: s.lyrics || ''
                    });
                }
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
            const res = await apiFetch(`https://radio-vrijstaande-pilaster.runasp.net/api/edit/song/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            showAlert('Song updated successfully.', 'success');
            navigate(`/detaillied/${id}`);
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

    if (!song) {
        return <div className="container mt-5">Song not found</div>;
    }

    return (
        <div style={{ backgroundColor: 'rgb(254, 243, 212)', minHeight: '90vh' }}>
            <div className="container py-5">
                <form onSubmit={handleSubmit} className="row g-4">

                    <div className="col-md-4">
                        <img
                            src={formData.imgUrl || 'https://picsum.photos/640/'}
                            alt={formData.title}
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
                            name="imgUrl"
                            placeholder="Image URL"
                            value={formData.imgUrl}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-8">
                        <input
                            className="form-control mb-3"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                        />

                        <input
                            type="number"
                            className="form-control mb-3"
                            name="artistId"
                            value={formData.artistId}
                            onChange={handleChange}
                            placeholder="ArtistId"
                        />

                        <input
                            type="number"
                            className="form-control mb-3"
                            name="releaseYear"
                            value={formData.releaseYear}
                            onChange={handleChange}
                            placeholder="Release year"
                        />

                        <textarea
                            className="form-control mb-3"
                            rows="6"
                            name="lyrics"
                            value={formData.lyrics}
                            onChange={handleChange}
                            placeholder="Lyrics"
                        />

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary">
                                Save changes
                            </button>
                            <Link to={`/detaillied/${id}`} className="btn btn-secondary">
                                Cancel
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Editlied;
