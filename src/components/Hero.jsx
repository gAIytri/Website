import React, { useState, useEffect } from 'react';
import CenteredChat from './CenteredChat';

// Add responsive video and animation styles
const heroStyleSheet = document.createElement('style');
heroStyleSheet.textContent = `
  /* Sliding word animation - from left */
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

  /* Apply animation to rotating word */
  .rotating-word-animated {
    animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hero-video-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    transition: all 0.3s ease;
    opacity: 0.8;
  }

  /* Ensure video container doesn't overflow */
  .hero-video-section {
    position: relative;
    overflow: hidden;
    transition: min-height 0.3s ease;
  }

  /* Mobile - Show full video without cropping */
  @media (max-width: 768px) {
    .hero-video-section {
      min-height: 35vh !important;
      padding-bottom: 1rem !important;
    }

    .hero-video-bg {
      object-position: center top;
    }

    /* Content should match video section height on mobile */
    .hero-content {
      min-height: 35vh !important;
      justify-content: flex-start !important;
      padding-top: 20vh !important;
    }
  }

  /* Very small mobile screens */
  @media (max-width: 480px) {
    .hero-video-section {
      min-height: 30vh !important;
      padding-bottom: 1rem !important;
    }

    /* Content should match video section height */
    .hero-content {
      min-height: 30vh !important;
      justify-content: flex-start !important;
      padding-top: 18vh !important;
    }
  }

  /* Landscape mobile phones */
  

  /* Portrait tablets - keep cover for better look */
  @media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) {
    .hero-video-section {
      min-height: 80vh !important;
    }

    .hero-video-bg {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Content should match video section height on tablet */
    .hero-content {
      min-height: 70vh !important;
    }
  }

  /* Desktop - full cover */
  @media (min-width: 1025px) {
    .hero-video-bg {
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
    }
  }
`;
if (!document.head.querySelector('style[data-hero-responsive]')) {
  heroStyleSheet.setAttribute('data-hero-responsive', 'true');
  document.head.appendChild(heroStyleSheet);
}

const styles = {
  heroVideoSection: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    paddingBottom: 'clamp(3rem, 8vh, 5rem)',
  },
  videoBackground: {
    zIndex: 1,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 2,
  },
  heroContent: {
    position: 'relative',
    zIndex: 3,
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 'clamp(1.3rem, 3.5vw, 3.2rem)',
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
    fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
    fontWeight: 300,
    textAlign: 'center',
    opacity: 0.85,
    padding: '0 clamp(1rem, 4vw, 2rem)',
    lineHeight: '1',
    maxWidth: '700px',
    margin: '0 auto',
    marginTop: 'clamp(0.25rem, 0.75vh, 0.5rem)',
  },
  chatSection: {
    paddingBottom: '1rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop:'1rem'
  },
};

const Hero = () => {
  // Rotating words state
  const words = ['to automate', 'to optimize', 'to evolve', 'to scale'];
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 2500); // Change word every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-video-section" style={styles.heroVideoSection}>
      {/* Background Video */}
      <video
        className="hero-video-bg"
        style={styles.videoBackground}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Better Text Readability */}
      <div style={styles.videoOverlay}></div>

      {/* Hero Content (Header + Chat) */}
      <div className="hero-content" style={styles.heroContent}>
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
    </div>
  );
};

export default Hero;
