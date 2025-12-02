import logo from '../assets/logo.svg';

const Footer = ({ onProductsClick, onServicesClick }) => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Column 1: Logo + Follow Us + Socials */}
        <div style={styles.column1}>
          <div style={styles.logoSection}>
            <img src={logo} alt="Gaiytri Logo" style={styles.logoImage} />
            <span style={styles.companyName}>Gaiytri</span>
          </div>
          <h3 style={styles.followUsHeading}>FOLLOW US</h3>
          <div style={styles.socials}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.46 6c-.85.38-1.78.64-2.75.76a4.83 4.83 0 0 0 2.11-2.65c-.93.55-1.96.95-3.06 1.17a4.82 4.82 0 0 0-8.21 4.4A13.68 13.68 0 0 1 3.39 4.62a4.82 4.82 0 0 0 1.49 6.43 4.76 4.76 0 0 1-2.18-.6v.06a4.82 4.82 0 0 0 3.86 4.73 4.83 4.83 0 0 1-2.18.08 4.82 4.82 0 0 0 4.5 3.35A9.67 9.67 0 0 1 2 19.54a13.63 13.63 0 0 0 7.4 2.17c8.88 0 13.73-7.36 13.73-13.74 0-.21 0-.42-.01-.62A9.8 9.8 0 0 0 24 4.56a9.6 9.6 0 0 0-1.54.42z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: About Us */}
        <div style={styles.column2}>
          <h3 style={styles.sectionHeading}>ABOUT US</h3>
          <ul style={styles.linkList}>
            <li><a href="#" style={styles.link}>Our Story</a></li>
            <li><a href="#" style={styles.link}>Team</a></li>
            <li><a href="#" style={styles.link}>Careers</a></li>
          </ul>
        </div>

        {/* Column 3: Products, Services, Trust & Security */}
        <div style={styles.column3}>
          <div style={styles.section}>
            <h3
              style={styles.clickableHeading}
              onClick={onProductsClick}
            >
              PRODUCTS
            </h3>
            <h3
              style={styles.clickableHeading}
              onClick={onServicesClick}
            >
              SERVICES
            </h3>
            <h3 style={styles.sectionHeading}>TRUST & SECURITY</h3>
            <ul style={styles.linkList}>
              <li><a href="#" style={styles.link}>Privacy Policy</a></li>
              <li><a href="#" style={styles.link}>Terms of Service</a></li>
              <li><a href="#" style={styles.link}>Security</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={styles.copyright}>
        © {new Date().getFullYear()} Gaiytri LLC. All rights reserved.
      </div>

      <style>
        {`
          /* Hover effects */
          a[style*="socialIcon"]:hover {
            color: #02E673 !important;
          }

          a[style*="link"]:hover {
            color: #02E673 !important;
          }

          h3[style*="clickableHeading"]:hover {
            color: #02E673 !important;
          }

          /* Mobile responsive - 2 column layout */
          @media (max-width: 480px) {
            div[style*="container"] {
              grid-template-columns: 1fr 1fr !important;
            }

            div[style*="column2"],
            div[style*="column3"] {
              grid-column: 2 !important;
            }

            div[style*="column1"] {
              grid-row: 1 / 5 !important;
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
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 'clamp(2rem, 5vw, 4rem)',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 clamp(1.5rem, 5vw, 3rem)',
    marginBottom: 'clamp(2rem, 4vh, 3rem)',
  },
  column1: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
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
  followUsHeading: {
    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
    fontWeight: '600',
    letterSpacing: '2px',
    color: '#E9EAE8',
    marginTop: '1rem',
    marginBottom: '0.5rem',
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
    gap: '1rem',
  },
  column3: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  section: {
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
  clickableHeading: {
    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
    fontWeight: '600',
    letterSpacing: '2px',
    color: '#E9EAE8',
    marginBottom: '0',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    userSelect: 'none',
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
    userSelect: 'none',
  },
  copyright: {
    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
    color: 'rgba(233, 234, 232, 0.5)',
    textAlign: 'center',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: 'clamp(1.5rem, 3vh, 2rem)',
    marginTop: 'clamp(2rem, 4vh, 3rem)',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'clamp(1.5rem, 3vh, 2rem) clamp(1.5rem, 5vw, 3rem) 0',
  },
};

export default Footer;
