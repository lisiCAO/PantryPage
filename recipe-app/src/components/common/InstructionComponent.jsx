import React from 'react';
import './InstructionComponent.scss';

const InstructionComponent = ({ value }) => (
    <div className="detail-content__instruction">
        <strong>Instructions: </strong>
        <p>{value}</p>
    </div>
);

export default InstructionComponent;
