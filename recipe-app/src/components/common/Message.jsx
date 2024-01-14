import React from 'react';
import './Message.scss';

const Message = ({ message }) => {
  if (!message || !message.text) return null;

  // 
  const className = `message message--${message.type}`;

  return (
    <div className={className}>
      {message.text}
    </div>
  );
};

export default Message;
