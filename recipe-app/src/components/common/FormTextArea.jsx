import React from 'react';
import './FormTextArea.scss';

const FormTextArea = ({ name, label, value, onChange }) => {
    return (
        <div className="form-textarea">
            <label htmlFor={name} className="form-textarea__label">{label}</label>
            <textarea
                name={name}
                id={name}
                className="form-textarea__textarea"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default FormTextArea;
