import React from 'react';
import './InstructionComponent.scss';

const InstructionComponent = ({ value }) => {
    const instructions = value.split('\n').map((item, index) => (
        item !== '' && <p key={index}>{item}</p>
    ));
    return (
    <div className="detail-content__instruction">
        <div className="instruction-title"><strong>Instructions:</strong></div>
        <div className="instruction-content">
            {instructions}
        </div>
    </div>
    );
};

export default InstructionComponent;
