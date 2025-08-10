import React, { useState } from 'react';

const AuthScreen = ({ onSignup, onLogin, authError, clearAuthError, isLoading }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [countryCode, setCountryCode] = useState('+91');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format mobile number (only digits)
    if (name === 'mobile') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: digits }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear confirm password error if passwords now match
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password' && formData.confirmPassword && value === formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
      if (name === 'confirmPassword' && value === formData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
    
    if (authError) {
      clearAuthError();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation (only for signup)
    if (!isLoginMode && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!isLoginMode && formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid Indian mobile number';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation (only for signup)
    if (!isLoginMode) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const mobileWithCountryCode = `${countryCode}${formData.mobile}`;

    if (isLoginMode) {
      // Login
      await onLogin({
        mobile: mobileWithCountryCode,
        password: formData.password
      });
    } else {
      // Signup
      await onSignup({
        name: formData.name.trim(),
        mobile: mobileWithCountryCode,
        password: formData.password
      });
    }
  };

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      name: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    if (authError) {
      clearAuthError();
    }
  };

  const styles = {
    container: {
      height: '100vh',
      backgroundColor: '#f0f2f5',
      display: 'flex'
    },
    sidebar: {
      width: '40%',
      minWidth: '300px',
      backgroundColor: '#00a884',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      color: 'white'
    },
    sidebarContent: {
      textAlign: 'center',
      maxWidth: '300px'
    },
    logo: {
      width: '120px',
      height: '120px',
      backgroundColor: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      marginBottom: '30px',
      margin: '0 auto 30px'
    },
    sidebarTitle: {
      fontSize: '28px',
      fontWeight: '300',
      marginBottom: '20px',
      lineHeight: '1.2'
    },
    sidebarSubtitle: {
      fontSize: '16px',
      opacity: 0.9,
      lineHeight: '1.5',
      fontWeight: '300'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px'
    },
    authBox: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '40px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '400',
      color: '#41525d',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '14px',
      color: '#667781',
      lineHeight: '1.4'
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      fontSize: '14px',
      color: '#41525d',
      marginBottom: '8px',
      display: 'block',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d1d7db',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.2s',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    inputError: {
      borderColor: '#f15c6d'
    },
    phoneContainer: {
      display: 'flex',
      gap: '8px'
    },
    countrySelect: {
      width: '80px',
      padding: '12px 8px',
      border: '1px solid #d1d7db',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: 'white',
      outline: 'none'
    },
    phoneInput: {
      flex: 1,
      padding: '12px 16px',
      border: '1px solid #d1d7db',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box'
    },
    passwordContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    passwordInput: {
      width: '100%',
      padding: '12px 45px 12px 16px',
      border: '1px solid #d1d7db',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.2s',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    eyeIcon: {
      position: 'absolute',
      right: '12px',
      cursor: 'pointer',
      fontSize: '18px',
      color: '#667781',
      userSelect: 'none',
      zIndex: 1
    },
    error: {
      color: '#f15c6d',
      fontSize: '12px',
      marginTop: '4px',
      display: 'block'
    },
    authError: {
      backgroundColor: '#fff5f5',
      border: '1px solid #f15c6d',
      borderRadius: '4px',
      padding: '12px',
      marginBottom: '20px',
      color: '#c53030',
      fontSize: '14px',
      textAlign: 'center'
    },
    button: {
      backgroundColor: '#00a884',
      color: 'white',
      border: 'none',
      borderRadius: '24px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginTop: '20px'
    },
    buttonDisabled: {
      backgroundColor: '#d1d7db',
      cursor: 'not-allowed'
    },
    toggleContainer: {
      textAlign: 'center',
      marginTop: '30px',
      paddingTop: '20px',
      borderTop: '1px solid #e9ecef'
    },
    toggleText: {
      fontSize: '14px',
      color: '#667781'
    },
    toggleButton: {
      color: '#00a884',
      cursor: 'pointer',
      fontWeight: '500',
      textDecoration: 'none'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '8px'
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          .auth-input:focus {
            border-color: #00a884 !important;
          }
          
          .auth-button:hover:not(:disabled) {
            background-color: #017561 !important;
          }
          
          .eye-icon:hover {
            color: #00a884 !important;
          }
          
          @media (max-width: 768px) {
            .auth-container {
              flex-direction: column !important;
            }
            .auth-sidebar {
              width: 100% !important;
              min-height: 200px !important;
              padding: 20px !important;
            }
            .auth-main {
              padding: 20px !important;
            }
            .auth-box {
              padding: 20px !important;
            }
          }
        `}
      </style>
      
      <div style={styles.container} className="auth-container">
        {/* Left Sidebar - WhatsApp Branding */}
        <div style={styles.sidebar} className="auth-sidebar">
          <div style={styles.sidebarContent}>
            <div style={styles.logo}>💬</div>
            <h1 style={styles.sidebarTitle}>WhatsApp Clone</h1>
            <p style={styles.sidebarSubtitle}>
              Connect with friends and family through secure messaging, 
              voice calls, and video calls.
            </p>
          </div>
        </div>

        {/* Right Content - Auth Form */}
        <div style={styles.mainContent} className="auth-main">
          <div style={styles.authBox} className="auth-box">
            <div style={styles.header}>
              <h2 style={styles.title}>
                {isLoginMode ? 'Welcome back' : 'Create your account'}
              </h2>
              <p style={styles.subtitle}>
                {isLoginMode 
                  ? 'Sign in to continue to WhatsApp' 
                  : 'Join millions of users on WhatsApp'
                }
              </p>
            </div>

            {/* Display auth errors */}
            {authError && (
              <div style={styles.authError}>
                {authError}
              </div>
            )}

            <div style={styles.form}>
              {/* Name field - only for signup */}
              {!isLoginMode && (
                <div style={styles.inputGroup}>
                  <label style={styles.label} htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(errors.name ? styles.inputError : {})
                    }}
                    className="auth-input"
                    placeholder="Enter your full name"
                    disabled={isLoading}
                  />
                  {errors.name && <span style={styles.error}>{errors.name}</span>}
                </div>
              )}

              {/* Mobile number field */}
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="mobile">Mobile Number</label>
                <div style={styles.phoneContainer}>
                  <select 
                    style={styles.countrySelect}
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={isLoading}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                  </select>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    style={{
                      ...styles.phoneInput,
                      ...(errors.mobile ? styles.inputError : {})
                    }}
                    className="auth-input"
                    placeholder="Enter mobile number"
                    maxLength={10}
                    disabled={isLoading}
                  />
                </div>
                {errors.mobile && <span style={styles.error}>{errors.mobile}</span>}
              </div>

              {/* Password field */}
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="password">Password</label>
                <div style={styles.passwordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={{
                      ...styles.passwordInput,
                      ...(errors.password ? styles.inputError : {})
                    }}
                    className="auth-input"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <span 
                    style={styles.eyeIcon}
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </span>
                </div>
                {errors.password && <span style={styles.error}>{errors.password}</span>}
              </div>

              {/* Confirm Password field - only for signup */}
              {!isLoginMode && (
                <div style={styles.inputGroup}>
                  <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                  <div style={styles.passwordContainer}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      style={{
                        ...styles.passwordInput,
                        ...(errors.confirmPassword ? styles.inputError : {})
                      }}
                      className="auth-input"
                      placeholder="Confirm your password"
                      disabled={isLoading}
                    />
                    <span 
                      style={styles.eyeIcon}
                      className="eye-icon"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </span>
                  </div>
                  {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  ...styles.button,
                  ...(isLoading ? styles.buttonDisabled : {})
                }}
                className="auth-button"
              >
                {isLoading ? (
                  <>
                    <span style={styles.loadingSpinner}></span>
                    {isLoginMode ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  isLoginMode ? 'Sign In' : 'Create Account'
                )}
              </button>
            </div>

            <div style={styles.toggleContainer}>
              <p style={styles.toggleText}>
                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                <span
                  style={styles.toggleButton}
                  onClick={toggleAuthMode}
                >
                  {isLoginMode ? 'Sign Up' : 'Sign In'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthScreen;