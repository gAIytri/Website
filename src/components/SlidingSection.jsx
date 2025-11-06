import React, { useState } from 'react';
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
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 830);

React.useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 830);
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

  return (
    <section {...swipeHandlers} style={styles.container}>
      {/* <h2 style={styles.heading}>We Provide</h2> */}
        <button
        style={{
            ...styles.arrowLeft,
            ...(isMobile && {
            left: '0.3rem',
            fontSize: '1.2rem',
            }),
        }}
        onClick={() => handleChange('RIGHT')}
        >
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
            style={styles.slide}
          >
            <div style={styles.textBlock}>
              <h2 style={styles.title}>{slides[index].title}</h2>
              <p style={styles.text}>{slides[index].text}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        
      </div>
            <button
            style={{
                ...styles.arrowRight,
                ...(isMobile && {
                right: '0.3rem',
                fontSize: '1.2rem',
                }),
            }}
            onClick={() => handleChange('LEFT')}
            >
            <FaChevronRight />
            </button>

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
    width: '90%',
    minHeight: '400px',
    maxHeight: '440px',
    background:
      'radial-gradient(circle at 20% 100%, #29B770 -100%, transparent 50%), radial-gradient(circle at 90% 10%, #9AC8B6 0%, #111111 80%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1.5rem 1.2rem',
    boxSizing: 'border-box',
    borderRadius:'12px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
  },

  slideWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '230px',
    position: 'relative',
    flexWrap: 'nowrap',
  },

  slide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    maxWidth: '800px',
    padding: '0 2rem',
    textAlign: 'center',
  },

  textBlock: {
    flex: 1,
    color: '#E9EAE8',
    fontFamily: 'Poppins, sans-serif',
    maxWidth: '600px',
  },

  title: {
    fontSize: '2.55rem',
    marginBottom: '0.7rem',
  },

  text: {
    fontSize: '1.55rem',
    opacity: 0.85,
    lineHeight: 1.45,
  },

  arrowLeft: {
    position: 'absolute',
    left: '0.1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '1.5rem',
    cursor: 'pointer',
    zIndex: 10,
  },

  arrowRight: {
    position: 'absolute',
    right: '0.1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.4)',
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

  // Media Queries in JS
  ...(window.innerWidth <= 830 && {
    arrowLeft: {
      position: 'absolute',
      left: '0.3rem',
      top: '50%',
      transform: 'translateX(-50%)',
      fontSize: '1.2rem',
    },
    arrowRight: {
      position: 'absolute',
      right: '0.3rem',
      top: '50%',
      transform: 'translateX(-50%)',
      fontSize: '1.2rem',
    },
    title: {
      fontSize: '1.35rem',
    },
    text: {
      fontSize: '0.85rem',
      lineHeight: 1.35,
    },
    progressWrapper: {
      marginTop: '1.2rem',
    },
    container: {
        padding: '2rem 0rem 1.2rem',
    }
  }),
};