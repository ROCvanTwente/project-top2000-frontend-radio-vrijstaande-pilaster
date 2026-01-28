import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../components/AlertContext';

const Editroles = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const { showAlert } = useAlert();
    const token = localStorage.getItem('token');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [confirmEmail, setConfirmEmail] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState('User');

    useEffect(() => {
        fetch('https://radio-vrijstaande-pilaster.runasp.net/api/admin/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch users');
                return res.json();
            })
            .then(data => setUsers(data))
            .catch(err => {
                console.error(err);
                showAlert('Failed to load users', 'danger');
            })
            .finally(() => setLoading(false));
    }, [token, showAlert]);

    const assignRole = async (email, role) => {
        try {
            const res = await fetch('https://radio-vrijstaande-pilaster.runasp.net/api/admin/assign-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email, role })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            showAlert(data.message, 'success');

            setUsers(prev =>
                prev.map(u =>
                    u.email === email ? { ...u, roles: data.roles } : u
                )
            );
        } catch (err) {
            showAlert(err.message || 'Failed to assign role', 'danger');
        }
    };

    const removeRole = async (email, role) => {
        try {
            const res = await fetch('https://radio-vrijstaande-pilaster.runasp.net/api/admin/remove-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email, role })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            showAlert(data.message, 'success');

            setUsers(prev =>
                prev.map(u =>
                    u.email === email ? { ...u, roles: data.roles } : u
                )
            );
        } catch (err) {
            showAlert(err.message || 'Failed to remove role', 'danger');
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
            showAlert('Email does not match. Deletion aborted.', 'danger');
            return;
        }

        try {
            setDeleteLoading(true);

            const res = await fetch(
                `https://radio-vrijstaande-pilaster.runasp.net/api/admin/delete-user/${userToDelete.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            showAlert(data.message, 'success');

            setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
            setShowDeleteModal(false);
            setUserToDelete(null);
        } catch (err) {
            showAlert(err.message || 'Failed to delete user', 'danger');
        } finally {
            setDeleteLoading(false);
        }
    };



    if (!isAdmin) {
        return <div className="container mt-5">Access denied</div>;
    }

    if (loading) {
        return <div className="container mt-5">Loading…</div>;
    }

    return (
        <div style={{ backgroundColor: 'rgb(254, 243, 212)', minHeight: '90vh' }}>
            <div className="container py-5">
                <h2 className="mb-4">User Role Management</h2>

                <div className="mb-3">
                    <label className="form-label">Role to assign</label>
                    <select
                        className="form-select"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
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
                                    Roles: {user.roles.join(', ') || 'None'}
                                </div>
                            </div>

                            <div className="d-flex flex-wrap gap-2 justify-content-end action-buttons">
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => assignRole(user.email, selectedRole)}
                                >
                                    Assign
                                </button>

                                {user.roles.map(role => (
                                    <button
                                        key={role}
                                        className="btn btn-sm btn-primary"
                                        onClick={() => removeRole(user.email, role)}
                                    >
                                        Remove {role}
                                    </button>
                                ))}

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => openDeleteModal(user)}
                                >
                                    Delete User
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="btn btn-secondary mt-4"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>

                {showDeleteModal && userToDelete && (
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-danger">
                                <div className="modal-header bg-danger text-white">
                                    <h5 className="modal-title">Confirm User Deletion</h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowDeleteModal(false)}
                                    />
                                </div>

                                <div className="modal-body">

                                    <p>
                                        This action <strong>cannot be undone</strong>.
                                    </p>

                                    <p className="mb-2">
                                        To confirm deletion, type the email address below:
                                    </p>

                                    <div className="alert alert-warning py-2">
                                        <strong>{userToDelete.email}</strong>
                                    </div>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Re-type user email"
                                        value={confirmEmail}
                                        onChange={(e) => setConfirmEmail(e.target.value)}
                                    />

                                    {confirmEmail && confirmEmail !== userToDelete.email && (
                                        <div className="text-danger small mt-2">
                                            Email does not match
                                        </div>
                                    )}
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowDeleteModal(false)}
                                        disabled={deleteLoading}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        disabled={
                                            deleteLoading ||
                                            confirmEmail !== userToDelete.email
                                        }
                                        onClick={confirmDeleteUser}
                                    >
                                        {deleteLoading ? 'Deleting…' : 'Delete User'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* backdrop */}
                        <div className="modal-backdrop fade show z-n1"></div>
                    </div>
                )}

            </div>
        </div>


    );
};

export default Editroles;
