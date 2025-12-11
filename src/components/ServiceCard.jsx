const ServiceCard = ({ category, title, description, image }) => {
  return (
    <div style={styles.cardWrapper}>
      <div style={styles.card}>
        {/* Top Section - Text Content */}
        <div  style={styles.textSection}>
          <p style={styles.category}>{category}</p>
          <h2 style={styles.title}>{title}</h2>
          <p style={styles.description}>{description}</p>
        </div>

        {/* Bottom Section - Image/Mockup */}
        <div style={styles.imageContainer}>
          <img src={image} alt={title} style={styles.image} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  cardWrapper: {
    backgroundColor: '#111111',
    borderRadius: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(0.75rem, 2vh, 1.25rem)',
    padding: 'clamp(2rem, 5vw, 3rem)',
    paddingBottom: 'clamp(1.5rem, 3vh, 2rem)',
    height:'180px'
  },
  category: {
    fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
    fontWeight: '600',
    letterSpacing: '3px',
    color: 'rgba(233, 234, 232, 0.6)',
    textTransform: 'uppercase',
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
  },
  title: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: '600',
    color: '#E9EAE8',
    margin: 0,
    lineHeight: '1.2',
    fontFamily: 'Poppins, sans-serif',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2, // Limit to 2 lines
    WebkitBoxOrient: 'vertical',
  },
  description: {
    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
    color: 'rgba(233, 234, 232, 0.8)',
    margin: 0,
    lineHeight: '1.5',
    fontFamily: 'Poppins, sans-serif',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3, // Limit to 3 lines
    WebkitBoxOrient: 'vertical',
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#111111',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingLeft: 'clamp(2rem, 5vw, 3rem)',
    minHeight: '300px', // Minimum height for images
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
    objectFit: 'contain',
    objectPosition: 'bottom right',
  },
};

// Add CSS for mobile responsiveness
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  /* Mobile Responsiveness - Under 480px */
  @media (max-width: 480px) {
    /* Reduce card wrapper border radius */
    div[style*="backgroundColor: rgb(17, 17, 17)"][style*="borderRadius"] {
      border-radius: 15px !important;
    }
   

    /* Reduce text section padding on mobile */
    div[style*="gap: clamp"] {
      padding: 1rem !important;
      padding-bottom: 0.75rem !important;
      gap: 0.4rem !important;
    }

    /* Reduce category text size */
    p[style*="letterSpacing"] {
      font-size: 0.55rem !important;
      letter-spacing: 1.5px !important;
    }

    /* Reduce title text size */
    h2[style*="lineHeight"] {
      font-size: 1rem !important;
      line-height: 1.1 !important;
    }

    /* Reduce description text size */
    p[style*="lineHeight: 1.5"] {
      font-size: 0.75rem !important;
      line-height: 1.2 !important;
    }

    /* Image container padding for mobile */
    div[style*="minHeight: 300px"] {
      padding-left: 1rem !important;
      min-height: 200px !important;
    }
  }
`;
if (!document.head.querySelector('style[data-servicecard]')) {
  styleSheet.setAttribute('data-servicecard', 'true');
  document.head.appendChild(styleSheet);
}

export default ServiceCard;
