import React from 'react';
import DetailsModal from '../DetailsModal.jsx';

const ReviewDetailsModal = ({ isOpen, onClose, review, onEdit }) => {
    return (
        <DetailsModal
            isOpen={isOpen}
            onClose={onClose}
            data={review}
            type='review'
            className="review-details-modal"
            onEdit={onEdit}
        />
    );
};

export default ReviewDetailsModal;

// Path: recipe-app/src/components/modals/ReviewDetailsModal.jsx