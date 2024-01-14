import React from 'react';
import './Button.scss'; // Import the Button.scss styles

const Button = ({ children, onClick, className, disabled = false }) => {
  const buttonClass = `button ${className || ''}`.trim();
  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;