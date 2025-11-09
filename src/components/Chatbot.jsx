import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! I\'m the Gaiytri AI assistant. Ask me anything about our company, services, or team!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const botMessage = {
        type: 'bot',
        text: data.success ? data.answer : data.error || 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        text: 'Sorry, I\'m having trouble connecting. Please make sure the API server is running.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    'What services does Gaiytri offer?',
    'Who are the founders?',
    'What is your pricing?',
    'How can I contact you?',
  ];

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.toggleButton}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={styles.chatWindow}
          >
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.headerContent}>
                <div style={styles.statusIndicator} />
                <div>
                  <h3 style={styles.headerTitle}>Gaiytri AI Assistant</h3>
                  <p style={styles.headerSubtitle}>Powered by RAG</p>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div style={styles.messagesContainer}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    ...styles.messageWrapper,
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      ...styles.message,
                      ...(message.type === 'user' ? styles.userMessage : styles.botMessage),
                    }}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={styles.messageWrapper}
                >
                  <div style={{ ...styles.message, ...styles.botMessage }}>
                    <div style={styles.typingIndicator}>
                      <span style={styles.dot} />
                      <span style={styles.dot} />
                      <span style={styles.dot} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div style={styles.suggestedContainer}>
                <p style={styles.suggestedTitle}>Try asking:</p>
                <div style={styles.suggestedGrid}>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      style={styles.suggestedButton}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(2, 230, 115, 0.15)';
                        e.target.style.borderColor = '#02E673';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                        e.target.style.borderColor = 'rgba(2, 230, 115, 0.3)';
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSendMessage} style={styles.inputForm}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about Gaiytri..."
                style={styles.input}
                disabled={isLoading}
              />
              <button
                type="submit"
                style={{
                  ...styles.sendButton,
                  opacity: !inputValue.trim() || isLoading ? 0.5 : 1,
                }}
                disabled={!inputValue.trim() || isLoading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const styles = {
  toggleButton: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    width: 'clamp(48px, 12vw, 56px)',
    height: 'clamp(48px, 12vw, 56px)',
    borderRadius: '50%',
    backgroundColor: '#02E673',
    color: '#111111',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(2, 230, 115, 0.4)',
    zIndex: 1000,
    transition: 'all 0.3s ease',
  },

  chatWindow: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(17, 17, 17, 0.98)',
    backdropFilter: 'blur(20px)',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 999,
    '@media (min-width: 768px)': {
      bottom: '5rem',
      right: '1.5rem',
      left: 'auto',
      top: 'auto',
      width: '400px',
      height: '600px',
      border: '1px solid rgba(2, 230, 115, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(2, 230, 115, 0.1)',
    },
  },

  header: {
    padding: '20px',
    background: 'linear-gradient(135deg, rgba(2, 230, 115, 0.1) 0%, rgba(0, 46, 37, 0.2) 100%)',
    borderBottom: '1px solid rgba(2, 230, 115, 0.2)',
  },

  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  statusIndicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#02E673',
    boxShadow: '0 0 10px rgba(2, 230, 115, 0.6)',
    animation: 'pulse 2s infinite',
  },

  headerTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#E9EAE8',
  },

  headerSubtitle: {
    margin: '2px 0 0 0',
    fontSize: '12px',
    color: 'rgba(233, 234, 232, 0.6)',
  },

  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    scrollBehavior: 'smooth',
  },

  messageWrapper: {
    display: 'flex',
    width: '100%',
  },

  message: {
    padding: '12px 16px',
    borderRadius: '12px',
    maxWidth: '80%',
    wordWrap: 'break-word',
    fontSize: '14px',
    lineHeight: '1.5',
  },

  userMessage: {
    backgroundColor: '#02E673',
    color: '#111111',
    borderBottomRightRadius: '4px',
    marginLeft: 'auto',
  },

  botMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#E9EAE8',
    border: '1px solid rgba(2, 230, 115, 0.2)',
    borderBottomLeftRadius: '4px',
  },

  typingIndicator: {
    display: 'flex',
    gap: '4px',
  },

  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#02E673',
    animation: 'bounce 1.4s infinite ease-in-out',
  },

  suggestedContainer: {
    padding: '0 20px 16px',
    borderTop: '1px solid rgba(2, 230, 115, 0.1)',
  },

  suggestedTitle: {
    margin: '12px 0 8px 0',
    fontSize: '12px',
    color: 'rgba(233, 234, 232, 0.6)',
    fontWeight: '500',
  },

  suggestedGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },

  suggestedButton: {
    padding: '8px 12px',
    fontSize: '11px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#E9EAE8',
    border: '1px solid rgba(2, 230, 115, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
  },

  inputForm: {
    padding: '20px',
    borderTop: '1px solid rgba(2, 230, 115, 0.2)',
    display: 'flex',
    gap: '12px',
  },

  input: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(2, 230, 115, 0.3)',
    borderRadius: '12px',
    color: '#E9EAE8',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
  },

  sendButton: {
    padding: '12px 16px',
    backgroundColor: '#02E673',
    color: '#111111',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
};

// Add keyframe animations and responsive styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-10px); }
  }

  @keyframes bounce:nth-child(2) {
    animation-delay: 0.2s;
  }

  @keyframes bounce:nth-child(3) {
    animation-delay: 0.4s;
  }

  /* Custom scrollbar for messages */
  div[style*="messagesContainer"]::-webkit-scrollbar {
    width: 6px;
  }

  div[style*="messagesContainer"]::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }

  div[style*="messagesContainer"]::-webkit-scrollbar-thumb {
    background: rgba(2, 230, 115, 0.3);
    border-radius: 10px;
  }

  div[style*="messagesContainer"]::-webkit-scrollbar-thumb:hover {
    background: rgba(2, 230, 115, 0.5);
  }

  /* Mobile responsiveness for chat window */
  @media (min-width: 768px) {
    div[style*="chatWindow"] {
      bottom: 5rem !important;
      right: 1.5rem !important;
      left: auto !important;
      top: auto !important;
      width: 400px !important;
      height: 600px !important;
      border: 1px solid rgba(2, 230, 115, 0.2) !important;
      borderRadius: 16px !important;
      boxShadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(2, 230, 115, 0.1) !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Chatbot;
