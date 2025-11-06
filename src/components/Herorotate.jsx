import React from 'react';

const words = ['automate', 'optimize', 'scale', 'evolve'];

export default function HeroRotate() {
  return (
    <div style={styles.heroSection}>
      <h1 style={styles.heroHeader}>
        Empowering businesses to{' '}
        <span style={styles.wordRotateContainer}>
          {words.map((word, i) => (
            <span
              key={i}
              style={{
                ...styles.wordRotateItem,
                animationDelay: `${i * 3}s`,
              }}
            >
              {word}
            </span>
          ))}
        </span>
      </h1>
      <p style={styles.heroSubheader}>
        With Gaiytri, automation meets insight — transforming everyday tasks into effortless workflows that save time and boost revenue.
      </p>
    </div>
  );
}

const styles = {
  heroSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '4rem 2rem',
    textAlign: 'center',
    color: '#E9EAE8',
    fontFamily: 'Poppins, sans-serif',
  },
  heroHeader: {
    fontSize: '2.5rem',
    fontWeight: '600',
    lineHeight: '1.2',
  },
  heroSubheader: {
    fontSize: '1.2rem',
    maxWidth: '600px',
    lineHeight: '1.6',
    color: '#B0B0B0',
  },
  wordRotateContainer: {
    display: 'inline-block',
    position: 'relative',
    width: '8ch',
    height: '1.5em',
    overflow: 'hidden',
  },
  wordRotateItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    animation: 'fadeWord 12s infinite',
    fontWeight: '700',
    color: '#FF55B8',
  },
};

// Add this in your global CSS or inject with JS-in-CSS:
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes fadeWord {
  0% { opacity: 0; transform: translateY(100%); }
  5% { opacity: 1; transform: translateY(0); }
  25% { opacity: 1; transform: translateY(0); }
  30% { opacity: 0; transform: translateY(-100%); }
  100% { opacity: 0; }
}`, styleSheet.cssRules.length);