import React, { useContext } from 'react';
import DetailContent from './../common/DetailContent';
import IngredientsComponent from './../common/IngredientsComponent';
import FavoriteButton from './../common/FavoriteButton';
import Message from './../common/Message';
import { MessageContext } from './../../contexts/MessageContext';
import RecipeReviews from './RecipeReviews';
import './RecipeDetails.scss';
const RecipeDetail = ({ recipe, onToggleFavorite }) => {
    const config = {
        title: 'name',
        image: 'imagePath',
        instructions: 'stepInstruction',
        createdBy: 'createdBy',
        updatedAt: 'updatedAt',
        ignoreFields: ['id', 'isFavorited', 'createdAt', 'ingredients']
    };

    const { message } = useContext(MessageContext);

    return (
        <div className="recipe-detail-container">
            <DetailContent data={recipe} config={config} />
            <IngredientsComponent ingredients={recipe.ingredients} />
            <FavoriteButton
                isFavorited={recipe.isFavorited}
                onToggle={() => onToggleFavorite(recipe.id)}
            />
            <Message message={message} />
            <RecipeReviews recipeId={recipe.id} />
        </div>
    );
};

export default RecipeDetail;
