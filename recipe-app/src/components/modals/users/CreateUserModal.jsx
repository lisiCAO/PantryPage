import React from 'react';
import FormModal from '../FormModal.jsx';
import userConfig from './userConfig.js';
const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onCreate}
            config={userConfig}
            mode="create"
        />
    );
};

export default CreateUserModal;

// Path: recipe-app/src/components/modals/users/CreateUserModal.jsx
