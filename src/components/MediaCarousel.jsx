import { useState, useRef, useEffect } from 'react';

const MediaCarousel = ({ projects, header, subheader }) => {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const rafRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Get current project's media items
  const currentProject = projects?.[selectedProjectIndex];
  const mediaItems = currentProject?.media || [];

  // Create circular array with 12 sets for maximum safety and smoothness
  // Example: [1,2,3,4] becomes [1,2,3,4] × 12 = 48 items
  // This gives HUGE room before repositioning is needed
  const items = [
    ...mediaItems, ...mediaItems, ...mediaItems, ...mediaItems, ...mediaItems,
    ...mediaItems, ...mediaItems, ...mediaItems, ...mediaItems, ...mediaItems,
    ...mediaItems, ...mediaItems
  ];

  // Initialize - scroll to middle set on load or when project changes
  useEffect(() => {
    if (scrollContainerRef.current && items.length > 0 && mediaItems.length > 0) {
      const container = scrollContainerRef.current;
      const containerItems = container.querySelectorAll('[data-carousel-item]');

      // Start at center of 12 sets (6th set, index = 5 × mediaItems.length)
      // For 4 items: index 20 is the first item of the 6th (middle) set
      const middleSetStartIndex = mediaItems.length * 5;

      if (containerItems[middleSetStartIndex]) {
        const item = containerItems[middleSetStartIndex];
        const containerWidth = container.offsetWidth;
        const itemLeft = item.offsetLeft;
        const itemWidth = item.offsetWidth;
        const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);

        container.scrollTo({
          left: scrollPosition,
          behavior: 'auto',
        });

        setActiveIndex(0); // Logical index 0 (first item)

        // Trigger transform update to apply initial transforms
        setTimeout(() => {
          updateTransforms();
        }, 100);
      }
    }
  }, [selectedProjectIndex, mediaItems.length]);

  // Smart navigation - find CLOSEST instance of target item across all sets
  const scrollToItem = (targetLogicalIndex) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerItems = container.querySelectorAll('[data-carousel-item]');
    const containerWidth = container.offsetWidth;
    const currentScrollPosition = container.scrollLeft + containerWidth / 2;

    // Find all instances of target logical index across 12 sets
    // For 4 items: logical index 2 appears at physical indices [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46]
    const allInstances = [];
    for (let set = 0; set < 12; set++) {
      const physicalIndex = targetLogicalIndex + (mediaItems.length * set);
      if (containerItems[physicalIndex]) {
        const item = containerItems[physicalIndex];
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        allInstances.push({
          physicalIndex,
          position: itemCenter,
          distance: Math.abs(currentScrollPosition - itemCenter)
        });
      }
    }

    // Find the closest instance
    allInstances.sort((a, b) => a.distance - b.distance);
    const closestInstance = allInstances[0];

    if (!closestInstance) return;

    const targetItem = containerItems[closestInstance.physicalIndex];
    if (!targetItem) return;

    const itemLeft = targetItem.offsetLeft;
    const itemWidth = targetItem.offsetWidth;
    const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);

    // Use native smooth scrolling
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });

    setActiveIndex(targetLogicalIndex);
  };

  // Cleanup RAF and timeout on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Update transforms directly - no RAF wrapper
  const updateTransforms = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerItems = container.querySelectorAll('[data-carousel-item]');
    const containerWidth = container.offsetWidth;
    const scrollPosition = container.scrollLeft + containerWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    // Update transforms for all items based on distance
    containerItems.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(scrollPosition - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }

      // Calculate transform based on distance
      const maxDistance = containerWidth / 2;
      const normalizedDistance = Math.min(distance / maxDistance, 1);

      const scale = 1 - (normalizedDistance * 0.25);
      const translateY = -40 + (normalizedDistance * 220); // Center at -40px (moderately elevated), sides at +180px (low)
      const opacity = 1 - (normalizedDistance * 0.4);

      // Calculate rotation based on position relative to center - smooth interpolation
      const isLeft = itemCenter < scrollPosition;
      const rotation = normalizedDistance * (isLeft ? -15 : 15); // Gradually changes from 0 to ±15

      // Apply transform directly to DOM
      item.style.transform = `scale(${scale}) translateY(${translateY}px) rotate(${rotation}deg)`;
      item.style.opacity = opacity;
    });

    // Convert physical index to logical index (0-3 for 4 items)
    const logicalIndex = closestIndex % mediaItems.length;
    setActiveIndex(logicalIndex);
  };

  // Handle scroll with RAF for smooth updates
  const handleScroll = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Update transforms immediately for smooth visual feedback
    rafRef.current = requestAnimationFrame(updateTransforms);

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

    const containerItems = container.querySelectorAll('[data-carousel-item]');
    const containerWidth = container.offsetWidth;
    const scrollPosition = container.scrollLeft + containerWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    containerItems.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(scrollPosition - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    const numItems = mediaItems.length;

    // With 12 sets, only reposition at EXTREME edges - first 2 items or last 2 items
    // This gives MASSIVE scrolling range before repositioning (44+ items!)
    const firstSetExtremeEnd = 1; // Only first 2 items (0-1)
    const lastSetExtremeStart = numItems * 11; // e.g., 44 for 4 items (12th set, only last 2 items)

    // At extreme beginning (first 2 items) - jump to middle set (6th set)
    if (closestIndex <= firstSetExtremeEnd) {
      const logicalIndex = closestIndex % numItems;
      const equivalentMiddleIndex = logicalIndex + (numItems * 5);
      const equivalentItem = containerItems[equivalentMiddleIndex];

      if (equivalentItem) {
        const itemLeft = equivalentItem.offsetLeft;
        const itemWidth = equivalentItem.offsetWidth;
        const newScrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);

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
      const equivalentItem = containerItems[equivalentMiddleIndex];

      if (equivalentItem) {
        const itemLeft = equivalentItem.offsetLeft;
        const itemWidth = equivalentItem.offsetWidth;
        const newScrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);

        container.scrollTo({
          left: newScrollPosition,
          behavior: 'auto',
        });
      }
    }
  };

  // Safety check - don't render if no projects or media items
  if (!projects || projects.length === 0 || mediaItems.length === 0) {
    return null;
  }

  return (
    <section style={styles.section}>
      {/* Header */}
      <div>
      <h2 style={styles.header}>{header}</h2>

      {/* Subheader */}
      <p style={styles.subheader}>{subheader}</p>
      </div>


      {/* Project Tabs */}
      <div style={styles.navTabs}>
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => setSelectedProjectIndex(index)}
            style={{
              ...styles.navTab,
              ...(selectedProjectIndex === index ? styles.navTabActive : {}),
            }}
          >
            {project.name}
          </button>
        ))}
      </div>

      <div style={styles.wrapper}>
        {/* Main Carousel Container */}
        <div
          ref={scrollContainerRef}
          style={styles.carouselContainer}
          onScroll={handleScroll}
        >
        {items.map((item, index) => {
          const logicalIndex = index % mediaItems.length;
          const isActive = logicalIndex === activeIndex;

          return (
            <div
              key={`${item.id}-${index}`}
              data-carousel-item
              style={styles.itemWrapper}
              onClick={() => scrollToItem(logicalIndex)}
            >
              {/* Container - can hold image or video */}
              <div
                style={{
                  ...styles.container,
                  boxShadow: isActive ? '0 20px 60px rgba(2, 230, 115, 0.3)' : 'none',
                }}
              >
                {/* Product Image */}
                <img
                  src={item.image || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop"}
                  alt={`Media ${logicalIndex + 1}`}
                  style={styles.mediaImage}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators - based on logical index */}
      <div style={styles.indicators}>
        {mediaItems.map((_, index) => {
          return (
            <div
              key={index}
              style={{
                ...styles.indicator,
                ...(activeIndex === index ? styles.indicatorActive : {}),
              }}
              onClick={() => scrollToItem(index)}
            />
          );
        })}
      </div>

      {/* Navigation Arrows - Circular navigation */}
 
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
    paddingTop: '1rem',
    overflowX: 'hidden', // Prevent horizontal scroll on section
    overflowY: 'visible', // Allow content to be visible vertically
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
    marginBottom: 'clamp(0.5rem, 1vh, 1rem)',
    textAlign: 'center',
    maxWidth: '700px',
    fontFamily: 'Poppins, sans-serif',
  },
  navTabs: {
    display: 'flex',
    gap: 'clamp(0.5rem, 2vw, 1rem)',
    marginBottom: 'clamp(0.5rem, 1vh, 1rem)',
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
  wrapper: {
    width: '100%',
    padding: '0 0',
    paddingTop: '0.5rem', // Minimal gap between tabs and carousel
    paddingBottom: '2rem', // Reduced to bring navigation closer to center
    position: 'relative',
    background: 'transparent', // Use home gradient background
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'visible', // Allow vertical visibility for elevated items
    overflowX: 'hidden', // Prevent horizontal scroll on wrapper
  },
  carouselContainer: {
    display: 'flex',
    overflowX: 'scroll',
    overflowY: 'hidden', // Allow items to extend beyond container
    scrollSnapType: 'x proximity',
    width: '100vw',
    gap: '0rem', // No gap - items very close together
    scrollBehavior: 'smooth', // Native smooth scrolling for clicks!
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    padding: '4rem 0 4rem 0', // Balanced padding top and bottom
    alignItems: 'flex-end', // Align to bottom so center can rise up
  },
  itemWrapper: {
    minWidth: '55vw',
    maxWidth: '55vw',
    scrollSnapAlign: 'center',
    cursor: 'pointer',
    flexShrink: 0,
  
    transition: 'none', // No CSS transition - smoothness from RAF updates
    willChange: 'transform, opacity',
  },
  container: {
    width: '100%',
    aspectRatio: '16 / 9',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease-out',
    border: '2px solid rgba(233, 234, 232, 0.15)',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  indicators: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1rem',
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
  navigation: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
    justifyContent: 'center',
  },
  navButton: {
    background: 'rgba(233, 234, 232, 0.1)',
    border: '2px solid rgba(233, 234, 232, 0.2)',
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#E9EAE8',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
  },
};

// Add CSS for hiding scrollbar and hover effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  div[style*="carouselContainer"]::-webkit-scrollbar {
    display: none;
  }

  button[style*="navButton"]:hover {
    background: rgba(2, 230, 115, 0.2) !important;
    border-color: #02E673 !important;
    color: #02E673 !important;
    transform: scale(1.05);
  }

  button[style*="navButton"]:active {
    transform: scale(0.95);
  }

  /* Smooth scrolling behavior */
  div[style*="carouselContainer"] {
    scroll-behavior: smooth;
  }

  /* Mobile Responsiveness - Under 480px */
  @media (max-width: 480px) {
    /* Increase carousel item width for mobile */
    div[data-carousel-item] {
      min-width: 85vw !important;
      max-width: 85vw !important;
    }
  }

`;
if (!document.head.querySelector('style[data-media-carousel]')) {
  styleSheet.setAttribute('data-media-carousel', 'true');
  document.head.appendChild(styleSheet);
}

export default MediaCarousel;
