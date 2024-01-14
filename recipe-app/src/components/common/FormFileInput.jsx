import React from 'react';
import './FormFileInput.scss';

const FormFileInput = ({ name, label, onFileUpload }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileUpload(file); // Pass the file to the parent component
        }
    };
    return (
        <div className="form-file-input">
            <label htmlFor={name} className="form-file-input__label">{label}</label>
            <input
                type="file"
                name={name}
                id={name}
                className="form-file-input__input"
                onChange={handleFileChange}
            />
        </div>
    );
}

export default FormFileInput;
