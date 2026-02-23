import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoWordmark.svg';

// Add responsive navbar styles
const navbarStyleSheet = document.createElement('style');
navbarStyleSheet.textContent = `
  /* Extra small mobile screens */
@media (max-width: 768px) {

 .responsive-navbar {
      height: 58px !important;
    }
       .responsive-navbar img {
      height: 24px !important;
    }


}


  @media (max-width: 480px) {
    .responsive-navbar {
      height: 48px !important;
    }

    .responsive-navbar img {
      height: 24px !important;
    }

    .mobile-dropdown-menu {
      top: 48px !important;
    }
  }

  /* Very small mobile screens */
  @media (max-width: 360px) {
    .responsive-navbar {
      height: 44px !important;
      padding: 0 0.75rem !important;
    }

    .responsive-navbar img {
      height: 22px !important;
    }

    .mobile-dropdown-menu {
      top: 44px !important;
      min-width: 140px !important;
    }
  }
`;
if (!document.head.querySelector('style[data-navbar-responsive]')) {
  navbarStyleSheet.setAttribute('data-navbar-responsive', 'true');
  document.head.appendChild(navbarStyleSheet);
}

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: 'clamp(52px, 8vh, 72px)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 clamp(1rem, 3vw, 2rem)',
    zIndex: 1000,
    backgroundColor: 'transparent',
    backdropFilter: 'blur(3px)',
    boxSizing: 'border-box',
    fontFamily: 'Poppins, sans-serif',
    transition: 'height 0.3s ease, padding 0.3s ease',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',

    flex: 1,
  },
  logoImage: {
    height: 'clamp(28px, 5vh, 40px)',
    width: 'auto',
    transition: 'height 0.3s ease',
  },
  logoText: {
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    fontWeight: 'bold',
    color: '#E9EAE8',
  },
  link: {
    color: '#E9EAE8',
    textDecoration: 'none',
    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  centerContainer: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 'clamp(1.5rem, 3vw, 2rem)',
    alignItems: 'center',
  },
  sectionRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    overflow: 'hidden',
  },
  hamburgerButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 'clamp(4px, 1.5vw, 8px)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(3px, 1vw, 5px)',
    zIndex: 1001,
  },
  hamburgerLine: {
    width: 'clamp(20px, 4vw, 25px)',
    height: '2px',
    backgroundColor: '#E9EAE8',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 'clamp(52px, 8vh, 72px)',
    right: '1rem',
    backgroundColor: '#000000',
    border: '1px solid rgba(233, 234, 232, 0.1)',
    borderRadius: '8px',
    padding: 'clamp(0.75rem, 2vw, 1rem) 0',
    minWidth: 'clamp(150px, 30vw, 180px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  dropdownItem: {
    color: '#E9EAE8',
    textDecoration: 'none',
    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
    fontWeight: 500,
    padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
    display: 'block',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
  },
  dropdownItemHover: {
    backgroundColor: 'rgba(2, 230, 115, 0.1)',
  },
};
const Navbar = ({ onServicesClick, onAboutClick, onContactClick }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 510px)' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (callback) => {
    callback?.();
    setIsMenuOpen(false);
  };

  return (
    <nav className="responsive-navbar" style={styles.navbar}>
      {/* Left: Logo and Name */}
      <div style={styles.logoContainer}>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }}>
          <img src={logo} alt="Gaiytri Logo" style={styles.logoImage} />
        </a>
      </div>

      {/* Center: Products and Services (Desktop only) */}
      <AnimatePresence mode="wait">
        {!isMobile && (
          <motion.div
            key="center-tabs"
            style={styles.centerContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href="#"
              style={styles.link}
              onClick={(e) => {
                e.preventDefault();
                onServicesClick?.();
              }}
            >
              Services
            </a>
            <a
              href="#"
              style={styles.link}
              onClick={(e) => {
                e.preventDefault();
                onAboutClick?.();
              }}
            >
              About
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right: Contact Us (Desktop) / Hamburger Menu (Mobile) */}
      <div style={styles.sectionRight}>
        <AnimatePresence mode="wait">
          {!isMobile ? (
            <motion.div
              key="contact-us"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="#"
                style={styles.link}
                onClick={(e) => {
                  e.preventDefault();
                  onContactClick?.();
                }}
              >
                Contact Us
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="hamburger-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={toggleMenu}
                style={styles.hamburgerButton}
                aria-label="Menu"
              >
                <span style={styles.hamburgerLine}></span>
                <span style={styles.hamburgerLine}></span>
                <span style={styles.hamburgerLine}></span>
              </button>

              {/* Mobile Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    className="mobile-dropdown-menu"
                    style={styles.dropdownMenu}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href="#"
                      style={{
                        ...styles.dropdownItem,
                        ...(hoveredItem === 'services' ? styles.dropdownItemHover : {}),
                      }}
                      onMouseEnter={() => setHoveredItem('services')}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuItemClick(onServicesClick);
                      }}
                    >
                      Services
                    </a>
                    <a
                      href="#"
                      style={{
                        ...styles.dropdownItem,
                        ...(hoveredItem === 'about' ? styles.dropdownItemHover : {}),
                      }}
                      onMouseEnter={() => setHoveredItem('about')}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuItemClick(onAboutClick);
                      }}
                    >
                      About
                    </a>
                    <a
                      href="#"
                      style={{
                        ...styles.dropdownItem,
                        ...(hoveredItem === 'contact' ? styles.dropdownItemHover : {}),
                      }}
                      onMouseEnter={() => setHoveredItem('contact')}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuItemClick(onContactClick);
                      }}
                    >
                      Contact Us
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
export default Navbar;