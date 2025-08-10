// components/MessageStatus.jsx
import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

const MessageStatus = ({ status }) => {
  const iconStyles = {
    width: '16px',
    height: '16px'
  };

  const getIconColor = (status) => {
    switch (status) {
      case 'sent':
        return '#9ca3af'; // gray-400
      case 'delivered':
        return '#9ca3af'; // gray-400
      case 'read':
        return '#3b82f6'; // blue-500
      default:
        return '#9ca3af';
    }
  };

  if (status === 'sent') {
    return (
      <Check 
        style={{
          ...iconStyles,
          color: getIconColor(status)
        }} 
      />
    );
  }
  
  if (status === 'delivered') {
    return (
      <CheckCheck 
        style={{
          ...iconStyles,
          color: getIconColor(status)
        }} 
      />
    );
  }
  
  if (status === 'read') {
    return (
      <CheckCheck 
        style={{
          ...iconStyles,
          color: getIconColor(status)
        }} 
      />
    );
  }
  
  return null;
};

export default MessageStatus;