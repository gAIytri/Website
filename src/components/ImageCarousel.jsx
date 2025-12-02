import { useState, useRef, useEffect } from 'react';
import ServiceCard from './ServiceCard';

const ImageCarousel = ({ items, header, subheader }) => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const scrollTimeoutRef = useRef(null);

  // Create circular array with 12 sets for ultra-smooth infinite scrolling
  // Example: [1,2,3,4] becomes [1,2,3,4] × 12 = 48 items
  const circularItems = [
    ...items, ...items, ...items, ...items, ...items,
    ...items, ...items, ...items, ...items, ...items,
    ...items, ...items
  ];

  // Initialize - scroll to middle set (5th set) on first load
  useEffect(() => {
    if (!isInitialized && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.querySelectorAll('[data-card]');

      // Scroll to first item of 6th set (middle of 12 sets)
      // For 4 items: index 20 is the first item of the 6th set
      const middleSetFirstCard = items.length * 5;

      if (cards[middleSetFirstCard]) {
        const card = cards[middleSetFirstCard];
        const containerWidth = container.offsetWidth;
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);

        container.scrollTo({
          left: scrollPosition,
          behavior: 'auto',
        });

        setIsInitialized(true);
      }
    }
  }, [isInitialized, items.length]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Smart navigation - find CLOSEST instance of target item across all sets
  const scrollToCard = (logicalIndex) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('[data-card]');
    const containerWidth = container.offsetWidth;
    const currentScrollPosition = container.scrollLeft + containerWidth / 2;

    // Find all instances of target logical index across 12 sets
    // For 4 items: logical index 2 appears at physical indices [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46]
    const allInstances = [];
    for (let set = 0; set < 12; set++) {
      const physicalIndex = logicalIndex + (items.length * set);
      if (cards[physicalIndex]) {
        const card = cards[physicalIndex];
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        allInstances.push({
          physicalIndex,
          position: cardCenter,
          distance: Math.abs(currentScrollPosition - cardCenter)
        });
      }
    }

    // Find the closest instance
    allInstances.sort((a, b) => a.distance - b.distance);
    const closestInstance = allInstances[0];

    if (!closestInstance) return;

    const targetCard = cards[closestInstance.physicalIndex];
    if (!targetCard) return;

    const cardLeft = targetCard.offsetLeft;
    const cardWidth = targetCard.offsetWidth;
    const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });

    setActiveIndex(logicalIndex);
  };

  // Handle scroll to update active index (convert physical to logical)
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('[data-card]');
    const containerWidth = container.offsetWidth;
    const scrollPosition = container.scrollLeft + containerWidth / 2;

    let closestPhysicalIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(scrollPosition - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPhysicalIndex = index;
      }
    });

    // Convert physical index to logical index (0-3 for 4 items)
    const logicalIndex = closestPhysicalIndex % items.length;
    setActiveIndex(logicalIndex);

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Wait for scroll to FULLY END before repositioning (key technique!)
    scrollTimeoutRef.current = setTimeout(() => {
      repositionIfNeeded();
    }, 300); // Wait 300ms after scroll stops - ensures user has stopped scrolling
  };

  // Reposition to middle set ONLY at extreme edges (after scroll ends)
  const repositionIfNeeded = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('[data-card]');
    const containerWidth = container.offsetWidth;
    const scrollPosition = container.scrollLeft + containerWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(scrollPosition - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    const numItems = items.length;

    // With 12 sets, only reposition at EXTREME edges - first 2 items or last 2 items
    // This gives MASSIVE scrolling range before repositioning (44+ items!)
    const firstSetExtremeEnd = 1; // Only first 2 items (0-1)
    const lastSetExtremeStart = numItems * 11; // e.g., 44 for 4 items (12th set, only last 2 items)

    // At extreme beginning (first 2 items) - jump to middle set (6th set)
    if (closestIndex <= firstSetExtremeEnd) {
      const logicalIndex = closestIndex % numItems;
      const equivalentMiddleIndex = logicalIndex + (numItems * 5);
      const equivalentCard = cards[equivalentMiddleIndex];

      if (equivalentCard) {
        const cardLeft = equivalentCard.offsetLeft;
        const cardWidth = equivalentCard.offsetWidth;
        const newScrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);

        container.scrollTo({
          left: newScrollPosition,
          behavior: 'auto',
        });
      }
    }
    // At extreme end (last 2 items) - jump to middle set (6th set)
    else if (closestIndex >= lastSetExtremeStart) {
      const logicalIndex = closestIndex % numItems;
      const equivalentMiddleIndex = logicalIndex + (numItems * 5);
      const equivalentCard = cards[equivalentMiddleIndex];

      if (equivalentCard) {
        const cardLeft = equivalentCard.offsetLeft;
        const cardWidth = equivalentCard.offsetWidth;
        const newScrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);

        container.scrollTo({
          left: newScrollPosition,
          behavior: 'auto',
        });
      }
    }
  };

  return (
    <section style={styles.section}>
      {/* Header */}
      <h2 style={styles.header}>{header}</h2>

      {/* Subheader */}
      <p style={styles.subheader}>{subheader}</p>

      {/* Horizontal Navigation Tabs */}
      <div style={styles.navTabs}>
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => scrollToCard(index)}
            style={{
              ...styles.navTab,
              ...(activeIndex === index ? styles.navTabActive : {}),
            }}
          >
            {item.category}
          </button>
        ))}
      </div>

      {/* Scrollable Cards Container */}
      <div
        ref={scrollContainerRef}
        style={styles.cardsContainer}
        onScroll={handleScroll}
      >
        {circularItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            data-card
            style={styles.card}
            onClick={() => scrollToCard(index % items.length)}
          >
            <ServiceCard
              category={item.category}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          </div>
        ))}
      </div>

      {/* Scroll Indicators */}
      <div style={styles.indicators}>
        {items.map((_, index) => (
          <div
            key={index}
            style={{
              ...styles.indicator,
              ...(activeIndex === index ? styles.indicatorActive : {}),
            }}
            onClick={() => scrollToCard(index)}
          />
        ))}
      </div>

      {/* Mobile Navigation Arrows (hidden on desktop) */}
      <div style={styles.mobileNavigation}>
        <button
          style={styles.arrowButton}
          onClick={() => scrollToCard((activeIndex - 1 + items.length) % items.length)}
          aria-label="Previous"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div style={styles.mobileIndicators}>
          {items.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.mobileIndicator,
                ...(activeIndex === index ? styles.mobileIndicatorActive : {}),
              }}
              onClick={() => scrollToCard(index)}
            />
          ))}
        </div>

        <button
          style={styles.arrowButton}
          onClick={() => scrollToCard((activeIndex + 1) % items.length)}
          aria-label="Next"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingTop:'2rem'
  },
  header: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '600',
    color: '#E9EAE8',
    marginBottom: 'clamp(0.25rem, 2vh, 0.5rem)',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  subheader: {
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    color: 'rgba(233, 234, 232, 0.7)',
    marginBottom: 'clamp(1rem, 2vh, 2rem)',
    textAlign: 'center',
    maxWidth: '700px',
    fontFamily: 'Poppins, sans-serif',
  },
  navTabs: {
    display: 'flex',
    gap: 'clamp(0.5rem, 2vw, 1rem)',
    marginBottom: 'clamp(1rem, 2vh, 2rem)',
    flexWrap: 'wrap',
    justifyContent: 'center',
  
  },
  navTab: {
    background: 'none',
    border: 'none',
    color: 'rgba(233, 234, 232, 0.6)',
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    fontFamily: 'Poppins, sans-serif',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  navTabActive: {
    color: '#02E673',
    fontWeight: '600',
  },
  cardsContainer: {
    display: 'flex',
    overflowX: 'scroll',
    scrollSnapType: 'x mandatory',
    width: '100vw',
    gap:'1.5rem',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    padding: '0 5vw',
  },
  card: {
    minWidth: '50vw',
    maxWidth: '50vw',
    scrollSnapAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    flexShrink: 0,
  },
  indicators: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '2rem',
    justifyContent: 'center',
  },
  indicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'rgba(233, 234, 232, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  indicatorActive: {
    backgroundColor: '#02E673',
    transform: 'scale(1.2)',
  },
  mobileNavigation: {
    display: 'none', // Hidden on desktop
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '1.5rem',
  },
  arrowButton: {
    background: 'none',
    border: '2px solid rgba(233, 234, 232, 0.3)',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#E9EAE8',
    transition: 'all 0.3s ease',
  },
  mobileIndicators: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  mobileIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(233, 234, 232, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  mobileIndicatorActive: {
    backgroundColor: '#02E673',
    width: '10px',
    height: '10px',
  },
};

// Add CSS for hiding scrollbar, hover effects, and mobile responsiveness
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  div[style*="cardsContainer"]::-webkit-scrollbar {
    display: none;
  }

  div[style*="navTab"]:hover {
    color: #02E673 !important;
  }

  /* Mobile Responsiveness - Under 768px */
  @media (max-width: 768px) {
    /* Hide desktop navigation tabs on mobile */
    div[style*="navTabs"] {
      display: none !important;
    }

    /* Hide desktop indicators on mobile */
    div[style*="indicators"]:not([style*="mobileIndicators"]) {
      display: none !important;
    }

    /* Show mobile navigation arrows */
    div[style*="mobileNavigation"] {
      display: flex !important;
    }

    /* Adjust card container for single card view */
    div[style*="cardsContainer"] {
      padding: 0 calc((100vw - 95vw) / 2) !important;
    }

    /* Make cards full width on mobile */
    div[style*="card"] {
      min-width: 95vw !important;
      max-width: 95vw !important;
    }
  }

  /* Small Mobile Responsiveness - Under 480px */
  @media (max-width: 480px) {
    /* Adjust card container for smaller screens - full width */
    div[style*="cardsContainer"] {
      padding: 0 2.5vw !important;
      gap: 1rem !important;
    }
  


    /* Make cards nearly full width on small mobile */
    div[data-card] {
      min-width: 95vw !important;
      max-width: 95vw !important;
    }
  }

  /* Arrow button hover effect */
  button[style*="arrowButton"]:hover {
    border-color: #02E673 !important;
    color: #02E673 !important;
    transform: scale(1.1);
  }

  button[style*="arrowButton"]:active {
    transform: scale(0.95);
  }
`;
if (!document.head.querySelector('style[data-carousel]')) {
  styleSheet.setAttribute('data-carousel', 'true');
  document.head.appendChild(styleSheet);
}

export default ImageCarousel;
