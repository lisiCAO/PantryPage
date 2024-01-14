import React from 'react';
import DetailsModal from '../DetailsModal.jsx';

const RecipeDetailsModal = ({ isOpen, onClose, recipe, onEdit }) => {
    return (
        <DetailsModal
            isOpen={isOpen}
            onClose={onClose}
            data={recipe}
            type='recipe'
            className="recipe-details-modal"
            onEdit={onEdit}
        />
    );
};

export default RecipeDetailsModal;

// Path: recipe-app/src/components/modals/RecipeDetailsModal.jsx