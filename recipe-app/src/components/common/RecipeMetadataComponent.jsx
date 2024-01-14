import React from 'react';
import './RecipeMetadataComponent.scss';

const RecipeMetadataComponent = ({ createdBy, createdAt }) => (
    <div className="recipe-detail__metadata">
        <div className="metadata__author">
            <strong>Author: </strong><span>{createdBy}</span>
        </div>
        <div className="metadata__created-at">
            <strong>Created At: </strong><span>{createdAt}</span>
        </div>
    </div>
);

export default RecipeMetadataComponent;
