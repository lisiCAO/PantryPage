import React from 'react';
import './UpdateTimeComponent.scss';

const UpdateTimeComponent = ({ updateTime }) => (
    <div className="detail-content__update-time">
        <strong>Updated At: </strong>
        <span>{updateTime}</span>
    </div>
);

export default UpdateTimeComponent;
