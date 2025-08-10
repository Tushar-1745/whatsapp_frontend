// components/MessageInput.jsx
import React, { useState, useRef } from 'react';
import { Send, Smile, Paperclip, Mic } from 'lucide-react';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const styles = {
    container: {
      backgroundColor: '#f3f4f6',
      padding: '8px',
      borderTop: '1px solid #e5e7eb'
    },
    innerContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    desktopIcons: {
      display: 'none',
      gap: '8px'
    },
    iconButton: {
      width: '24px',
      height: '24px',
      color: '#4b5563',
      cursor: 'pointer'
    },
    iconButtonHover: {
      color: '#1f2937'
    },
    inputContainer: {
      flex: '1',
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      backgroundColor: '#ffffff',
      borderRadius: '9999px',
      border: '1px solid #d1d5db',
      outline: 'none',
      fontSize: '14px'
    },
    inputFocused: {
      borderColor: '#10b981'
    },
    mobileIcons: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      gap: '8px'
    },
    mobileIcon: {
      width: '20px',
      height: '20px',
      color: '#4b5563',
      cursor: 'pointer'
    },
    sendButton: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      borderRadius: '50%',
      padding: '8px',
      border: 'none',
      cursor: 'pointer',
      flexShrink: '0',
      transition: 'background-color 0.2s'
    },
    sendButtonHover: {
      backgroundColor: '#059669'
    },
    micButton: {
      borderRadius: '50%',
      padding: '8px',
      border: 'none',
      cursor: 'pointer',
      flexShrink: '0',
      transition: 'background-color 0.2s'
    },
    micButtonActive: {
      backgroundColor: '#ef4444',
      color: '#ffffff'
    },
    micButtonInactive: {
      backgroundColor: '#4b5563',
      color: '#ffffff'
    },
    micButtonInactiveHover: {
      backgroundColor: '#374151'
    }
  };

  // Media queries for responsive design
  const mediaQueries = `
    @media (min-width: 640px) {
      .message-input-container {
        padding: 12px 16px;
      }
      .message-input-inner {
        gap: 12px;
      }
      .desktop-icons {
        display: flex;
      }
      .mobile-icons {
        display: none;
      }
      .message-input {
        padding: 12px 16px;
        font-size: 16px;
      }
      .action-button {
        padding: 10px;
      }
      .icon-small {
        width: 20px;
        height: 20px;
      }
    }
  `;

  return (
    <>
      <style>{mediaQueries}</style>
      <div 
        style={styles.container}
        className="message-input-container"
      >
        <div 
          style={styles.innerContainer}
          className="message-input-inner"
        >
          <div 
            style={styles.desktopIcons}
            className="desktop-icons"
          >
            <Smile 
              style={styles.iconButton}
              onMouseOver={(e) => e.target.style.color = styles.iconButtonHover.color}
              onMouseOut={(e) => e.target.style.color = styles.iconButton.color}
            />
            <Paperclip 
              style={styles.iconButton}
              onMouseOver={(e) => e.target.style.color = styles.iconButtonHover.color}
              onMouseOut={(e) => e.target.style.color = styles.iconButton.color}
            />
          </div>
          
          <div style={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              style={styles.input}
              className="message-input"
              onFocus={(e) => e.target.style.borderColor = styles.inputFocused.borderColor}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
            <div 
              style={styles.mobileIcons}
              className="mobile-icons"
            >
              <Smile style={styles.mobileIcon} />
              <Paperclip style={styles.mobileIcon} />
            </div>
          </div>
          
          {message.trim() ? (
            <button
              type="button"
              onClick={handleSubmit}
              style={styles.sendButton}
              className="action-button"
              onMouseOver={(e) => e.target.style.backgroundColor = styles.sendButtonHover.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = styles.sendButton.backgroundColor}
            >
              <Send className="icon-small" style={{ width: '16px', height: '16px' }} />
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleRecording}
              style={{
                ...styles.micButton,
                ...(isRecording ? styles.micButtonActive : styles.micButtonInactive)
              }}
              className="action-button"
              onMouseOver={(e) => {
                if (!isRecording) {
                  e.target.style.backgroundColor = styles.micButtonInactiveHover.backgroundColor;
                }
              }}
              onMouseOut={(e) => {
                if (!isRecording) {
                  e.target.style.backgroundColor = styles.micButtonInactive.backgroundColor;
                }
              }}
            >
              <Mic className="icon-small" style={{ width: '16px', height: '16px' }} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageInput;