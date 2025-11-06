import React from 'react';
import logo from '../assets/logo.svg';

const styles = {
  footer: {
    backgroundColor: '#111111',
    color: '#E9EAE8',
    padding: '3rem 2rem 1rem',
    fontFamily: 'Poppins, sans-serif',
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: '2rem',
  },
  logoImage: {
    height: '48px',
    width: 'auto',
    objectFit: 'contain',
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem',
  },
  link: {
    color: '#E9EAE8',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  separator: {
    borderTop: '1px solid #2a2a2a',
    margin: '1.5rem 0',
  },
  bottomSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  socials: {
    display: 'flex',
    gap: '1.5rem',
  },
  socialIcon: {
    fontSize: '1.2rem',
    color: '#E9EAE8',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  copyright: {
    fontSize: '0.85rem',
    color: '#888',
    textAlign: 'center',
  },
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Top Section */}
      <div style={styles.topSection}>
        {/* Left: Logo only */}
        <img src={logo} alt="Gaiytri Logo" style={styles.logoImage} />

        {/* Right: 3 Links in column */}
        <div style={styles.linkColumn}>
          <a href="#" style={styles.link}>Coming Soon</a>
          <a href="#" style={styles.link}>About Us</a>
          <a href="#" style={styles.link}>Contact Us</a>
        </div>
      </div>

      {/* Divider */}
      <div style={styles.separator}></div>

      {/* Bottom Section */}
      <div style={styles.bottomSection}>
    
        <div style={styles.copyright}>
          © {new Date().getFullYear()} Gaiytri. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;