import React from 'react';
import defaultImage from './../../assets/image/default.png';
import './ImageComponent.scss';

const ImageComponent = ({ src, alt, size = 'normal', shape = 'square' }) => {
    const imageClass = `detail-content__image detail-content__image--${size} detail-content__image--${shape}`;

    return (
        <div className="detail-content__image-container">
            <img src={src} alt={alt} className={imageClass} onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}/>
        </div>
    );
};

export default ImageComponent;
