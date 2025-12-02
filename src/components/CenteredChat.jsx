import { useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const CenteredChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatAreaRef = useRef(null);

  // Responsive placeholder text
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const isVerySmallScreen = useMediaQuery({ query: '(max-width: 400px)' });

  const getPlaceholder = () => {
    if (isVerySmallScreen) return 'Ask about Gaiytri...';
    if (isSmallScreen) return 'Ask me about Gaiytri...';
    return 'Ask me anything about Gaiytri - our services, team, pricing, or mission...';
  };

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const question = inputValue; // Store before clearing
    setInputValue('');
    setIsLoading(true);

    try {
      // Build chat history for context
      const chatHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      // Use streaming endpoint
      const response = await fetch(`${API_URL}/ask/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          chat_history: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      // Read streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let botMessageAdded = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.done) {
                // Streaming complete
                break;
              }

              if (data.content) {
                accumulatedText += data.content;
                console.log('Streaming chunk:', data.content, 'Total:', accumulatedText);

                // Add bot message on first chunk only
                if (!botMessageAdded) {
                  flushSync(() => {
                    const botMessage = {
                      type: 'bot',
                      text: accumulatedText,
                      timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, botMessage]);
                  });
                  botMessageAdded = true;
                } else {
                  // Update existing bot message immediately with flushSync
                  flushSync(() => {
                    setMessages((prev) => {
                      const newMessages = [...prev];
                      const lastIndex = newMessages.length - 1;
                      newMessages[lastIndex] = {
                        ...newMessages[lastIndex],
                        text: accumulatedText,
                        timestamp: newMessages[lastIndex].timestamp // Keep original timestamp
                      };
                      return newMessages;
                    });
                  });
                }

                // Force browser to paint by yielding control (20ms delay for visible streaming)
                await new Promise(resolve => setTimeout(resolve, 20));
              }

              if (data.error) {
                console.error('Error in streaming:', data.content);
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }

      setIsLoading(false);

    } catch (error) {
      console.error('Error in handleSend:', error);
      const errorMessage = {
        type: 'bot',
        text: 'Sorry, I\'m having trouble connecting. Please make sure the API server is running.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container} className="chat-container">
      <div style={styles.chatWrapper}>

        {/* Dynamic Height Chat Area */}
        <div
          ref={chatAreaRef}
          className="chat-messages-area"
          style={{
            ...styles.chatArea,
            maxHeight: '400px',
            height: 'auto',
            padding: '1rem',
            display: messages.length === 0 ? 'none' : 'flex',
          }}
        >
          {/* Messages Container */}
          {messages.length > 0 && (
            <div style={styles.messagesContainer}>
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={styles.messageRow}
                >
                  {message.type === 'bot' && (
                    <div style={styles.avatarBot}>
                      <img src="/bot-icon.png" alt="Gaiytri" style={styles.avatarIcon} />
                    </div>
                  )}

                  <div style={{
                    ...styles.messageContent,
                    ...(message.type === 'user' ? styles.userMessageContent : styles.botMessageContent)
                  }}>
                    <div style={styles.messageText}>{message.text}</div>
                  </div>

                  {message.type === 'user' && (
                    <div style={styles.avatarUser}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles.messageRow}
              >
                <div style={styles.avatarBot}>
                  <img src="/bot-icon.png" alt="Gaiytri" style={styles.avatarIcon} />
                </div>
                <div style={styles.botMessageContent}>
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
          )}
        </div>

        {/* Input Section */}
        <div style={styles.inputSection}>
          <form onSubmit={handleSendMessage} style={styles.inputForm}>
            <div style={styles.inputWrapper} className="chat-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={getPlaceholder()}
                style={styles.input}
                className="chat-input"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="chat-send-button"
                style={{
                  ...styles.sendButton,
                  opacity: !inputValue.trim() || isLoading ? 0.5 : 1,
                  cursor: !inputValue.trim() || isLoading ? 'not-allowed' : 'pointer',
                }}
                disabled={!inputValue.trim() || isLoading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0 clamp(0.75rem, 2vw, 1.5rem)',
  },

  chatWrapper: {
    width: '100%',
    maxWidth: '850px',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
  },

  chatArea: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0 1rem',
    scrollBehavior: 'smooth',
    transition: 'all 0.3s ease',
    backgroundColor:'rgba(0,0,0,0.8)',
    borderRadius:'10px'
  },

  // Welcome Section
  welcomeSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem',
  },

  welcomeTitle: {
    fontSize: '2.2rem',
    fontWeight: '500',
    color: '#E9EAE8',
    margin: '0 0 0.75rem 0',
    fontFamily: 'Poppins, sans-serif',
  },

  welcomeSubtitle: {
    fontSize: '1rem',
    color: 'rgba(233, 234, 232, 0.6)',
    maxWidth: '600px',
    lineHeight: '1.5',
    margin: 0,
  },

  // Messages Section
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '0.5rem',
  },

  messageRow: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
    width: '100%',
  },

  avatarBot: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: '#02E673',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },

  avatarIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  avatarUser: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: '#02E673',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  messageContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  botMessageContent: {
    alignItems: 'flex-start',
  },

  userMessageContent: {
    alignItems: 'flex-end',
  },

  messageText: {
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
    lineHeight: '1.6',
    color: '#E9EAE8',
    backgroundColor: 'rgba(17, 17, 17, 0.9)',
    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.25rem)',
    borderRadius: '12px',
    border: '1px solid rgba(2, 230, 115, 0.25)',
    maxWidth: '100%',
    wordWrap: 'break-word',
  },

  typingIndicator: {
    display: 'flex',
    gap: '6px',
    padding: '1rem 1.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(2, 230, 115, 0.15)',
  },

  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#02E673',
    animation: 'bounce 1.4s infinite ease-in-out',
  },

  // Input Section
  inputSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
    alignItems: 'center',
  },

  inputForm: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(0.4rem, 1.5vw, 0.75rem)',
    width: '100%',
    maxWidth: '750px',
    margin: '0 auto',
    padding: '1rem',
    backgroundColor: '#000000',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: 'clamp(14px, 3.5vw, 22px)',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box',
  },

  input: {
    flex: 1,
    padding: 'clamp(0.25rem, 1vw, 0.4rem)',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#FFFFFF',
    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
    outline: 'none',
    fontFamily: 'Poppins, sans-serif',
    '::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
  },

  sendButton: {
    padding: 'clamp(0.4rem, 1.5vw, 0.6rem)',
    width: 'clamp(36px, 8vw, 42px)',
    height: 'clamp(36px, 8vw, 42px)',
    backgroundColor: '#02E673',
    color: '#000000',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },

  disclaimer: {
    fontSize: '0.85rem',
    color: 'rgba(233, 234, 232, 0.5)',
    textAlign: 'center',
    margin: 0,
  },

  suggestionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    maxWidth: '850px',
    marginTop: '1rem',
  },

  suggestionsLabel: {
    fontSize: '0.9rem',
    color: 'rgba(233, 234, 232, 0.6)',
    margin: 0,
  },

  suggestionsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    justifyContent: 'center',
  },

  suggestionChip: {
    padding: '0.6rem 1.2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(2, 230, 115, 0.3)',
    borderRadius: '20px',
    color: '#E9EAE8',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'Poppins, sans-serif',
  },
};

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes bounce {
    0%, 60%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-8px);
    }
  }

  /* Stagger animation for typing dots */
  div[style*="typingIndicator"] span:nth-child(1) {
    animation-delay: 0s;
  }
  div[style*="typingIndicator"] span:nth-child(2) {
    animation-delay: 0.2s;
  }
  div[style*="typingIndicator"] span:nth-child(3) {
    animation-delay: 0.4s;
  }

  /* Custom scrollbar for chat area */
  div[style*="chatArea"]::-webkit-scrollbar {
    width: 8px;
  }

  div[style*="chatArea"]::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }

  div[style*="chatArea"]::-webkit-scrollbar-thumb {
    background: rgba(2, 230, 115, 0.3);
    border-radius: 10px;
  }

  div[style*="chatArea"]::-webkit-scrollbar-thumb:hover {
    background: rgba(2, 230, 115, 0.5);
  }

  /* Input focus effect */
  div[style*="inputWrapper"]:focus-within {
    border-color: #02E673 !important;
    box-shadow: 0 0 0 3px rgba(2, 230, 115, 0.1);
  }

  /* Suggestion chip hover */
  button[style*="suggestionChip"]:hover {
    background-color: rgba(2, 230, 115, 0.1) !important;
    border-color: #02E673 !important;
  }

  /* Mobile responsive - under 768px */
  @media (max-width: 768px) {
    .chat-container {
      padding: 0 1rem !important;
    }

    .chat-messages-area {
      max-height: 350px !important;
      height: auto !important;
    }

    .chat-input-wrapper {
      max-width: 90% !important;
      margin: 0 auto !important;
      padding: 0.4rem 0.6rem !important;
      gap: 0.35rem !important;
      border-radius: 12px !important;
    }

    .chat-input {
      font-size: 0.85rem !important;
      padding: 0.25rem !important;
    }

    .chat-send-button {
      width: 34px !important;
      height: 34px !important;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) {
   .chat-messages-area {
      max-height: 380px !important;
      height: auto !important;
    }
  }
  /* Small mobile - under 480px */
  @media (max-width: 480px) {
    .chat-container {
      padding: 0 0.75rem !important;
    }

    .chat-messages-area {
      max-height: 300px !important;
      height: auto !important;
      padding: 0.5rem !important;
    }

    /* Message bubbles - more compact */
    div[style*="messagesContainer"] {
      gap: 0.75rem !important;
      padding: 0.25rem !important;
    }

    div[style*="messageRow"] {
      gap: 0.5rem !important;
    }

    div[style*="avatarBot"], div[style*="avatarUser"] {
      width: 28px !important;
      height: 28px !important;
      border-radius: 6px !important;
    }

    div[style*="messageText"] {
      font-size: 0.85rem !important;
      line-height: 1.5 !important;
      padding: 0.5rem 0.75rem !important;
      border-radius: 8px !important;
    }

    .chat-input-wrapper {
      max-width: 95% !important;
      margin: 0 auto !important;
      padding: 0.35rem 0.5rem !important;
      gap: 0.3rem !important;
      border-radius: 10px !important;
    }

    .chat-input {
      font-size: 0.8rem !important;
      padding: 0.2rem !important;
    }

    .chat-send-button {
      width: 32px !important;
      height: 32px !important;
    }
  }

  /* Very small mobile - under 360px */
  @media (max-width: 360px) {
    .chat-container {
      padding: 0 0.6rem !important;
    }

    .chat-messages-area {
      max-height: 250px !important;
      height: auto !important;
      padding: 0.4rem !important;
    }

    /* Message bubbles - extra compact */
    div[style*="messagesContainer"] {
      gap: 0.6rem !important;
      padding: 0.2rem !important;
    }

    div[style*="messageRow"] {
      gap: 0.4rem !important;
    }

    div[style*="avatarBot"], div[style*="avatarUser"] {
      width: 24px !important;
      height: 24px !important;
      border-radius: 5px !important;
    }

    div[style*="messageText"] {
      font-size: 0.8rem !important;
      line-height: 1.4 !important;
      padding: 0.4rem 0.6rem !important;
      border-radius: 6px !important;
    }

    .chat-input-wrapper {
      max-width: 95% !important;
      margin: 0 auto !important;
      padding: 0.3rem 0.45rem !important;
      gap: 0.25rem !important;
    }

    .chat-input {
      font-size: 0.75rem !important;
      padding: 0.15rem !important;
    }

    .chat-send-button {
      width: 30px !important;
      height: 30px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default CenteredChat;
