import { useState, useEffect, useCallback, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

import aiWorkflows from '../assets/ai-workflows.png';
import dataAnalytics from '../assets/data-analytics.jpg';
import customAI from '../assets/custom-ai.png';

const pillars = [
  {
    title: 'AI Automated Workflows',
    image: aiWorkflows,
    description:
      'We design and deploy intelligent automations that eliminate repetitive work across your entire tech stack. CRM lead routing, invoice processing, onboarding sequences, email triage, calendar coordination, inventory alerts, approval chains, document generation, and cross-platform data syncing. If your team does it repeatedly, we automate it.',
  },
  {
    title: 'AI Powered Analytics',
    image: dataAnalytics,
    description:
      'We connect your data sources and deliver insights that drive action. Revenue forecasting, customer churn prediction, anomaly detection, cohort analysis, marketing attribution, inventory turnover tracking, pipeline health scoring, and automated executive summaries. Our systems turn scattered data into clear decisions.',
  },
  {
    title: 'AI Customized Systems',
    image: customAI,
    description:
      'Custom AI built around your business. Internal knowledge assistants that answer from your docs, customer support copilots that resolve tickets faster, proposal generators that draft from past wins, sales enablement tools that prep reps before calls, compliance checkers that flag risk in real time, and operations dashboards that surface what matters. Built for how your team actually works.',
  },
];

const SWIPE_THRESHOLD = 50;

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const dragRef = useRef({ startX: 0, isDragging: false, didSwipe: false });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, pillars.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Touch swipe support
  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  // Mouse drag support
  const handleMouseDown = useCallback((e) => {
    dragRef.current = { startX: e.clientX, isDragging: true, didSwipe: false };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!dragRef.current.isDragging) return;
    const diff = e.clientX - dragRef.current.startX;
    if (Math.abs(diff) > SWIPE_THRESHOLD && !dragRef.current.didSwipe) {
      dragRef.current.didSwipe = true;
      if (diff < 0) goNext();
      else goPrev();
    }
  }, [goNext, goPrev]);

  const handleMouseUp = useCallback(() => {
    dragRef.current.isDragging = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    dragRef.current.isDragging = false;
  }, []);

  const slideWidth = isMobile ? 85 : isTablet ? 75 : 70;
  const peekWidth = (100 - slideWidth) / 2;
  const trackTranslateX = -(activeIndex * slideWidth) + peekWidth;

  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}>PRODUCTS & SERVICES</h2>

      {/* Carousel */}
      <div
        {...swipeHandlers}
        style={styles.carouselContainer}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            ...styles.track,
            transform: `translateX(${trackTranslateX}%)`,
          }}
        >
          {pillars.map((pillar, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={pillar.title}
                style={{
                  ...styles.slide,
                  width: `${slideWidth}%`,
                  flexShrink: 0,
                  opacity: isActive ? 1 : 0.5,
                  transform: isActive ? 'scale(1)' : 'scale(0.85)',
                  cursor: isActive ? 'grab' : 'pointer',
                }}
                onClick={() => {
                  if (dragRef.current.didSwipe) return;
                  if (i < activeIndex) goPrev();
                  else if (i > activeIndex) goNext();
                }}
              >
                <div className="services-card" style={styles.card}>
                  {/* Text content — top left */}
                  <div style={styles.textContent}>
                    <h3 style={styles.cardTitle}>{pillar.title}</h3>
                    <p style={styles.description}>{pillar.description}</p>
                  </div>
                  {/* Image — bottom right */}
                  <div style={styles.imageArea}>
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      style={styles.image}
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={styles.dotsWrapper}>
        {pillars.map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.dot,
              backgroundColor: i === activeIndex ? '#02E673' : 'rgba(255, 255, 255, 0.3)',
            }}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-card {
            flex-direction: column !important;
          }
          .services-card > div:last-child {
            max-width: 100% !important;
            width: 100% !important;
            align-self: center !important;
          }
        }
      `}</style>
    </section>
  );
};

const styles = {
  section: {
    padding: 'clamp(3rem, 8vh, 6rem) 0',
    fontFamily: 'Poppins, sans-serif',
  },
  sectionHeader: {
    textAlign: 'center',
    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
    fontWeight: 700,
    letterSpacing: '3px',
    color: '#E9EAE8',
    marginBottom: 'clamp(2rem, 4vh, 3rem)',
    textTransform: 'uppercase',
  },
  carouselContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    userSelect: 'none',
  },
  track: {
    display: 'flex',
    transition: 'transform 0.5s ease',
  },
  slide: {
    transition: 'all 0.5s ease',
    padding: '0 clamp(4px, 0.5vw, 8px)',
    boxSizing: 'border-box',
  },
  card: {
    display: 'flex',
    alignItems: 'stretch',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    minHeight: 'clamp(280px, 35vw, 400px)',
  },
  textContent: {
    flex: 1,
    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 'clamp(0.6rem, 1.2vw, 1rem)',
  },
  cardTitle: {
    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    fontWeight: 700,
    color: '#FFFFFF',
    margin: 0,
    lineHeight: 1.2,
  },
  description: {
    fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)',
    color: 'rgba(233, 234, 232, 0.7)',
    lineHeight: 1.7,
    margin: 0,
  },
  imageArea: {
    width: '45%',
    maxWidth: '45%',
    flexShrink: 0,
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '12px 0 0 0',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  dotsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: 'clamp(1rem, 2vh, 1.5rem)',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Services;
