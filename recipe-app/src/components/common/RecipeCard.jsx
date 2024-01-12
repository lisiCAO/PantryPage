import React from 'react';
import Button from './Button';
import FavoriteButton from './FavoriteButton';
import defaultImage from './../../assets/image/default.png';
import './RecipeCard.scss';

const RecipeCard = ({ recipe, onOpenDetails, onDelete, onToggleFavorite }) => {
    const handleButtonClick = (event) => {
        event.stopPropagation(); // prevent event bubbling
        onDelete && onDelete(recipe);
    };

    const handleFavoriteClick = (event) => {
        event.stopPropagation(); // prevent event bubbling
        onToggleFavorite && onToggleFavorite(recipe.id);
    };

    return (
        <div className="recipe-card" onClick={() => onOpenDetails(recipe)}>
            <img src={`http://localhost:8000${recipe.imagePath}`} onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }} alt={recipe.name} className="recipe-card__image" />
            <div className="recipe-card__info">
                <h3>{recipe.name}</h3>
                <p>Comments: {recipe.reviewsCount}</p>
                <p>Favorites: {recipe.favoritesCount}</p>
            </div>
            {onDelete && (
                <Button onClick={(e) => handleButtonClick(e)} className="recipe-card__delete">Delete</Button>
            )}
            {onToggleFavorite && (
                <FavoriteButton 
                    isFavorited={recipe.isFavorited} 
                    onToggle={(e) => handleFavoriteClick(e)}
                />
            )}
        </div>
    );
};

export default RecipeCard;

// Path: recipe-app/src/components/common/RecipeCard.jsx