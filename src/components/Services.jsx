import { useState, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

import aiWorkflows from '../assets/ai-workflows-green.png';
import dataAnalytics from '../assets/data-analytics-green.png';
import customAI from '../assets/custom-ai-green.png';

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

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const wrap = (i) => ((i % pillars.length) + pillars.length) % pillars.length;

  const goNext = useCallback(() => {
    setActiveIndex((prev) => wrap(prev + 1));
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => wrap(prev - 1));
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: true,
  });

  const prevIndex = wrap(activeIndex - 1);
  const nextIndex = wrap(activeIndex + 1);

  const getSlideStyle = (position) => {
    if (isMobile) {
      const base = {
        position: 'absolute',
        top: 0,
        left: '50%',
        width: '80%',
        height: '100%',
        transition: 'all 0.4s ease',
        borderRadius: '16px',
        overflow: 'hidden',
      };

      if (position === 'active') {
        return { ...base, transform: 'translateX(-50%) scale(1)', opacity: 1, zIndex: 2 };
      }
      if (position === 'prev') {
        return { ...base, transform: 'translateX(calc(-50% - 90%)) scale(0.85)', opacity: 0.4, zIndex: 1, cursor: 'pointer' };
      }
      return { ...base, transform: 'translateX(calc(-50% + 90%)) scale(0.85)', opacity: 0.4, zIndex: 1, cursor: 'pointer' };
    }

    const activeWidth = isTablet ? '70%' : '63%';
    const sideOffset = isTablet ? '97%' : '96%';

    const base = {
      position: 'absolute',
      top: 0,
      left: '50%',
      width: activeWidth,
      height: '100%',
      transition: 'all 0.5s ease',
      borderRadius: '16px',
      overflow: 'hidden',
    };

    if (position === 'active') {
      return { ...base, transform: 'translateX(-50%) scale(1)', opacity: 1, zIndex: 2 };
    }
    if (position === 'prev') {
      return { ...base, transform: `translateX(calc(-50% - ${sideOffset})) scale(0.85)`, opacity: 0.5, zIndex: 1, cursor: 'pointer' };
    }
    return { ...base, transform: `translateX(calc(-50% + ${sideOffset})) scale(0.85)`, opacity: 0.5, zIndex: 1, cursor: 'pointer' };
  };

  const renderSlide = (pillar, position) => (
    <div
      key={pillar.title}
      style={getSlideStyle(position)}
      onClick={position === 'prev' ? goPrev : position === 'next' ? goNext : undefined}
    >
      <div className="services-card" style={styles.card}>
        <div style={styles.textContent}>
          <h3 style={styles.cardTitle}>{pillar.title}</h3>
          <p style={styles.description}>{pillar.description}</p>
        </div>
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

  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}>PRODUCTS & SERVICES</h2>

      <div {...swipeHandlers} style={styles.carouselContainer}>
        <div style={{
          ...styles.carouselTrack,
          minHeight: isMobile ? '480px' : isTablet ? '350px' : '400px',
        }}>
          {isMobile ? (
            pillars.map((pillar, i) => {
              let position = 'hidden';
              if (i === activeIndex) position = 'active';
              else if (i === (activeIndex - 1 + pillars.length) % pillars.length) position = 'prev';
              else if (i === (activeIndex + 1) % pillars.length) position = 'next';

              if (position === 'hidden') return null;

              return renderSlide(pillar, position);
            })
          ) : (
            <>
              {renderSlide(pillars[prevIndex], 'prev')}
              {renderSlide(pillars[activeIndex], 'active')}
              {renderSlide(pillars[nextIndex], 'next')}
            </>
          )}
        </div>

      </div>

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
            height: auto !important;
          }
          .services-card > div:first-child {
            padding: 1rem 1.2rem 0.5rem !important;
            gap: 0.3rem !important;
            flex: none !important;
          }
          .services-card > div:first-child h3 {
            font-size: 1rem !important;
          }
          .services-card > div:first-child p {
            font-size: 0.72rem !important;
            line-height: 1.5 !important;
          }
          .services-card > div:last-child {
            max-width: 100% !important;
            width: 100% !important;
            flex: 1 !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .services-card > div:last-child img {
            width: 100% !important;
            max-height: none !important;
            border-radius: 0 0 16px 16px !important;
            object-fit: cover !important;
          }
        }
        @media (max-width: 480px) {
          .services-card > div:first-child {
            padding: 0.8rem 1rem 0.4rem !important;
          }
          .services-card > div:first-child h3 {
            font-size: 0.9rem !important;
          }
          .services-card > div:first-child p {
            font-size: 0.65rem !important;
            line-height: 1.45 !important;
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
    padding: '0 clamp(1rem, 3vw, 2rem)',
  },
  carouselContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  carouselTrack: {
    position: 'relative',
    width: '100%',
  },
  card: {
    display: 'flex',
    alignItems: 'stretch',
    background: 'rgba(17, 17, 17, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    height: '100%',
    boxSizing: 'border-box',
  },
  textContent: {
    flex: 1,
    padding: 'clamp(1.5rem, 3vw, 3rem)',
    paddingRight: 'clamp(1rem, 2vw, 2rem)',
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
    width: '40%',
    maxWidth: '40%',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(1.2rem, 2.5vw, 2rem)',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    display: 'block',
    borderRadius: '12px',
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
