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
                  backgroundColor: i === index ? '#02E673' : 'rgba(255, 255, 255, 0.3)',
                }}
              />
            ))}
          </div>
        </section>
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
    width: 'min(90%, 1400px)',
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
    gap: 'clamp(1rem, 3vw, 2rem)',
    flexWrap: 'nowrap',
    maxWidth: '900px',
    padding: 'clamp(0.5rem, 2vw, 1rem) clamp(0.5rem, 2vw, 2rem)',
  },
  image: {
    borderRadius: '20%',
    objectFit: 'cover',
    border: '2px solid rgba(255, 255, 255, 0.1)',
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
