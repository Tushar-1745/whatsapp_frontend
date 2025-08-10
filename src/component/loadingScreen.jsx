import React from 'react';

const LoadingScreen = () => {
  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
      color: 'white'
    },
    logo: {
      fontSize: '64px',
      marginBottom: '20px',
      animation: 'pulse 2s infinite'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '10px',
      opacity: 0.9
    },
    subtitle: {
      fontSize: '16px',
      opacity: 0.7,
      marginBottom: '40px'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderTop: '4px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    dots: {
      display: 'flex',
      gap: '4px',
      marginTop: '20px'
    },
    dot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      animation: 'bounce 1.4s infinite ease-in-out'
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { 
              transform: scale(1);
              opacity: 1;
            }
            50% { 
              transform: scale(1.05);
              opacity: 0.8;
            }
          }
          
          @keyframes bounce {
            0%, 80%, 100% { 
              transform: scale(0);
              opacity: 0.5;
            }
            40% { 
              transform: scale(1);
              opacity: 1;
            }
          }
          
          .loading-dot:nth-child(1) { animation-delay: -0.32s; }
          .loading-dot:nth-child(2) { animation-delay: -0.16s; }
          .loading-dot:nth-child(3) { animation-delay: 0s; }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.logo}>💬</div>
        <h1 style={styles.title}>WhatsApp Clone</h1>
        <p style={styles.subtitle}>Loading your conversations...</p>
        
        <div style={styles.spinner}></div>
        
        <div style={styles.dots}>
          <div style={styles.dot} className="loading-dot"></div>
          <div style={styles.dot} className="loading-dot"></div>
          <div style={styles.dot} className="loading-dot"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;