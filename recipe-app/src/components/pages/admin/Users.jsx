import React, { useState, useEffect, useContext } from 'react';
import Button from '../../common/Button';
import Table from '../../layout/Table';
import SearchBar from '../../common/Searchbar';
import CreateUserModal from '../../modals/users/CreateUserModal';
import EditUserModal from '../../modals/users/EditUserModal';
import UserDetailsModal from '../../modals/users/UserDetailsModal';
import ConfirmModal from '../../modals/ConfirmModal';
import ApiService from '../../../services/ApiService';
import { MessageContext } from './../../../contexts/MessageContext';
import './Users.scss';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { showMessage, hideMessage } = useContext(MessageContext);

    useEffect(() => {
        ApiService.fetchUsers()
            .then(response => {
                if (Array.isArray(response)) {
                    setUsers(response);
                } else {
                    console.error('Unable to fetch Users.');
                    return [];
                }
            })
            .catch(error => {
                setUsers([]);
            });
    }, []);

    const handleCreate = async (newUser) => {
        await ApiService.createUser(newUser)
            .then(addedUser => {
                setUsers([...users, addedUser]);
                showMessage('success', 'User created successfully');
            })
    };

    const handleViewDetails = (user) => {
        const userId = user.id;
        ApiService.fetchUser(userId)
            .then(data => {
                setSelectedUser(data);
                setShowDetailsModal(true);
            })
            .catch(error => { console.error(error); setEditingUser(null) });
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowDetailsModal(false);
    };

    const saveEditedUser = async (updatedUserData) => {
        await ApiService.updateUser(editingUser.id, updatedUserData)
            .then(updatedUser => {
                setUsers(users.map(user =>
                    user.id === updatedUser.id ? updatedUser : user
                ));
                showMessage('success', 'User updated successfully');
            })
    };

    const confirmDelete = (user) => {
        setUserToDelete(user);
        setShowConfirmModal(true);
    };

    const handleDeleteConfirmed = () => {
        if (userToDelete) {
            ApiService.deleteUser(userToDelete.id).then(() => {
                setUsers(users.filter(r => r.id !== userToDelete.id));
                setUserToDelete(null);
            });
        }
        setShowConfirmModal(false);
    };

    const handleCancelDelete = () => {
        setUserToDelete(null);
        setShowConfirmModal(false);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Table columns
    const columns = [
        { header: 'Name', cell: (row) => row.name },
        { header: 'Email', cell: (row) => row.email },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Category', cell: (row) => row.category },
    ];


    // Filter the users based on the search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || []
    );

    return (
        <div>
            <div className="top-bar">
                <Button className="button--add" onClick={() => setShowCreateModal(true)}>Add New</Button>
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <Table
                columns={columns}
                data={filteredUsers}
                onViewDetails={handleViewDetails}
                onDelete={confirmDelete}
            />
            {showCreateModal && (
                <CreateUserModal
                    isOpen={showCreateModal}
                    onClose={() => {
                        setShowCreateModal(false);
                        hideMessage();
                    }}
                    onCreate={handleCreate}
                />
            )}
            {showDetailsModal && (
                <UserDetailsModal
                    isOpen={showDetailsModal}
                    onClose={() => setShowDetailsModal(false)}
                    user={selectedUser}
                    onEdit={handleEditUser}
                />
            )}
            {editingUser && (
                <EditUserModal
                    isOpen={!!editingUser}
                    onClose={() => {
                        setEditingUser(null);
                        setShowDetailsModal(false);
                        hideMessage();
                    }}
                    onEdit={saveEditedUser}
                    userData={editingUser}
                />
            )}
            <ConfirmModal
                isOpen={showConfirmModal}
                title="Confirm Delete"
                message="Are you sure you want to delete this user?"
                onConfirm={handleDeleteConfirmed}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default Users;