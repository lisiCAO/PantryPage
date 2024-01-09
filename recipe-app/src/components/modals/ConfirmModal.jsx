import React from 'react';
import Modal from './Modal'; 
import Button from './../common/Button';
import './ConfirmModal.scss'; 

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    return (
        <Modal isOpen={isOpen} onClose={onCancel}>
            <div className="confirm-modal-content">
                <div className="confirm-modal-header">{title}</div>
                <div className="confirm-modal-body">{message}</div>
                <div className="confirm-modal-footer">
                    <Button className="button" onClick={onCancel}>Cancel</Button>
                    <Button className="button" onClick={onConfirm}>Confirm</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;

