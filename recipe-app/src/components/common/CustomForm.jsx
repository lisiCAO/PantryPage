import React, { useState, useEffect, useMemo, useContext } from 'react';
import classNames from 'classnames';
import Button from './Button';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import FormFileInput from './FormFileInput';
import Select from './Select';
import Message from './Message';
import ApiService from '../../services/ApiService';
import { MessageContext } from './../../contexts/MessageContext';
import './CustomForm.scss';

const CustomForm = ({ className, onSubmit, config, initialData, mode, onSubmissionSuccess }) => {
    const shouldShowPasswordCheckbox = useMemo(() => {
        return mode === 'edit' && config.some(field => field.type === 'password');
    }, [config, mode]);

    // Initialize formData with default values
    const defaultFormData = useMemo(() => {
        return config.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {});
    }, [config]);

    const [formData, setFormData] = useState(defaultFormData);
    const [isPasswordChanging, setIsPasswordChanging] = useState(mode === 'create');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { message } = useContext(MessageContext);
    const { showMessage } = useContext(MessageContext);
    const formClassNames = classNames('custom-form', className);

    // Set formData to initialData when in edit mode
    useEffect(() => {
        if (mode === 'edit' && initialData) {
            const newFormData = { ...defaultFormData };
            config.forEach(field => {
                newFormData[field.name] = initialData[field.mapTo || field.name] || '';
            });
            setFormData(newFormData);
        } else {
            setFormData(defaultFormData);
        }
    }, [config, defaultFormData, initialData, mode]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleFileUpload = async (file, fieldName) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await ApiService.uploadFile(formData);
            if (response) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [fieldName]: response
                }));
            } else {
                console.error('File upload response does not contain a URL.');
            }
        } catch (error) {
            console.error('File upload error:', error);
        }
    };

    const renderFormFields = (config, formData) => {
        return config.map((field) => {
            if (field.shouldRender && !field.shouldRender(formData)) {
                return null;
            }

            if (field.name && field.name.includes('id')) {
                return null;
            }

            if (field.name && field.name.includes('createdAt')) {
                return null;
            }

            if (field.type === 'password') {
                if (mode === 'edit' && !isPasswordChanging) {
                    return null;
                }
                return (
                    <FormInput
                        key={field.name}
                        {...field}
                        name={field.name}
                        label={field.label}
                        value={formData[field.name]}
                        onChange={handleChange}
                    />
                );
            }

            switch (field.type) {
                case 'text':
                    return (
                        <FormInput
                            key={field.name}
                            {...field}
                            name={field.name}
                            label={field.label}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    );
                case 'number':
                    return (
                        <FormInput
                            key={field.name}
                            {...field}
                            name={field.name}
                            label={field.label}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    );
                case 'textarea':
                    return (
                        <FormTextArea
                            key={field.name}
                            {...field}
                            name={field.name}
                            label={field.label}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    );
                case 'file':
                    return (
                        <FormFileInput
                            key={field.name}
                            {...field}
                            name={field.name}
                            label={field.label}
                            onFileUpload={(file) => handleFileUpload(file, field.name)}
                        />
                    );

                case 'email':
                    return (
                        <FormInput
                            key={field.name}
                            {...field}
                            name={field.name}
                            label={field.label}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    );
                case 'select':
                    return (
                        <Select
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            options={field.options}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    );

                default:
                    return null;
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Disable submit button
        let submittedFormData = formData;
        if (mode === 'edit' && !isPasswordChanging) {
            const { password, ...rest } = formData;
            submittedFormData = rest;
        }
        const jsonFormData = JSON.stringify(submittedFormData);
        try {
            await onSubmit(jsonFormData);
            onSubmissionSuccess && onSubmissionSuccess();
        } catch (error) {
            showMessage('error', error.message || 'Error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={formClassNames} onSubmit={handleSubmit}>
            {shouldShowPasswordCheckbox && (
                <label className="custom-form__checkbox-label">
                    Change Password:
                    <input
                        type="checkbox"
                        checked={isPasswordChanging}
                        onChange={() => setIsPasswordChanging(!isPasswordChanging)}
                    />
                </label>
            )}
            {renderFormFields(config, formData)}
            <Message className="custom-form__message" message={message} />
            <Button className="custom-form__submit-button" type="submit" disabled={isSubmitting}>
                {mode === 'edit' ? 'Save' : 'Create'}
            </Button>
        </form>

    );
};

export default CustomForm;
