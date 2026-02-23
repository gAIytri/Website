import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Footer = ({ onServicesClick, onAboutClick }) => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Column 1: Logo + LinkedIn */}
        <div style={styles.column1}>
          <div style={styles.logoSection}>
            <img src={logo} alt="Gaiytri Logo" style={styles.logoImage} />
            <span style={styles.companyName}>Gaiytri</span>
          </div>
          <p style={styles.tagline}>Building Interactive AI Systems</p>
          <div style={styles.socials}>
            <a href="https://www.linkedin.com/company/gaiytri" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links + Trust & Security */}
        <div style={styles.column2}>
          <ul style={styles.linkList}>
            <li><a href="#" style={styles.link} onClick={(e) => { e.preventDefault(); onServicesClick?.(); }}>Services</a></li>
            <li><a href="#" style={styles.link} onClick={(e) => { e.preventDefault(); onAboutClick?.(); }}>About</a></li>
          </ul>
          <div style={styles.trustSection}>
            <h3 style={styles.sectionHeading}>TRUST & SECURITY</h3>
            <ul style={styles.linkList}>
              <li><Link to="/trust#privacy-policy" style={styles.link}>Privacy Policy</Link></li>
              <li><Link to="/trust#terms-of-service" style={styles.link}>Terms of Service</Link></li>
              <li><Link to="/trust#security" style={styles.link}>Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Column 3: Contact Info */}
        <div style={styles.column3}>
          <h3 style={styles.sectionHeading}>GET IN TOUCH</h3>
          <ul style={styles.linkList}>
            <li><a href="mailto:admin@gaiytri.com" style={styles.link}>admin@gaiytri.com</a></li>
            <li><a href="tel:+12017440373" style={styles.link}>+1 201 744 0373</a></li>
            <li><a href="tel:+14802418791" style={styles.link}>+1 480 241 8791</a></li>
            <li><span style={styles.locationText}>Jersey City, New Jersey</span></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div style={styles.copyright}>
        © {new Date().getFullYear()} Gaiytri LLC. All rights reserved.
      </div>

      <style>
        {`
          a[style*="socialIcon"]:hover {
            color: #02E673 !important;
          }

          a[style*="link"]:hover {
            color: #02E673 !important;
          }

          @media (max-width: 768px) {
            footer > div:first-child {
              grid-template-columns: 1fr 1fr !important;
            }
          }

          @media (max-width: 480px) {
            footer > div:first-child {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
              text-align: center;
            }
          }
        `}
      </style>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'transparent',
    color: '#E9EAE8',
    padding: 'clamp(3rem, 6vh, 5rem) 0 clamp(1.5rem, 3vh, 2rem)',
    fontFamily: 'Poppins, sans-serif',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr',
    gap: 'clamp(1.5rem, 4vw, 4rem)',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 5vw, 3rem)',
    marginBottom: 'clamp(2rem, 4vh, 3rem)',
    boxSizing: 'border-box',
  },
  column1: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoImage: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain',
  },
  companyName: {
    fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
    fontWeight: '600',
    color: '#E9EAE8',
  },
  tagline: {
    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
    color: 'rgba(233, 234, 232, 0.5)',
    margin: 0,
  },
  socials: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  socialIcon: {
    color: '#E9EAE8',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  column2: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  column3: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  trustSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  sectionHeading: {
    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
    fontWeight: '600',
    letterSpacing: '2px',
    color: '#E9EAE8',
    marginBottom: '0',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  link: {
    color: 'rgba(233, 234, 232, 0.7)',
    textDecoration: 'none',
    fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  locationText: {
    color: 'rgba(233, 234, 232, 0.5)',
    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
  },
  copyright: {
    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
    color: 'rgba(233, 234, 232, 0.5)',
    textAlign: 'center',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'clamp(1.5rem, 3vh, 2rem) clamp(1.5rem, 5vw, 3rem) 0',
  },
};

export default Footer;
