import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../components/AlertContext';
import apiFetch from '../components/ApiWrapper';

const Editroles = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const { showAlert } = useAlert();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [confirmEmail, setConfirmEmail] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState('User');

    useEffect(() => {
        apiFetch('https://radio-vrijstaande-pilaster.runasp.net/api/admin/users', {
            method: 'GET',
        })
            .then(data => setUsers(data))
            .catch(err => {
                console.error(err);
                showAlert('Gebruikers laden mislukt', 'danger');
            })
            .finally(() => setLoading(false));
    }, [showAlert]);

    const assignRole = async (email, role) => {
        try {
            const data = await apiFetch(
                'https://radio-vrijstaande-pilaster.runasp.net/api/admin/assign-role',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, role })
                }
            );

            showAlert(data.message, 'success');

            setUsers(prev =>
                prev.map(u =>
                    u.email === email ? { ...u, roles: data.roles } : u
                )
            );
        } catch (err) {
            showAlert(err.message || 'Rol toewijzen mislukt', 'danger');
        }
    };

    const removeRole = async (email, role) => {
        try {
            const data = await apiFetch(
                'https://radio-vrijstaande-pilaster.runasp.net/api/admin/remove-role',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, role })
                }
            );

            showAlert(data.message, 'success');

            setUsers(prev =>
                prev.map(u =>
                    u.email === email ? { ...u, roles: data.roles } : u
                )
            );
        } catch (err) {
            showAlert(err.message || 'Rol verwijderen mislukt', 'danger');
        }
    };

    const openDeleteModal = (user) => {
        setUserToDelete(user);
        setConfirmEmail('');
        setShowDeleteModal(true);
    };

    const confirmDeleteUser = async () => {
        if (!userToDelete) return;

        if (confirmEmail !== userToDelete.email) {
            showAlert('E-mailadres komt niet overeen. Verwijderen geannuleerd.', 'danger');
            return;
        }

        try {
            setDeleteLoading(true);

            const data = await apiFetch(
                `https://radio-vrijstaande-pilaster.runasp.net/api/admin/delete-user/${userToDelete.id}`,
                {
                    method: 'DELETE',
                }
            );

            showAlert(data.message, 'success');

            setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
            setShowDeleteModal(false);
            setUserToDelete(null);
        } catch (err) {
            showAlert(err.message || 'Gebruiker verwijderen mislukt', 'danger');
        } finally {
            setDeleteLoading(false);
        }
    };

    if (!isAdmin) {
        return <div className="container mt-5">Toegang geweigerd</div>;
    }

    if (loading) {
        return <div className="container mt-5">Laden…</div>;
    }

    return (
        <div style={{ backgroundColor: 'rgb(254, 243, 212)', minHeight: '90vh' }}>
            <div className="container py-5">
                <h2 className="mb-4">Gebruikersrollen beheren</h2>

                <div className="mb-3">
                    <label className="form-label">Rol om toe te wijzen</label>
                    <select
                        className="form-select"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="User">Gebruiker</option>
                        <option value="Admin">Administrator</option>
                    </select>
                </div>

                <div className="list-group">
                    {users.map(user => (
                        <div
                            key={user.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>{user.email}</strong>
                                <div className="text-muted small">
                                    Rollen: {user.roles.join(', ') || 'Geen'}
                                </div>
                            </div>

                            <div className="d-flex flex-wrap gap-2 justify-content-end action-buttons">
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => assignRole(user.email, selectedRole)}
                                >
                                    Toewijzen
                                </button>

                                {user.roles.map(role => (
                                    <button
                                        key={role}
                                        className="btn btn-sm btn-primary"
                                        onClick={() => removeRole(user.email, role)}
                                    >
                                        Verwijder {role}
                                    </button>
                                ))}

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => openDeleteModal(user)}
                                >
                                    Gebruiker verwijderen
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="btn btn-secondary mt-4"
                    onClick={() => navigate(-1)}
                >
                    Terug
                </button>

                {showDeleteModal && userToDelete && (
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-danger">
                                <div className="modal-header bg-danger text-white">
                                    <h5 className="modal-title">Bevestig verwijderen gebruiker</h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowDeleteModal(false)}
                                    />
                                </div>

                                <div className="modal-body">
                                    <p>
                                        Deze actie <strong>kan niet ongedaan worden gemaakt</strong>.
                                    </p>

                                    <p className="mb-2">
                                        Typ het e-mailadres hieronder om te bevestigen:
                                    </p>

                                    <div className="alert alert-warning py-2">
                                        <strong>{userToDelete.email}</strong>
                                    </div>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="E-mailadres opnieuw invoeren"
                                        value={confirmEmail}
                                        onChange={(e) => setConfirmEmail(e.target.value)}
                                    />

                                    {confirmEmail && confirmEmail !== userToDelete.email && (
                                        <div className="text-danger small mt-2">
                                            E-mailadres komt niet overeen
                                        </div>
                                    )}
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowDeleteModal(false)}
                                        disabled={deleteLoading}
                                    >
                                        Annuleren
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        disabled={
                                            deleteLoading ||
                                            confirmEmail !== userToDelete.email
                                        }
                                        onClick={confirmDeleteUser}
                                    >
                                        {deleteLoading ? 'Bezig met verwijderen…' : 'Gebruiker verwijderen'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* achtergrond */}
                        <div className="modal-backdrop fade show z-n1"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Editroles;
