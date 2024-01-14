import React from 'react';
import { camelCaseToNormal } from './../../assets/util/util'
import './StatisticsCard.scss';

const StatisticsCard = ({ title, data, onClick }) => {
    const renderDataContent = (key, value) => {
        let displayKey = camelCaseToNormal(key);

        if (key === 'mostPopularRecipe' || key === 'mostUsedIngredient') {
            return <p key={key}>{`${displayKey}: ${value.name || value.recipe_name} (Count: ${value.recipes_count || value.reviews_count})`}</p>;
        } else if (key === 'recentReviews') {
            return value.map(review => (
                <p key={review.id}>{`${review.recipeName}: ${review.comment}`}</p>
            ));
        } else {
            return <p key={key}>{`${displayKey}: ${value}`}</p>;
        }
    };

    return (
        <div className="statistics-card" onClick={onClick}>
            <h2>{title}</h2>
            {Object.entries(data).map(([key, value]) => renderDataContent(key, value))}
        </div>
    );
};

export default StatisticsCard;
