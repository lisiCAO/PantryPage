import React, { useContext } from 'react';
import Modal from './Modal';
import CustomForm from './../common/CustomForm';
import { MessageContext } from './../../contexts/MessageContext';
import './FormModal.scss';

const FormModal = ({ isOpen, onClose, onSubmit, config, initialData, mode }) => {
    const { message } = useContext(MessageContext);
    const handleFormSubmissionSuccess = () => {
        if (message) {
            setTimeout(() => {
                onClose();
            }, 3000);
        } else {
            onClose();
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <CustomForm
                onSubmit={onSubmit}
                config={config}
                initialData={initialData}
                mode={mode}
                onSubmissionSuccess={handleFormSubmissionSuccess}
            />
        </Modal>
    );
};

export default FormModal;
