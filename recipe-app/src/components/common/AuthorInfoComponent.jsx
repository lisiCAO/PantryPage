import React from 'react';
import './AuthorInfoComponent.scss';

const AuthorInfoComponent = ({ author }) => (
    <div className="detail-content__author-info">
        <strong>Author: </strong>
        <span>{author}</span>
    </div>
);

export default AuthorInfoComponent;
