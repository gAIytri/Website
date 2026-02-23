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
    bio: 'Sidharth leads all things tech at Gaiytri, architecting scalable AI-first platforms and developing intelligent tools that empower businesses. With expertise in full-stack development, automation, and user experience, he brings product ideas to life with code and vision.',
    image: founder1,
  },
  {
    name: 'Jemin Patel',
    role: 'Co-Founder & COO',
    bio: 'Jemin crafts the business and brand strategy at Gaiytri. With a deep focus on operations, partnerships, and customer success, he ensures our AI-driven tools deliver real-world value and help organizations transform ideas into scalable outcomes.',
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
      <div style={styles.visionSection}>
        <p style={styles.sectionLabel}>ABOUT GAIYTRI</p>
        <h2 style={styles.headline}>
          Making ideas and emerging technologies accessible without the complexity.
        </h2>
        <p style={styles.subVision}>
          AI should be a natural extension of how businesses think, operate, and scale.
        </p>
        <p style={styles.description}>
          Gaiytri exists to help organizations through the next phase of AI adoption.
          Applying intelligence where it has yet to reach, and strengthening it where it
          already delivers value. We build integrated platforms that turn advanced technology
          into everyday capability, enabling confident decisions, efficient workflows, and
          long-term growth.
        </p>
        <p style={styles.tagline}>
          We don't sell AI tools. We build Interactive{' '}
          <span style={{ color: '#02E673', fontWeight: 700 }}>AI</span>{' '}
          Systems that scale your business.
        </p>
      </div>

      {/* Part 2 — Founders Carousel */}
      <div style={styles.foundersWrapper}>
        <p style={styles.teamLabel}>OUR TEAM</p>

        <section {...swipeHandlers} style={styles.container}>
          {/* Left Arrow */}
          <button
            style={{
              ...styles.arrowLeft,
              ...(isMobile && { left: '0.3rem', fontSize: '1.2rem' }),
            }}
            onClick={() => handleChange('RIGHT')}
          >
            <FaChevronLeft />
          </button>

          {/* Founder Slide */}
          <div style={styles.slideWrapper}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 50 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{
                  ...styles.slide,
                  flexDirection: isMobile ? 'column' : 'row',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  style={{
                    ...styles.image,
                    width: isMobile ? '160px' : '300px',
                    height: isMobile ? '160px' : '300px',
                  }}
                />

                <div style={styles.textBlock}>
                  <h2 style={styles.name}>{founder.name}</h2>

                  {/* Show role & bio only if not mobile */}
                  {!isMobile && (
                    <>
                      <h4 style={styles.role}>{founder.role}</h4>
                      <p style={styles.bio}>{founder.bio}</p>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            style={{
              ...styles.arrowRight,
              ...(isMobile && { right: '0.3rem', fontSize: '1.2rem' }),
            }}
            onClick={() => handleChange('LEFT')}
          >
            <FaChevronRight />
          </button>

          {/* Progress Dots */}
          <div style={styles.progressWrapper}>
            {founders.map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.progressDot,
                  backgroundColor: i === index ? '#CCCCCC' : '#444',
                }}
              />
            ))}
          </div>
        </section>
      </div>
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
    maxWidth: '900px',
    padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
    textAlign: 'center',
    color: '#E9EAE8',
    fontFamily: 'Poppins, sans-serif',
    boxSizing: 'border-box',
  },
  sectionLabel: {
    fontSize: '0.85rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    opacity: 0.7,
    marginBottom: '1.5rem',
    fontWeight: 500,
  },
  headline: {
    fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
    fontWeight: 700,
    lineHeight: 1.3,
    margin: '0 0 1.2rem',
  },
  subVision: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    opacity: 0.8,
    lineHeight: 1.5,
    margin: '0 0 1.5rem',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
    opacity: 0.75,
    lineHeight: 1.65,
    margin: '0 0 2rem',
  },
  tagline: {
    fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
    fontWeight: 700,
    lineHeight: 1.5,
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
    fontSize: '0.85rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#E9EAE8',
    opacity: 0.7,
    fontWeight: 500,
    marginBottom: '1.2rem',
    fontFamily: 'Poppins, sans-serif',
  },

  // Existing founders card styles (kept intact)
  container: {
    width: 'min(80%, 1000px)',
    minHeight: 'clamp(280px, 50vw, 400px)',
    maxHeight: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 'clamp(1.2rem, 3vw, 2rem) clamp(1rem, 3vw, 1.5rem) clamp(0.8rem, 2vw, 1.2rem)',
    boxSizing: 'border-box',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
    backgroundColor:'#E0E9CC',
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
    gap: 'clamp(1rem, 3vw, 2rem)',
    flexWrap: 'nowrap',
    maxWidth: '900px',
    padding: 'clamp(0.5rem, 2vw, 1rem) clamp(0.5rem, 2vw, 2rem)',
  },
  image: {
    borderRadius: '20%',
    objectFit: 'cover',
    border: '2px solid transparent',
  },
  textBlock: {
    flex: 1,
    color: '#E9EAE8',
    fontFamily: 'Poppins, sans-serif',
    maxWidth: '600px',
  },
  name: {
    fontSize: '1.4rem',
    fontWeight: '600',
   margin:0,
    color:'#072D1F'
  },
  role: {
    fontSize: '1rem',
    color:'#072D1F',
    opacity:0.7,
    margin:0
  },
  bio: {
    fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
    opacity: 0.85,
    lineHeight: 1.45,
     color:'#072D1F',
  },
  arrowLeft: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#111111',
    fontSize: '1.5rem',
    cursor: 'pointer',
    zIndex: 10,
  },
  arrowRight: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#111111',
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
