import { createContext, useContext, useState } from 'react';
import Toast from './Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={styles.toastWrapper}>
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            style={{
              ...styles.toastPosition,
              top: `${2 + index * 5.5}rem`,
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const styles = {
  toastWrapper: {
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 10000,
    pointerEvents: 'none',
  },
  toastPosition: {
    position: 'absolute',
    right: 0,
    pointerEvents: 'auto',
    transition: 'top 0.3s ease',
  },
};
