import React, { useState, useContext } from 'react';
import Modal from './Modal';
import FormInput from './../common/FormInput';
import Button from './../common/Button';
import Message from './../common/Message';
import { MessageContext } from './../../contexts/MessageContext';
import './LoginModal.scss';

const LoginModal = ({ onLogin, onClose, onOpenCreateAccount }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { message } = useContext(MessageContext);
    
    return (
        <div className="login-modal">
            <Modal isOpen={true} onClose={onClose}>
                <div className="login-modal__content">
                    <h2 className="login-modal__title">Login</h2>
                    {/* sign up link */}
                    <p className="login-modal__signup-link">
                        Don't have an account? 
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            onOpenCreateAccount();
                        }}>Sign up</a>
                    </p>
                    <FormInput 
                        className="login-modal__input"
                        name="email" 
                        label="Email" 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <FormInput 
                        className="login-modal__input"
                        name="password" 
                        label="Password" 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <Message className="login-modal__message" message={message} />
                    <Button 
                        className="login-modal__button" 
                        onClick={() => onLogin(email, password)}>
                        Sign In
                    </Button>
                    
                </div>
            </Modal>
        </div>
    );
};

export default LoginModal;
