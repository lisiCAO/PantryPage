import React from 'react';
import './FavoriteButton.scss';

const FavoriteButton = ({ isFavorited, onToggle }) => (
    <button
        className={`favorite-button ${isFavorited ? 'favorite-button--favorited' : ''}`}
        onClick={onToggle}>
        {isFavorited ? '💗 Favorite' : '🤍 Favorite'}
    </button>
);

export default FavoriteButton;

// Path: recipe-app/src/components/common/FavoriteButton.jsx