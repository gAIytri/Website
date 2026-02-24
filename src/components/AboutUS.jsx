import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence, color } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import founder1 from '../assets/Sid.png';
import founder2 from '../assets/Jemin.jpeg';

const founders = [
  {
    name: 'Sidharth Raj Khandelwal',
    role: 'Co-Founder & CTO',
    bio: 'Sidharth leads the technology vision and system architecture at Gaiytri, designing the core infrastructure behind every Interactive AI System we build. He architects modular, production grade platforms that integrate reasoning engines, automation frameworks, and structured data layers into business operations. By translating complex technical challenges into cohesive, execution ready systems, he ensures Gaiytri\'s Interactive AI systems operates with precision and reliability, providing the structural foundation to support sustained organizational growth and long term adaptability.',
    image: founder1,
  },
  {
    name: 'Jemin Patel',
    role: 'Co-Founder & COO',
    bio: 'Jemin leads the business strategy and operational direction at Gaiytri, driving growth, marketing, and company wide execution. He builds structured frameworks that align long term vision, revenue strategy, and day to day operations into a unified growth engine. From go to market initiatives and strategic partnerships to organizational planning and performance oversight, he ensures every Interactive AI System we develop is positioned clearly, adopted effectively, and delivers measurable and lasting business impact across every engagement.',
    image: founder2,
  },
];

const AboutUsSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 830);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 830);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (dir) => {
    setDirection(dir === 'LEFT' ? 1 : -1);
    if (dir === 'LEFT') {
      setIndex((prev) => (prev + 1) % founders.length);
    } else {
      setIndex((prev) => (prev - 1 + founders.length) % founders.length);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleChange('LEFT'),
    onSwipedRight: () => handleChange('RIGHT'),
    trackMouse: true,
  });

  const founder = founders[index];

  return (
    <div style={styles.outerWrapper}>
      {/* Part 1 — Vision / Mission */}
      <div className="vision-grid" style={styles.visionSection}>
        {/* Left column */}
        <div>
          <p style={styles.sectionLabel}>ABOUT GAIYTRI</p>
          <h2 style={styles.headline}>
            Making ideas and emerging technologies accessible without the complexity.
          </h2>
        </div>
        {/* Right column */}
        <div>
          <p style={styles.description}>
            AI should function as a natural extension of how businesses think, operate, and
            scale, not as a disconnected collection of tools. At Gaiytri, we guide organizations
            into the next phase of AI adoption by building Interactive AI Systems that embed
            intelligence directly into daily operations. We apply AI where it has yet to reach
            and strengthen it where it already delivers value, creating integrated platforms that
            transform advanced technology into practical, everyday capability. Our systems make
            it simple for teams to clearly communicate objectives, tasks, and guardrails so
            execution happens quickly and intelligently. The result is confident decision making,
            streamlined workflows, and sustainable long term growth.
          </p>
          <p style={styles.tagline}>
            We don't sell AI tools. We build Interactive{' '}
            <span style={{ color: '#02E673', fontWeight: 700 }}>AI</span>{' '}
            Systems that scale your business.
          </p>
        </div>
      </div>

      {/* Part 2 — Founders */}
      <div style={styles.foundersWrapper}>
        <h2 style={styles.teamLabel}>OUR TEAM</h2>

        {/* Desktop: side-by-side grid */}
        {!isMobile && (
          <div className="team-grid" style={styles.teamGrid}>
            {founders.map((f, i) => (
              <div key={i} style={styles.founderCard}>
                <img src={f.image} alt={f.name} style={styles.image} />
                <div style={styles.textBlock}>
                  <h2 style={styles.name}>{f.name}</h2>
                  <h4 style={styles.role}>{f.role}</h4>
                  <p style={styles.bio}>{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile: carousel */}
        {isMobile && (
          <section {...swipeHandlers} style={styles.container}>
            <button style={{ ...styles.arrowLeft, left: '0.3rem', fontSize: '1.2rem' }} onClick={() => handleChange('RIGHT')}>
              <FaChevronLeft />
            </button>

            <div style={styles.slideWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 50 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  style={{ ...styles.slide, flexDirection: 'column', textAlign: 'center' }}
                >
                  <img src={founder.image} alt={founder.name} style={{ ...styles.image, width: '160px', height: '160px' }} />
                  <div style={styles.textBlock}>
                    <h2 style={styles.name}>{founder.name}</h2>
                    <h4 style={styles.role}>{founder.role}</h4>
                    <p style={{ ...styles.bio, fontSize: '0.9rem' }}>{founder.bio}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button style={{ ...styles.arrowRight, right: '0.3rem', fontSize: '1.2rem' }} onClick={() => handleChange('LEFT')}>
              <FaChevronRight />
            </button>

            <div style={styles.progressWrapper}>
              {founders.map((_, i) => (
                <div key={i} style={{ ...styles.progressDot, backgroundColor: i === index ? '#02E673' : 'rgba(255, 255, 255, 0.3)' }} />
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .vision-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUsSection;

// ---------- Styles ----------
const styles = {
  // Outer wrapper for both parts
  outerWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
  },

  // Part 1 — Vision / Mission
  visionSection: {
    width: '100%',
    maxWidth: '1600px',
    padding: 'clamp(3rem, 6vh, 5rem) clamp(0.5rem, 1vw, 1rem)',
    color: '#E9EAE8',
    fontFamily: 'Poppins, sans-serif',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'clamp(2rem, 4vw, 4rem)',
    alignItems: 'start',
  },
  sectionLabel: {
    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    textAlign: 'left',
    opacity: 0.7,
    marginBottom: '1rem',
    fontWeight: 700,
  },
  headline: {
    fontSize: 'clamp(1.3rem, 2.8vw, 1.9rem)',
    fontWeight: 700,
    lineHeight: 1.3,
    textAlign: 'left',
    margin: '0 0 1rem',
  },
  description: {
    fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
    opacity: 0.75,
    lineHeight: 1.65,
    textAlign: 'left',
    margin: '0 0 2rem',
  },
  tagline: {
    fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
    fontWeight: 700,
    lineHeight: 1.5,
    textAlign: 'left',
    margin: 0,
  },

  // Part 2 — Founders wrapper
  foundersWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '2rem',
  },
  teamLabel: {
    textAlign: 'center',
    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
    fontWeight: 700,
    letterSpacing: '3px',
    color: '#E9EAE8',
    marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
    textTransform: 'uppercase',
  },

  teamGrid: {
    display: 'flex',
    gap: 'clamp(1.5rem, 3vw, 2.5rem)',
    justifyContent: 'center',
    width: '90%',
    maxWidth: '1400px',
    padding: '0 clamp(0.5rem, 1vw, 1rem)',
    boxSizing: 'border-box',
  },

  founderCard: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
    boxSizing: 'border-box',
  },

  // Mobile carousel styles
  container: {
    width: 'min(95%, 1600px)',
    minHeight: 'clamp(280px, 50vw, 400px)',
    maxHeight: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 'clamp(1.2rem, 3vw, 2rem) clamp(3rem, 5vw, 4.5rem) clamp(0.8rem, 2vw, 1.2rem)',
    boxSizing: 'border-box',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    justifyContent:'center'
  },
  slideWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '250px',
    position: 'relative',
  },
  slide: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(1.5rem, 3vw, 3rem)',
    flexWrap: 'nowrap',
    maxWidth: 'none',
    width: '100%',
    padding: 'clamp(0.5rem, 2vw, 1rem) clamp(0.5rem, 2vw, 2rem)',
  },
  image: {
    width: 'clamp(150px, 20vw, 220px)',
    height: 'clamp(150px, 20vw, 220px)',
    borderRadius: '20%',
    objectFit: 'cover',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '1rem',
  },
  textBlock: {
    flex: 1,
    color: '#E9EAE8',
    fontFamily: 'Poppins, sans-serif',
    maxWidth: 'none',
  },
  name: {
    fontSize: '1.4rem',
    fontWeight: '600',
   margin:0,
    color: '#E9EAE8'
  },
  role: {
    fontSize: '1rem',
    color: 'rgba(233, 234, 232, 0.7)',
    opacity:0.7,
    margin:0
  },
  bio: {
    fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
    opacity: 0.85,
    lineHeight: 1.45,
     color: '#E9EAE8',
  },
  arrowLeft: {
    position: 'absolute',
    left: 'clamp(0.3rem, 1vw, 0.8rem)',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#E9EAE8',
    fontSize: '1.5rem',
    cursor: 'pointer',
    zIndex: 10,
  },
  arrowRight: {
    position: 'absolute',
    right: 'clamp(0.3rem, 1vw, 0.8rem)',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#E9EAE8',
    fontSize: '1.5rem',
    cursor: 'pointer',
    zIndex: 10,
  },
  progressWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '1rem',
    flexWrap: 'wrap',
  },
  progressDot: {
    height: '6px',
    width: '28px',
    borderRadius: '3px',
    transition: 'background-color 0.3s ease',
  },
};
