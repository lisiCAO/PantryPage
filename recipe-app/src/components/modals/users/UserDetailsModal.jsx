import React from 'react';
import DetailsModal from '../DetailsModal.jsx';

const UserDetailsModal = ({ isOpen, onClose, user, onEdit }) => {
    return (
        <DetailsModal
            isOpen={isOpen}
            onClose={onClose}
            data={user}
            type='user'
            className="user-details-modal"
            onEdit={onEdit}
        />
    );
};

export default UserDetailsModal;