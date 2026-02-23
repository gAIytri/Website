import { useState, useEffect } from 'react';
import CenteredChat from './CenteredChat';
import phaseTraditional from '../assets/phase-traditional.png';
import phaseHybrid from '../assets/phase-hybrid.png';
import phaseAI from '../assets/phase-ai.png';

const heroStyleSheet = document.createElement('style');
heroStyleSheet.textContent = `
  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateX(-20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .rotating-word-animated {
    animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero-section {
    position: relative;
    overflow: hidden;
  }

  @media (max-width: 600px) {
    .hero-content-area {
      padding-top: 18vh !important;
    }
  }
`;
if (!document.head.querySelector('style[data-hero-responsive]')) {
  heroStyleSheet.setAttribute('data-hero-responsive', 'true');
  document.head.appendChild(heroStyleSheet);
}

const phases = [
  { image: phaseTraditional, label: 'Traditional', desc: 'Manual processes' },
  { image: phaseHybrid, label: 'Hybrid', desc: 'Digital tools' },
  { image: phaseAI, label: 'AI Powered', desc: 'Intelligent systems' },
];

const styles = {
  heroSection: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    paddingBottom: 'clamp(3rem, 8vh, 5rem)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  centerArea: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 clamp(1rem, 5vw, 2rem)',
    transition: 'all 0.3s ease',
  },
  heroHeading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 'clamp(1.8rem, 5vw, 4.5rem)',
    fontFamily: 'Poppins, sans-serif',
    color: '#E9EAE8',
    margin: 0,
    lineHeight: '1',
  },
  rotatingWordContainer: {
    display: 'inline-block',
    minWidth: 'clamp(140px, 20vw, 200px)',
    textAlign: 'center',
    verticalAlign: 'baseline',
  },
  rotatingWord: {
    display: 'inline-block',
    color: '#02E673',
    fontWeight: 600,
  },
  subtext: {
    fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
    fontWeight: 300,
    textAlign: 'center',
    opacity: 0.85,
    padding: '0 clamp(1rem, 4vw, 2rem)',
    lineHeight: '1.6',
    maxWidth: '750px',
    margin: '0 auto',
    marginTop: 'clamp(0.5rem, 1.5vh, 1rem)',
  },
  chatSection: {
    paddingBottom: '1rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '1rem',
  },
  // Progression row
  progressionRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0',
    marginTop: 'clamp(0.75rem, 1.5vh, 1rem)',
    padding: '0 clamp(0.5rem, 2vw, 1rem)',
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  phaseBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.4rem',
  },
  phaseImgThumb: {
    width: 'clamp(120px, 25vw, 400px)',
    height: 'clamp(120px, 25vw, 400px)',
    borderRadius: '10px',
    objectFit: 'cover',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  phaseLabel: {
    fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)',
    fontWeight: 600,
    color: '#02E673',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
  },
  phaseDesc: {
    fontSize: 'clamp(0.5rem, 1vw, 0.65rem)',
    color: 'rgba(233, 234, 232, 0.6)',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
  },
  arrow: {
    color: '#02E673',
    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    padding: '0 clamp(0.5rem, 1.5vw, 1rem)',
    lineHeight: 1,
    marginBottom: '1.5rem',
    fontFamily: 'Poppins, sans-serif',
  },
};

const Hero = () => {
  const words = ['to automate', 'to optimize', 'to evolve', 'to scale'];
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section" style={styles.heroSection}>
      <div className="hero-content-area" style={styles.heroContent}>
        <div style={styles.centerArea}>
          <div style={styles.headerSection}>
            <h1 style={styles.heroHeading}>
              Empowering you
              <br />
              <span style={styles.rotatingWordContainer}>
                <span
                  key={currentWord}
                  className="rotating-word-animated"
                  style={styles.rotatingWord}
                >
                  {currentWord}
                </span>
              </span>
            </h1>
            <p style={styles.subtext}>
              Gaiytri builds intelligent systems that simplify your work,
              eliminate manual effort, and enable smarter growth for everyone
            </p>
          </div>

          {/* AI Chat Section */}
          <div style={styles.chatSection}>
            <CenteredChat />
          </div>
        </div>

        {/* 3-Phase Progression: image → arrow → image → arrow → image */}
        <div style={styles.progressionRow}>
          {phases.map((phase, index) => (
            <div key={phase.label} style={{ display: 'contents' }}>
              {index > 0 && <span style={styles.arrow}>→</span>}
              <div style={styles.phaseBlock}>
                <img
                  className="phase-img-thumb"
                  src={phase.image}
                  alt={phase.label}
                  style={styles.phaseImgThumb}
                />
                <span style={styles.phaseLabel}>{phase.label}</span>
                <span style={styles.phaseDesc}>{phase.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
