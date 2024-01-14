import React from 'react';
import FormModal from '../FormModal.jsx';
import userConfig from './userConfig.js';

const CreateUserModal = ({ isOpen, onClose, onCreate, user }) => {

    const filteredConfig = userConfig.filter(field => {
        if (field.name === 'category') {
            return user && user.category === 'admin'; // Only show category field to admin users
        }
        return true;
    });
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onCreate}
            config={filteredConfig}
            mode="create"
        />
    );
};

export default CreateUserModal;

// Path: recipe-app/src/components/modals/users/CreateUserModal.jsx
