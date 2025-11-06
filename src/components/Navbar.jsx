import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logoWordmark.svg';

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 2rem',
    zIndex: 1000,
    backgroundColor: 'transparent',
    backdropFilter: 'blur(4px)',
    boxSizing: 'border-box',
    fontFamily: 'Poppins, sans-serif',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1,
  },
  logoImage: {
    height: '40px',
    width: 'auto',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#E9EAE8',
  },
  link: {
    color: '#E9EAE8',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
  },
  centerAbsolute: {
    position: 'absolute',
    left: '46%',
    transform: 'translateX(-50%)',
  },
  sectionRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    overflow: 'hidden',
  },
};
const Navbar = ({ onComingSoonClick, onAboutUsClick }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Gaiytri Logo" style={styles.logoImage} />
      </div>

      <AnimatePresence mode="wait">
        {!isMobile && (
          <motion.div
            key="coming-center"
            style={styles.centerAbsolute}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#"
              style={styles.link}
              onClick={(e) => {
                e.preventDefault();
                onComingSoonClick?.(); // 👈 scroll handler
              }}
            >
              Coming Soon
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={styles.sectionRight}>
        <AnimatePresence mode="wait">
          {!isMobile ? (
            <motion.div key="about-us" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <a
            href="#"
            style={styles.link}
            onClick={(e) => {
              e.preventDefault();
              onAboutUsClick?.();
            }}
          >
            About Us
          </a>
            </motion.div>
          ) : (
            <motion.div
              key="coming-right"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <a
                href="#"
                style={styles.link}
                onClick={(e) => {
                  e.preventDefault();
                  onComingSoonClick?.();
                }}
              >
                Coming Soon
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
export default Navbar;