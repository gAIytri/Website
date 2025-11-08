import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    title: 'SkillMap',
    text: 'An intelligent assistant that helps you map your skills to the right jobs bridging talent with opportunity through personalized AI insights.',
  },
  {
    title: 'Smart E-Commerce',
    text: 'A smarter website experience built for ultimate convenience—empowering both consumers and business owners with seamless navigation, automation, and real-time intelligence.',
  },
  {
    title: 'Complete AI Solutions',
    text: 'Tailored AI systems that analyze your workflows, automate repetitive tasks, and help your business scale efficiently with intelligent, data-driven decision-making.',
  },
];

const SlidingSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 630);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 630);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (dir) => {
    setDirection(dir === 'LEFT' ? 1 : -1);
    if (dir === 'LEFT') {
      setIndex((prev) => (prev + 1) % slides.length);
    } else {
      setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleChange('LEFT'),
    onSwipedRight: () => handleChange('RIGHT'),
    trackMouse: true,
  });

  // Dynamically computed inline styles based on mobile/desktop
  const containerStyle = {
    ...styles.container,
    padding: isMobile ? '2rem 0.5rem' : '2rem 1.5rem',
    minHeight: isMobile ? '320px' : '400px',
  };

  const titleStyle = {
    ...styles.title,
    fontSize: isMobile ? '1.6rem' : '2.55rem',
    marginBottom: isMobile ? '0.5rem' : '0.7rem',
  };

  const textStyle = {
    ...styles.text,
    fontSize: isMobile ? '0.9rem' : '1.3rem',
    lineHeight: isMobile ? 1.2 : 1.4,

  };

  const arrowLeftStyle = {
    ...styles.arrow,
    left: isMobile ? '0.3rem' : '1rem',
    fontSize: isMobile ? '1.2rem' : '1.5rem',
  };

  const arrowRightStyle = {
    ...styles.arrow,
    right: isMobile ? '0.3rem' : '0.1rem',
    fontSize: isMobile ? '1.2rem' : '1.5rem',
  };

  return (
    <section {...swipeHandlers} style={containerStyle}>
      {/* Left Arrow */}
      <button style={arrowLeftStyle} onClick={() => handleChange('RIGHT')}>
        <FaChevronLeft />
      </button>

      {/* Slides */}
      <div style={styles.slideWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={styles.slide}
          >
            <div style={styles.textBlock}>
              <h2 style={titleStyle}>{slides[index].title}</h2>
              <p style={textStyle}>{slides[index].text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Arrow */}
      <button style={arrowRightStyle} onClick={() => handleChange('LEFT')}>
        <FaChevronRight />
      </button>

      {/* Progress Dots */}
      <div style={styles.progressWrapper}>
        {slides.map((_, i) => (
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
  );
};

export default SlidingSection;

const styles = {
  container: {
    width: '50%',
      display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '12px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
    boxSizing: 'border-box',
    backgroundColor:'#E0E9CC'
  },
  slideWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  slide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '800px',
    padding: '0 2rem',
  },
  textBlock: {
    flex: 1,
    color: '#072D1F',
    fontFamily: 'Poppins, sans-serif',
  },
  title: {
    fontWeight: 600,
  },
  text: {
    opacity: 0.85,
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'rgba(0, 0, 0, 0.4)',
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