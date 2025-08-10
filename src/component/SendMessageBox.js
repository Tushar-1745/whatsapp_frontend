import React, { useState } from 'react';

const SendMessageBox = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const styles = {
    form: {
      display: 'flex',
      padding: '8px 16px',
      borderTop: '1px solid #ddd',
      backgroundColor: '#f9f9f9',
    },
    input: {
      flexGrow: 1,
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '20px',
      border: '1px solid #ccc',
      outline: 'none',
      borderColor: isFocused ? '#4fc3f7' : '#ccc',
      transition: 'border-color 0.3s ease'
    },
    button: {
      marginLeft: '10px',
      backgroundColor: input.trim() ? '#4fc3f7' : '#a6d8fb',
      border: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '20px',
      fontWeight: 'bold',
      cursor: input.trim() ? 'pointer' : 'not-allowed',
      transition: 'background-color 0.3s ease',
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleButtonHover = (e, isHovering) => {
    if (input.trim()) {
      e.target.style.backgroundColor = isHovering ? '#29b6f6' : '#4fc3f7';
    }
  };

  return (
    <form style={styles.form} onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
      />
      <button
        type="submit"
        disabled={!input.trim()}
        style={styles.button}
        onMouseEnter={(e) => handleButtonHover(e, true)}
        onMouseLeave={(e) => handleButtonHover(e, false)}
      >
        Send
      </button>
    </form>
  );
};

export default SendMessageBox;