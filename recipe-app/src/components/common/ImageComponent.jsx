import React from 'react';
import './ImageComponent.scss';

const ImageComponent = ({ src, alt }) => (
    <div className="detail-content__image-container">
        <img src={src} alt={alt} className="detail-content__image" />
    </div>
);

export default ImageComponent;
