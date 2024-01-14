import React from 'react';
import './DetailItemComponent.scss';

const DetailItemComponent = ({ label, value }) => (
    <div className="detail-content__item">
        <strong className="detail-content__label">{label}: </strong>
        <span className="detail-content__value">{value}</span>
    </div>
);

export default DetailItemComponent;
