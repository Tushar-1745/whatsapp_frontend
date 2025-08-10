// components/MessageInput.jsx
import React, { useState, useRef } from "react";
import { Plus, Smile, Mic } from "lucide-react";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
      inputRef.current?.focus();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const styles = {
    container: {
      backgroundColor: "#f0f2f5",
      padding: "8px",
      borderTop: "1px solid #ddd",
    },
    inputBar: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: "25px",
      padding: "6px 10px",
      gap: "8px",
    },
    icon: {
      width: "24px",
      height: "24px",
      color: "#54656f",
      cursor: "pointer",
      flexShrink: 0,
    },
    input: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: "14px",
      background: "transparent",
    },
    mic: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.2s ease",
      color: "#54656f",
      flexShrink: 0,
    },
    micHover: {
      backgroundColor: "#25d366",
      color: "#fff",
    },
  };

  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      <div style={styles.inputBar}>
        {/* Plus Icon */}
        <Plus style={styles.icon} />

        {/* Emoji Icon */}
        <Smile style={styles.icon} />

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />

        {/* Mic */}
        <div
          style={{
            ...styles.mic,
            ...(isRecording ? styles.micHover : {}),
          }}
          onClick={toggleRecording}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor =
              styles.micHover.backgroundColor;
            e.currentTarget.style.color = styles.micHover.color;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#54656f";
          }}
        >
          <Mic size={18} />
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
