import React from 'react';
import './IngredientsComponent.scss';

const IngredientsComponent = ({ ingredients }) => (
    <ul className="recipe-detail__ingredients">
        {(ingredients || []).map((ingredient, index) => (
            <li key={index} className="ingredient-item">
                {`${ingredient.name} - ${ingredient.quantity} ${ingredient.unit || ''}`}
            </li>
        ))}
    </ul>
);

export default IngredientsComponent;

