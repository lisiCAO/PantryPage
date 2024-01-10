import React from 'react';
import FormModal from '../FormModal.jsx';
import recipeConfig from './recipeConfig.js';
const CreateRecipeModal = ({ isOpen, onClose, onCreate }) => {
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onCreate}
            config={recipeConfig}
            mode="create"
        />
    );
};
export default CreateRecipeModal;
// Path: recipe-app/src/components/modals/CreateRecipeModal.jsx