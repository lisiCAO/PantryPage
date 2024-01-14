import React from 'react';
import FormModal from '../FormModal.jsx';
import ingredientConfig from './ingredientConfig.js';
const CreateIngredientModal = ({ isOpen, onClose, onCreate }) => {
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onCreate}
            config={ingredientConfig}
            mode="create"
        />
    );
};
export default CreateIngredientModal;
// Path: recipe-app/src/components/modals/ingredients/CreateIngredientModal.jsx