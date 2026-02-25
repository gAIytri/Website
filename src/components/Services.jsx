import { useState, useEffect, useCallback, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

import aiWorkflows from '../assets/ai-workflows-green.png';
import dataAnalytics from '../assets/data-analytics-green.png';
import customAI from '../assets/custom-ai-green.png';

const pillars = [
  {
    title: 'AI Automated Workflows',
    image: aiWorkflows,
    description:
      'We design and deploy intelligent automations that eliminate repetitive work across your entire tech stack. From CRM lead routing and invoice processing to onboarding sequences, email triage, and approval chains, we connect your tools and let AI handle the busywork. If your team does it repeatedly, we automate it so they can focus on what matters.',
  },
  {
    title: 'AI Powered Analytics',
    image: dataAnalytics,
    description:
      'We turn your scattered data into a strategic advantage. Our AI connects your sources and delivers real time insights like revenue forecasting, churn prediction, anomaly detection, marketing attribution, and pipeline health scoring. No more guesswork, no more waiting on reports. Just clear, actionable intelligence that drives smarter decisions.',
  },
  {
    title: 'AI Customized Systems',
    image: customAI,
    description:
      'We build interactive AI systems that become your team\'s smartest asset. From assistants that know your entire knowledge base to copilots that handle queries in real time, our systems learn your business and make everyone in it sharper, faster, and more effective across sales, compliance, operations, and every critical workflow your team relies on.',
  },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [tallestHeight, setTallestHeight] = useState(0);
  const measureRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Measure tallest card on mobile
  useEffect(() => {
    if (!isMobile || !measureRef.current) return;

    const measure = () => {
      const cards = measureRef.current.querySelectorAll('.measure-card');
      let maxH = 0;
      cards.forEach((card) => {
        const h = card.getBoundingClientRect().height;
        if (h > maxH) maxH = h;
      });
      if (maxH > 0) setTallestHeight(maxH);
    };

    // Measure after images load
    const images = measureRef.current.querySelectorAll('img');
    let loaded = 0;
    const total = images.length;

    const onLoad = () => {
      loaded++;
      if (loaded >= total) measure();
    };

    images.forEach((img) => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener('load', onLoad);
      }
    });

    if (loaded >= total) measure();

    // Also measure on resize
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      images.forEach((img) => img.removeEventListener('load', onLoad));
    };
  }, [isMobile]);

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

  const getSlideStyle = (position) => {
    if (isMobile) {
      const base = {
        position: 'absolute',
        top: 0,
        left: '50%',
        width: '80%',
        height: tallestHeight > 0 ? `${tallestHeight}px` : '100%',
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
          <p className="services-desc" style={styles.description}>{pillar.description}</p>
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

  const trackHeight = isMobile
    ? (tallestHeight > 0 ? `${tallestHeight}px` : '400px')
    : isTablet ? '350px' : '400px';

  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}>PRODUCTS & SERVICES</h2>

      {/* Hidden measurement container - only on mobile */}
      {isMobile && (
        <div
          ref={measureRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            pointerEvents: 'none',
            width: '80%',
            left: '10%',
          }}
        >
          {pillars.map((pillar) => (
            <div key={pillar.title} className="measure-card" style={{ marginBottom: '8px' }}>
              <div className="services-card" style={{ ...styles.card, position: 'relative' }}>
                <div style={styles.textContent}>
                  <h3 style={styles.cardTitle}>{pillar.title}</h3>
                  <p className="services-desc" style={styles.description}>{pillar.description}</p>
                </div>
                <div style={styles.imageArea}>
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    style={styles.image}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div {...swipeHandlers} style={styles.carouselContainer}>
        <div style={{
          ...styles.carouselTrack,
          height: trackHeight,
        }}>
          {pillars.map((pillar, i) => {
            let position = 'hidden';
            if (i === activeIndex) position = 'active';
            else if (i === (activeIndex - 1 + pillars.length) % pillars.length) position = 'prev';
            else if (i === (activeIndex + 1) % pillars.length) position = 'next';

            if (position === 'hidden') return null;

            return renderSlide(pillar, position);
          })}
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
          }
          .services-card > div:first-child {
            padding: 1rem 1rem 0.5rem 1rem !important;
            gap: 0.3rem !important;
            flex: none !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .services-card > div:first-child h3 {
            font-size: 1rem !important;
          }
          .services-desc {
            font-size: 0.72rem !important;
            line-height: 1.5 !important;
          }
          .services-card > div:last-child {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0.5rem 1rem 0.25rem 1rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
          .services-card > div:last-child {
            flex: 1 !important;
          }
          .services-card > div:last-child img {
            width: 100% !important;
            height: 100% !important;
            border-radius: 12px !important;
            object-fit: contain !important;
          }
        }
        @media (max-width: 480px) {
          .services-card > div:first-child {
            padding: 0.8rem 1rem 0.4rem 1rem !important;
          }
          .services-card > div:first-child h3 {
            font-size: 0.9rem !important;
          }
          .services-desc {
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
    fontWeight: 500,
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
    fontWeight: 500,
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
    gap: '8px',
    marginTop: '1rem',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Services;
