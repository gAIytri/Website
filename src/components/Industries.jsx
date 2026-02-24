import ecommerce from '../assets/ecommerce-green.png';
import digitalMarketing from '../assets/digital-marketing-green.png';
import healthcare from '../assets/healthcare-green.png';
import financial from '../assets/financial-green.png';
import logistics from '../assets/logistics-green.png';
import saas from '../assets/saas-green.png';

const industries = [
  {
    name: 'Retail & E-Commerce',
    image: ecommerce,
    description: 'Inventory AI, demand forecasting, AI chatbots & voice agents for customer support',
  },
  {
    name: 'Marketing Agencies',
    image: digitalMarketing,
    description: 'Lead workflows, campaign analytics, interactive AI assistants for client engagement',
  },
  {
    name: 'Healthcare & Wellness',
    image: healthcare,
    description: 'Patient intake chatbots, voice enabled health assistants, compliance AI',
  },
  {
    name: 'Finance & Professional Services',
    image: financial,
    description: 'Report automation, contract AI, interactive advisory copilots',
  },
  {
    name: 'Operations & Logistics',
    image: logistics,
    description: 'Process automation, AI driven ERP copilots, real time supply chain assistants',
  },
  {
    name: 'SaaS & Technology',
    image: saas,
    description: 'AI powered features, embedded chatbots & voice interfaces, internal copilots',
  },
];

const Industries = () => {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}>INDUSTRIES WE SERVE</h2>
      <p style={styles.tagline}>AI that fits your industry, not the other way around.</p>
      <div style={styles.grid} className="industries-grid">
        {industries.map((industry) => (
          <div key={industry.name} style={styles.card} className="industry-card">
            <div style={styles.imageWrapper}>
              <img src={industry.image} alt={industry.name} style={styles.image} />
              <div style={styles.gradientOverlay} />
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.name}>{industry.name}</h3>
              <p style={styles.description}>{industry.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .industry-card {
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .industry-card:hover {
          border-color: rgba(2, 230, 115, 0.2) !important;
          transform: translateY(-4px);
        }
        @media (max-width: 1024px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .industries-grid {
            grid-template-columns: 1fr !important;
            max-width: 500px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

const styles = {
  section: {
    padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
    fontFamily: 'Poppins, sans-serif',
  },
  sectionHeader: {
    textAlign: 'center',
    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
    fontWeight: 700,
    letterSpacing: '3px',
    color: '#E9EAE8',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
  },
  tagline: {
    textAlign: 'center',
    fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
    color: 'rgba(233, 234, 232, 0.7)',
    margin: '0 0 clamp(2rem, 4vh, 3rem) 0',
    fontFamily: 'Poppins, sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.5) 100%)',
    pointerEvents: 'none',
  },
  cardContent: {
    padding: 'clamp(1rem, 2vw, 1.5rem)',
  },
  name: {
    fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
    fontWeight: 700,
    color: '#E9EAE8',
    margin: '0 0 0.5rem 0',
  },
  description: {
    fontSize: 'clamp(0.8rem, 1.4vw, 0.9rem)',
    color: 'rgba(233, 234, 232, 0.6)',
    lineHeight: 1.6,
    margin: 0,
  },
};

export default Industries;
