import React from 'react';
import './Modal.scss'; 

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <button className="modal-close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    );
  };
  

export default Modal;